import { Meta, StoryObj } from '@storybook/react'
import TransactionForm from '../TransactionForm'

const meta: Meta<typeof TransactionForm> = {
  component: TransactionForm,
  title: 'components/common/TransactionForm',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const ExpenseForm: StoryObj<typeof TransactionForm> = {
  args: {
    placeholder: '支出金額を入力してください',
    buttonText: '支出を登録',
    buttonColor: 'error',
    datePickerLabel: '支出日付',
    onSubmit: (amount, date) => console.log('Expense:', amount, date),
  },
}

export const IncomeForm: StoryObj<typeof TransactionForm> = {
  args: {
    placeholder: '収入金額を入力してください',
    buttonText: '収入を登録',
    buttonColor: 'success',
    datePickerLabel: '収入日付',
    onSubmit: (amount, date) => console.log('Income:', amount, date),
  },
}
