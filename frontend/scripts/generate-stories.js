#!/usr/bin/env node

/**
 * TypeScript コンポーネントから Storybook ストーリーを自動生成するスクリプト
 * JSDoc コメントと TypeScript の型情報を解析してストーリーを作成
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ts from 'typescript'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 設定
const CONFIG = {
  srcDir: path.join(__dirname, '../src'),
  outputDir: path.join(__dirname, '../src'),
  componentsPattern: ['components/**/*.tsx', 'features/**/components/*.tsx'],
  excludePatterns: ['**/*.stories.tsx', '**/*.test.tsx', '**/index.ts'],
}

// JSDoc コメントを解析する関数
function parseJSDocComment(comment) {
  if (!comment) return {}

  const lines = comment
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, '').trim())
  const description = []
  const tags = {}

  let currentSection = 'description'

  for (const line of lines) {
    if (line.startsWith('@')) {
      const [tag, ...values] = line.substring(1).split(' ')
      currentSection = tag
      tags[tag] = values.join(' ')
    } else if (currentSection === 'description' && line) {
      description.push(line)
    }
  }

  return {
    description: description.join(' '),
    ...tags,
  }
}

// TypeScript ファイルからコンポーネント情報を抽出
function extractComponentInfo(filePath) {
  const sourceCode = fs.readFileSync(filePath, 'utf8')
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  )

  const components = []

  function visit(node) {
    // React コンポーネント（function または const）を検出
    if (
      ts.isFunctionDeclaration(node) ||
      (ts.isVariableStatement(node) &&
        node.declarationList.declarations.some(
          (decl) =>
            ts.isArrowFunction(decl.initializer) ||
            ts.isFunctionExpression(decl.initializer)
        ))
    ) {
      const componentName = getComponentName(node)
      if (componentName && isReactComponent(node, sourceCode)) {
        const jsDoc = getJSDocComment(node, sourceCode)
        const props = extractPropsInterface(sourceFile, componentName)

        components.push({
          name: componentName,
          filePath,
          jsDoc: parseJSDocComment(jsDoc),
          props,
        })
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return components
}

// コンポーネント名を取得
function getComponentName(node) {
  if (ts.isFunctionDeclaration(node)) {
    return node.name?.text
  } else if (ts.isVariableStatement(node)) {
    const declaration = node.declarationList.declarations[0]
    if (ts.isIdentifier(declaration.name)) {
      return declaration.name.text
    }
  }
  return null
}

// React コンポーネントかどうかを判定
function isReactComponent(node, sourceCode) {
  // JSX を返すかどうかで判定（簡単な実装）
  const nodeText = sourceCode.slice(node.pos, node.end)
  return /return\s*\(?\s*</.test(nodeText) || /=>\s*\(?\s*</.test(nodeText)
}

// JSDoc コメントを取得
function getJSDocComment(node, sourceCode) {
  const fullText = sourceCode
  const commentRanges = ts.getLeadingCommentRanges(fullText, node.pos)

  if (commentRanges && commentRanges.length > 0) {
    const lastComment = commentRanges[commentRanges.length - 1]
    const commentText = fullText.slice(lastComment.pos, lastComment.end)

    if (commentText.startsWith('/**')) {
      return commentText.slice(3, -2)
    }
  }

  return null
}

// Props インターフェースを抽出（簡単な実装）
function extractPropsInterface(sourceFile, componentName) {
  const props = []

  function visit(node) {
    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.text.includes('Props') &&
      node.name.text.includes(componentName)
    ) {
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.name) {
          const propName = member.name.getText()
          const propType = member.type?.getText() || 'any'
          const isOptional = !!member.questionToken

          props.push({
            name: propName,
            type: propType,
            optional: isOptional,
          })
        }
      })
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return props
}

// Storybook ストーリーファイルを生成
function generateStoryFile(component) {
  const { name, filePath, jsDoc, props } = component
  const relativePath = path
    .relative(path.dirname(filePath), filePath)
    .replace('.tsx', '')
  const categoryPath = getCategoryPath(filePath)

  // Props の型情報から argTypes を生成
  const argTypes = generateArgTypes(props)
  const defaultArgs = generateDefaultArgs(props)

  return `import type { Meta, StoryObj } from '@storybook/react';
import ${name} from './${relativePath}';

const meta: Meta<typeof ${name}> = {
  title: '${categoryPath}/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: \`${jsDoc.description || `${name}コンポーネント`}
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。\`,
      },
    },
  },
  tags: ['autodocs'],${
    argTypes
      ? `
  argTypes: ${argTypes},`
      : ''
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {${
    defaultArgs
      ? `
  args: ${defaultArgs},`
      : ''
  }
};

${generateVariantStories(component)}`
}

// カテゴリパスを生成
function getCategoryPath(filePath) {
  if (filePath.includes('/components/common/')) return '共通コンポーネント'
  if (filePath.includes('/balance/')) return '残高機能'
  if (filePath.includes('/expenses/')) return '支出機能'
  if (filePath.includes('/income/')) return '収入機能'
  if (filePath.includes('/history/')) return '履歴機能'
  return 'コンポーネント'
}

// argTypes を生成
function generateArgTypes(props) {
  if (!props || props.length === 0) return null

  const argTypes = {}

  props.forEach((prop) => {
    const control = getControlType(prop.type)
    argTypes[prop.name] = {
      control,
      description: `${prop.name}プロパティ${prop.optional ? ' (任意)' : ' (必須)'}`,
    }
  })

  return JSON.stringify(argTypes, null, 4)
}

// コントロールタイプを取得
function getControlType(type) {
  if (type.includes('string')) return 'text'
  if (type.includes('number')) return 'number'
  if (type.includes('boolean')) return 'boolean'
  if (type.includes('Date')) return 'date'
  if (type.includes('|')) return 'select'
  return 'object'
}

// デフォルト引数を生成
function generateDefaultArgs(props) {
  if (!props || props.length === 0) return null

  const args = {}

  props.forEach((prop) => {
    if (!prop.optional) {
      args[prop.name] = getDefaultValue(prop.type)
    }
  })

  return Object.keys(args).length > 0 ? JSON.stringify(args, null, 4) : null
}

// デフォルト値を取得
function getDefaultValue(type) {
  if (type.includes('string')) return ''
  if (type.includes('number')) return 0
  if (type.includes('boolean')) return false
  if (type.includes('Date')) return new Date()
  if (type.includes('function') || type.includes('=>'))
    return '() => console.log("clicked")'
  return undefined
}

// バリエーションストーリーを生成
function generateVariantStories(component) {
  const variants = []

  // 共通バリエーション
  if (component.props.some((p) => p.name === 'variant')) {
    variants.push(`export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <${component.name} variant="outlined" />
      <${component.name} variant="filled" />
      <${component.name} variant="standard" />
    </div>
  ),
};`)
  }

  if (component.props.some((p) => p.name === 'disabled')) {
    variants.push(`export const Disabled: Story = {
  args: {
    disabled: true,
  },
};`)
  }

  return variants.join('\n\n')
}

// glob パターンでファイルを検索
function findFiles(patterns, excludePatterns = []) {
  const files = []

  function searchDir(dir) {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        searchDir(fullPath)
      } else if (stat.isFile() && item.endsWith('.tsx')) {
        const relativePath = path.relative(CONFIG.srcDir, fullPath)

        // パターンマッチング
        const matchesPattern = patterns.some((pattern) =>
          minimatch(relativePath, pattern)
        )
        const excludedByPattern = excludePatterns.some((pattern) =>
          minimatch(relativePath, pattern)
        )

        if (matchesPattern && !excludedByPattern) {
          files.push(fullPath)
        }
      }
    }
  }

  // 簡単なminimatchの実装
  function minimatch(str, pattern) {
    const regex = pattern
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*')
      .replace(/\?/g, '[^/]')
    return new RegExp(`^${regex}$`).test(str)
  }

  searchDir(CONFIG.srcDir)
  return files
}

// メイン処理
async function main() {
  console.log('🔍 TypeScriptコンポーネントを検索中...')

  const componentFiles = findFiles(
    CONFIG.componentsPattern,
    CONFIG.excludePatterns
  )
  console.log(`📁 ${componentFiles.length} 個のコンポーネントファイルを発見`)

  let generatedCount = 0

  for (const filePath of componentFiles) {
    try {
      const components = extractComponentInfo(filePath)

      for (const component of components) {
        const storyPath = filePath.replace('.tsx', '.stories.tsx')

        // 既存のストーリーファイルがある場合はスキップ
        if (fs.existsSync(storyPath)) {
          console.log(`⏭️  スキップ: ${component.name} (既存のストーリーあり)`)
          continue
        }

        const storyContent = generateStoryFile(component)
        fs.writeFileSync(storyPath, storyContent, 'utf8')

        console.log(`✅ 生成: ${component.name}.stories.tsx`)
        generatedCount++
      }
    } catch (error) {
      console.error(`❌ エラー: ${filePath}`, error.message)
    }
  }

  console.log(`\n🎉 ${generatedCount} 個のStorybookストーリーを生成しました！`)
}

// スクリプト実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}
