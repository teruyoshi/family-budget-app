import type { Meta, StoryObj } from '@storybook/react'
import AmountInput from '../AmountInput'

const meta: Meta<typeof AmountInput> = {
  component: AmountInput,
  title: 'components/common/AmountInput',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof AmountInput> = {
  args: {
    placeholder: '金額を入力してください',
    value: 15000,
    onChange: (value: number) => console.log('Changed:', value),
  },
}

export const Empty: StoryObj<typeof AmountInput> = {
  args: {
    placeholder: '金額を入力',
    value: 0,
    onChange: (value: number) => console.log('Changed:', value),
  },
}

export const LargeAmount: StoryObj<typeof AmountInput> = {
  args: {
    placeholder: '大きな金額',
    value: 1234567,
    onChange: (value: number) => console.log('Changed:', value),
  },
}
