import type { Meta, StoryObj } from '@storybook/react'
import TextInput from '../TextInput'

const meta: Meta<typeof TextInput> = {
  title: '共通コンポーネント/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `汎用テキスト入力コンポーネント
MUI TextFieldをラップし、プロジェクト全体で一貫したAPIを提供します。
@group 共通コンポーネント
@example
// 基本使用例
<TextInput
  value={name}
  onChange={setName}
  placeholder="名前を入力"
/>
@example
// 数値入力
<TextInput
  type="number"
  value={amount}
  onChange={setAmount}
  required
/>
@example
// メール入力
<TextInput
  type="email"
  value={email}
  onChange={setEmail}
  placeholder="メールアドレス"
  required
/>
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
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
    placeholder: 'プレースホルダーテキスト',
    value: 'テキスト',
    onChange: (value: string) => console.log('Changed:', value),
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <TextInput value={'テキスト'} onChange={(value) => console.log('Outlined:', value)} variant="outlined" />
      <TextInput value={'テキスト'} onChange={(value) => console.log('Filled:', value)} variant="filled" />
      <TextInput value={'テキスト'} onChange={(value) => console.log('Standard:', value)} variant="standard" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'バリアントの表示例',
      },
    },
  },
}
