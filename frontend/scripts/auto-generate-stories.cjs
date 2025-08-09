#!/usr/bin/env node

/**
 * JSDocコメントとTypeScript型情報からStorybookストーリーを自動生成
 * 既存のコンポーネントファイルを解析してストーリーを作成
 */

const fs = require('fs');
const path = require('path');

// 設定
const COMPONENTS_DIRS = [
  'src/components/common',
  'src/features/balance/components',
  'src/features/expenses/components',
  'src/features/income/components',
  'src/features/history',
  'src/features/history/common'
];

const CATEGORY_MAP = {
  'src/components/common': '共通コンポーネント',
  'src/features/balance/components': '残高機能',
  'src/features/expenses/components': '支出機能',
  'src/features/income/components': '収入機能',
  'src/features/history': '履歴機能',
  'src/features/history/common': '履歴機能'
};

// コンポーネント情報を解析
function analyzeComponent(filePath, content) {
  const componentName = path.basename(filePath, '.tsx');
  
  // JSDocコメントを抽出
  const jsDocMatch = content.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
  let jsDocComment = '';
  if (jsDocMatch) {
    // JSDocコメントを整形（改行とマークダウンを保持）
    jsDocComment = jsDocMatch[1]
      .replace(/^\s*\*\s?/gm, '') // 各行の先頭の * を削除
      .replace(/\n\n+/g, '\n\n') // 連続する空行を1つに
      .replace(/`/g, '\\`') // バッククォートをエスケープ
      .replace(/\${/g, '\\${') // テンプレートリテラル変数をエスケープ
      .trim();
  }
  
  // propsのinterfaceを検索
  const interfacePattern = new RegExp(`interface\\s+${componentName}Props\\s*\\{([^}]*(?:\\{[^}]*\\}[^}]*)*)\\}`, 's');
  const interfaceMatch = content.match(interfacePattern);
  const props = [];
  
  if (interfaceMatch) {
    const propsContent = interfaceMatch[1];
    // より詳細なプロパティマッチング（コメント付き）
    const propPattern = /\/\*\*\s*([^*]*|\*(?!\/))*\*\/\s*(\w+)\??\s*:\s*([^;\n]+)/g;
    const simplePropPattern = /(\w+)\??\s*:\s*([^;\n]+)/g;
    
    let match;
    // コメント付きプロパティを優先して検索
    while ((match = propPattern.exec(propsContent)) !== null) {
      const [fullMatch, comment, propName, propType] = match;
      props.push({
        name: propName.trim(),
        type: propType.trim(),
        optional: fullMatch.includes('?'),
        description: comment ? comment.replace(/\*/g, '').trim() : ''
      });
    }
    
    // コメントなしプロパティも追加
    while ((match = simplePropPattern.exec(propsContent)) !== null) {
      const [fullMatch, propName, propType] = match;
      // 既に追加済みでない場合のみ追加
      if (!props.find(p => p.name === propName.trim())) {
        props.push({
          name: propName.trim(),
          type: propType.trim(),
          optional: fullMatch.includes('?'),
          description: ''
        });
      }
    }
  }
  
  return {
    name: componentName,
    filePath,
    description: jsDocComment,
    props
  };
}

// argTypesを生成
function generateArgTypes(props) {
  if (!props.length) return '';
  
  const argTypes = props.map(prop => {
    const control = getControlType(prop.type);
    const description = prop.description || `${prop.name}プロパティ`;
    const suffix = prop.optional ? ' (任意)' : ' (必須)';
    
    let argType = `    ${prop.name}: {
      control: '${control}',
      description: '${description}${suffix}',`;
    
    // select の場合はオプションを追加
    if (control === 'select' && prop.type.includes('|')) {
      const options = prop.type.split('|').map(opt => opt.trim().replace(/['"]/g, ''));
      argType += `
      options: ${JSON.stringify(options)},`;
    }
    
    argType += `
    }`;
    
    return argType;
  }).join(',\n');
  
  return `
  argTypes: {
${argTypes},
  },`;
}

// コントロールタイプを決定
function getControlType(type) {
  if (type.includes('string')) return 'text';
  if (type.includes('number')) return 'number';
  if (type.includes('boolean')) return 'boolean';
  if (type.includes('Date')) return 'date';
  if (type.includes('()') || type.includes('=>')) return 'object';
  if (type.includes('|')) return 'select';
  return 'object';
}

// デフォルト引数を生成
function generateDefaultArgs(props) {
  if (!props.length) return '';
  
  const args = props.filter(prop => !prop.optional || ['placeholder', 'label'].includes(prop.name))
    .map(prop => {
      let defaultValue = getDefaultValue(prop.type, prop.name);
      // 文字列値のみクォートで囲む（関数や特殊値は除く）
      if (typeof defaultValue === 'string' && 
          !defaultValue.startsWith('()') && 
          !defaultValue.startsWith('new ') &&
          defaultValue !== 'undefined') {
        defaultValue = `'${defaultValue}'`;
      }
      return `    ${prop.name}: ${defaultValue}`;
    });
  
  if (!args.length) return '';
  
  return `
  args: {
${args.join(',\n')},
  },`;
}

// デフォルト値を取得
function getDefaultValue(type, propName) {
  if (type.includes('string')) {
    if (propName.toLowerCase().includes('placeholder')) return 'プレースホルダーテキスト';
    if (propName.toLowerCase().includes('label')) return 'ラベル';
    return 'テキスト';
  }
  if (type.includes('number')) {
    if (propName.toLowerCase().includes('amount') || propName.toLowerCase().includes('balance')) return 1000;
    if (propName.toLowerCase().includes('total')) return 5000;
    return 0;
  }
  if (type.includes('boolean')) return false;
  if (type.includes('Date')) return 'new Date()';
  if (type.includes('()') || type.includes('=>')) return '() => console.log("変更")';
  if (propName.toLowerCase() === 'onchange') return '() => {}';
  return 'undefined';
}

// ストーリーテンプレートを生成
function generateStoryTemplate(component, category) {
  const { name, description, props } = component;
  const argTypes = generateArgTypes(props);
  const defaultArgs = generateDefaultArgs(props);
  
  // バリエーションストーリーを生成
  const variants = [];
  
  // 必須プロパティを取得してデフォルト値を設定
  const requiredProps = props.filter(p => !p.optional);
  const requiredPropsString = requiredProps.map(prop => {
    const defaultValue = getDefaultValue(prop.type, prop.name);
    const value = typeof defaultValue === 'string' && 
      !defaultValue.startsWith('()') && 
      !defaultValue.startsWith('new ') &&
      defaultValue !== 'undefined' ? `'${defaultValue}'` : defaultValue;
    return `${prop.name}={${value}}`;
  }).join(' ');
  
  // AmountTextコンポーネント用の特別なバリエーション
  if (name === 'AmountText') {
    variants.push(`
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <${name} amount={1000} variant="h6" />
      <${name} amount={5000} variant="h5" />
      <${name} amount={25000} variant="h4" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '異なるバリアントでの金額表示例',
      },
    },
  },
};`);
  }
  // 一般的なバリエーション（MUI TextFieldなど）
  else if (props.some(p => p.name === 'variant' && p.type.includes('outlined'))) {
    variants.push(`
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <${name} ${requiredPropsString} variant="outlined" />
      <${name} ${requiredPropsString} variant="filled" />
      <${name} ${requiredPropsString} variant="standard" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'バリアントの表示例',
      },
    },
  },
};`);
  }
  
  if (props.some(p => p.name === 'disabled')) {
    variants.push(`
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '無効状態の表示例',
      },
    },
  },
};`);
  }
  
  return `import type { Meta, StoryObj } from '@storybook/react';
import ${name} from '../${name}';

const meta: Meta<typeof ${name}> = {
  title: '${category}/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: \`${description || `${name}コンポーネント`}
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。\`,
      },
    },
  },
  tags: ['autodocs'],${argTypes}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {${defaultArgs}
};
${variants.join('')}
`;
}

// Makefileに追加するコマンドを生成
function updateMakefile() {
  const makefilePath = path.join(process.cwd(), '../Makefile');
  if (!fs.existsSync(makefilePath)) return;
  
  let makefile = fs.readFileSync(makefilePath, 'utf8');
  
  // 既に追加済みかチェック
  if (makefile.includes('generate-stories-frontend')) return;
  
  // ヘルプセクションに追加
  makefile = makefile.replace(
    /(@echo "  make storybook-stop-frontend - Storybookサーバー停止")/,
    '$1\\n\\t@echo "  make generate-stories-frontend - JSDocからStorybookストーリー自動生成"'
  );
  
  // コマンドを追加
  makefile = makefile.replace(
    /(# Storybookサーバー停止[\\s\\S]*?docker compose exec frontend pkill -f "storybook")/,
    `$1

# JSDocからStorybookストーリー自動生成
generate-stories-frontend:
\\t@echo "JSDocコメントからStorybookストーリーを自動生成中..."
\\tdocker compose exec frontend npm run generate-stories
\\t@echo "ストーリー生成が完了しました！"`
  );
  
  // .PHONYに追加
  makefile = makefile.replace(
    /(.PHONY: [^\\n]*storybook-stop-frontend)/,
    '$1 generate-stories-frontend'
  );
  
  fs.writeFileSync(makefilePath, makefile, 'utf8');
  console.log('✅ Makefileにgenerate-stories-frontendコマンドを追加しました');
}

// メイン処理
function main(options = {}) {
  const forceUpdate = options.force || process.argv.includes('--force') || process.argv.includes('-f');
  
  console.log('🚀 JSDocからStorybookストーリーの自動生成を開始...');
  if (forceUpdate) {
    console.log('🔥 強制更新モード: すべてのストーリーを再生成します');
  }
  
  let generatedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  
  for (const dir of COMPONENTS_DIRS) {
    const fullDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullDir)) continue;
    
    const files = fs.readdirSync(fullDir)
      .filter(file => file.endsWith('.tsx') && !file.includes('.stories.') && !file.includes('.test.'))
      .filter(file => {
        const content = fs.readFileSync(path.join(fullDir, file), 'utf8');
        // React コンポーネントかどうかを簡単にチェック
        return content.includes('export') && (content.includes('return') || content.includes('=>')) && content.includes('<');
      });
    
    for (const file of files) {
      const filePath = path.join(fullDir, file);
      const storiesDir = path.join(fullDir, '__stories__');
      const storyPath = path.join(storiesDir, file.replace('.tsx', '.stories.tsx'));
      
      // __stories__ディレクトリが存在しない場合は作成
      if (!fs.existsSync(storiesDir)) {
        fs.mkdirSync(storiesDir, { recursive: true });
      }
      
      // 既存のストーリーファイルがある場合の処理
      let shouldUpdate = false;
      let isUpdate = false;
      
      if (fs.existsSync(storyPath)) {
        if (forceUpdate) {
          shouldUpdate = true;
          isUpdate = true;
          console.log(`🔥 強制更新: ${file}`);
        } else {
          // コンポーネントファイルとストーリーファイルの更新時刻を比較
          const componentStat = fs.statSync(filePath);
          const storyStat = fs.statSync(storyPath);
          
          if (componentStat.mtime > storyStat.mtime) {
            shouldUpdate = true;
            isUpdate = true;
            console.log(`🔄 更新: ${file} (コンポーネントが新しい)`);
          } else {
            console.log(`⏭️  スキップ: ${file} (既存のストーリーが最新)`);
            skippedCount++;
            continue;
          }
        }
      } else {
        shouldUpdate = true;
        isUpdate = false;
      }
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const component = analyzeComponent(filePath, content);
        const category = CATEGORY_MAP[dir] || 'コンポーネント';
        const storyContent = generateStoryTemplate(component, category);
        
        fs.writeFileSync(storyPath, storyContent, 'utf8');
        
        if (isUpdate) {
          console.log(`✅ 更新: ${component.name}.stories.tsx`);
          updatedCount++;
        } else {
          console.log(`✅ 生成: ${component.name}.stories.tsx`);
          generatedCount++;
        }
      } catch (error) {
        console.error(`❌ エラー: ${file}`, error.message);
      }
    }
  }
  
  // Makefileを更新
  updateMakefile();
  
  console.log(`\\n🎉 完了！`);
  console.log(`📊 生成: ${generatedCount}件, 更新: ${updatedCount}件, スキップ: ${skippedCount}件`);
  console.log(`\\n🔧 使用方法:`);
  console.log(`   make generate-stories-frontend        # ストーリー自動生成（差分更新）`);
  console.log(`   make generate-stories-frontend-force  # ストーリー強制再生成（全更新）`);
  console.log(`   make storybook-frontend               # Storybook起動`);
}

// スクリプト実行
if (require.main === module) {
  main();
}

module.exports = { analyzeComponent, generateStoryTemplate };