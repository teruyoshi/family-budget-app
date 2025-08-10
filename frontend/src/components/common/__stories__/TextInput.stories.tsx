import type { Meta, StoryObj } from '@storybook/react'
import TextInput from '../TextInput'

const meta: Meta<typeof TextInput> = {
  title: '共通コンポーネント/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `# 汎用テキスト入力コンポーネント

MUI TextFieldをラップし、プロジェクト全体で一貫したAPIを提供する基本的なテキスト入力コンポーネントです。

## 特徴
- 複数の入力タイプに対応（text, number, email, password）
- MUIのバリアント（outlined, filled, standard）をサポート
- 必須項目の設定が可能
- カスタムスタイリング対応

## 使用場面
- ユーザー名・メモ・説明文の入力
- メールアドレスの入力
- パスワード入力
- AmountInputの基盤コンポーネント

## 使用例

### 基本使用例
\`\`\`tsx
<TextInput
  value={name}
  onChange={setName}
  placeholder="名前を入力"
/>
\`\`\`

### メール入力
\`\`\`tsx
<TextInput
  type="email"
  value={email}
  onChange={setEmail}
  placeholder="メールアドレス"
  required
/>
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'number',
      description: '入力フィールドのタイプ (任意)',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト (任意)',
    },
    value: {
      control: 'text',
      description: '現在の入力値 (必須)',
    },
    onChange: {
      control: 'text',
      description: '値変更時のコールバック関数 (必須)',
    },
    sx: {
      control: 'object',
      description: 'スタイルオブジェクト (任意)',
    },
    required: {
      control: 'boolean',
      description: '必須項目かどうか (任意)',
    },
    fullWidth: {
      control: 'boolean',
      description: '全幅で表示するかどうか (任意)',
    },
    variant: {
      control: 'select',
      description: '入力フィールドのバリアント (任意)',
      options: ['outlined', 'filled', 'standard'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '名前を入力してください',
    value: '山田太郎',
    onChange: (value: string) => console.log('Changed:', value),
  },
  parameters: {
    docs: {
      description: {
        story: '基本的なテキスト入力の使用例です。通常の文字列入力に使用します。',
      },
    },
  },
}

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <h4>テキスト入力</h4>
        <TextInput type="text" value="サンプルテキスト" onChange={(value) => console.log('Text:', value)} placeholder="テキストを入力" />
      </div>
      <div>
        <h4>メール入力</h4>
        <TextInput type="email" value="user@example.com" onChange={(value) => console.log('Email:', value)} placeholder="メールアドレス" />
      </div>
      <div>
        <h4>パスワード入力</h4>
        <TextInput type="password" value="password123" onChange={(value) => console.log('Password:', value)} placeholder="パスワード" />
      </div>
      <div>
        <h4>数値入力</h4>
        <TextInput type="number" value="42" onChange={(value) => console.log('Number:', value)} placeholder="数値" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '異なる入力タイプの表示例です。text, email, password, numberの各タイプに対応しています。',
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <h4>Outlined（デフォルト）</h4>
        <TextInput value="アウトライン形式" onChange={(value) => console.log('Outlined:', value)} variant="outlined" />
      </div>
      <div>
        <h4>Filled</h4>
        <TextInput value="塗りつぶし形式" onChange={(value) => console.log('Filled:', value)} variant="filled" />
      </div>
      <div>
        <h4>Standard</h4>
        <TextInput value="スタンダード形式" onChange={(value) => console.log('Standard:', value)} variant="standard" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'MUIの3つのバリアント（outlined, filled, standard）の表示例です。プロジェクトのデザインに合わせて選択できます。',
      },
    },
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <h4>空の状態</h4>
        <TextInput value="" onChange={(value) => console.log('Empty:', value)} placeholder="何か入力してください" />
      </div>
      <div>
        <h4>必須項目</h4>
        <TextInput value="" onChange={(value) => console.log('Required:', value)} placeholder="必須入力" required />
      </div>
      <div>
        <h4>長いテキスト</h4>
        <TextInput value="これは長いテキストの例で、入力フィールドの表示を確認するためのサンプル文章です。" onChange={(value) => console.log('Long:', value)} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '様々な状態での表示例です。空の状態、必須項目、長いテキストの入力時の動作を確認できます。',
      },
    },
  },
}
