import type { Meta, StoryObj } from '@storybook/react'
import TextInput from '../TextInput'

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'components/common/TextInput',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof TextInput> = {
  args: {
    placeholder: '名前を入力してください',
    value: '山田太郎',
    onChange: (value: string) => console.log('Changed:', value),
  },
}

export const EmailInput: StoryObj<typeof TextInput> = {
  args: {
    type: 'email',
    value: 'user@example.com',
    onChange: (value: string) => console.log('Email:', value),
    placeholder: 'メールアドレス',
  },
}

export const RequiredField: StoryObj<typeof TextInput> = {
  args: {
    value: '',
    onChange: (value: string) => console.log('Required:', value),
    placeholder: '必須入力項目',
    required: true,
  },
}
