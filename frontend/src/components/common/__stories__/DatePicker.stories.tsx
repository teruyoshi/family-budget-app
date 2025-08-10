import type { Meta, StoryObj } from '@storybook/react'
import DatePicker from '../DatePicker'

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'components/common/DatePicker',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof DatePicker> = {
  args: {
    value: '2024-01-15',
    onChange: (date: string) => console.log('Date changed:', date),
    label: '日付を選択',
  },
}

export const ExpenseDate: StoryObj<typeof DatePicker> = {
  args: {
    value: '2024-01-15',
    onChange: (date: string) => console.log('Expense date:', date),
    label: '支出日付',
  },
}

export const IncomeDate: StoryObj<typeof DatePicker> = {
  args: {
    value: '2024-01-20',
    onChange: (date: string) => console.log('Income date:', date),
    label: '収入日付',
  },
}
