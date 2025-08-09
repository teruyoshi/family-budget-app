import type { Meta, StoryObj } from '@storybook/react'
import TransactionForm from '../TransactionForm'

const meta: Meta<typeof TransactionForm> = {
  title: '共通コンポーネント/TransactionForm',
  component: TransactionForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `取引登録フォームコンポーネントのProps型定義
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '金額入力フィールドのプレースホルダーテキスト (必須)',
    },
    buttonText: {
      control: 'text',
      description: '登録ボタンのテキスト (必須)',
    },
    buttonColor: {
      control: 'select',
      description: '登録ボタンの色テーマ (必須)',
      options: ['error', 'success'],
    },
    datePickerLabel: {
      control: 'text',
      description: '日付選択フィールドのラベル (必須)',
    },
    onSubmit: {
      control: 'text',
      description: 'フォーム送信時のコールバック関数 (任意)',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'プレースホルダーテキスト',
    buttonText: 'テキスト',
    buttonColor: undefined,
    datePickerLabel: 'ラベル',
  },
}
