import type { Meta, StoryObj } from '@storybook/react-vite'
import IncomeInput from '../IncomeInput'

const meta: Meta<typeof IncomeInput> = {
  component: IncomeInput,
  title: 'features/income/IncomeInput',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof IncomeInput> = {
  args: {
    value: 50000,
    onChange: (value: number) => console.log('Changed:', value),
    placeholder: '収入金額を入力',
  },
}

export const Empty: StoryObj<typeof IncomeInput> = {
  args: {
    value: 0,
    onChange: (value: number) => console.log('Changed:', value),
  },
}
