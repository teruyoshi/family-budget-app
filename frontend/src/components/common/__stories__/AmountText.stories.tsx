import { Meta, StoryObj } from '@storybook/react'
import AmountText from '../AmountText'

const meta: Meta<typeof AmountText> = {
  component: AmountText,
  title: 'components/common/AmountText',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof AmountText> = {
  args: {
    amount: 15000,
  },
}

export const LargeAmount: StoryObj<typeof AmountText> = {
  args: {
    amount: 1234567,
    variant: 'h4',
  },
}

export const SmallAmount: StoryObj<typeof AmountText> = {
  args: {
    amount: 500,
    variant: 'body2',
  },
}
