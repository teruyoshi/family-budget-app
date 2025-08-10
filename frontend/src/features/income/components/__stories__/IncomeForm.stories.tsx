import type { Meta, StoryObj } from '@storybook/react'
import IncomeForm from '../IncomeForm'

const meta: Meta<typeof IncomeForm> = {
  component: IncomeForm,
  title: 'features/income/IncomeForm',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof IncomeForm> = {
  args: {
    onSubmit: (amount: number, date: string) => {
      console.log('収入登録:', amount, date)
    },
  },
}
