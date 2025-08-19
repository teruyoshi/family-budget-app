import type { Meta, StoryObj } from '@storybook/react-vite'
import type { FieldError } from 'react-hook-form'
import { Box } from '@mui/material'
import FormErrorMessage from '../FormErrorMessage'

const meta: Meta<typeof FormErrorMessage> = {
  title: 'Components/Forms/FormErrorMessage',
  component: FormErrorMessage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'react-hook-formのエラーを受け取り、MUIのFormHelperTextで表示するコンポーネント。エラーがない場合は何も表示しない。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      description: 'react-hook-formのFieldErrorオブジェクト',
      control: 'object',
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, maxWidth: 400 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormErrorMessage>

/**
 * エラーがない状態（何も表示されない）
 */
export const NoError: Story = {
  args: {},
}

/**
 * 必須フィールドエラー
 */
export const RequiredError: Story = {
  args: {
    error: {
      type: 'required',
      message: 'このフィールドは必須です',
    } as FieldError,
  },
}

/**
 * バリデーションエラー（パターンマッチ）
 */
export const PatternError: Story = {
  args: {
    error: {
      type: 'pattern',
      message: 'メールアドレスの形式で入力してください',
    } as FieldError,
  },
}

/**
 * 最小文字数エラー
 */
export const MinLengthError: Story = {
  args: {
    error: {
      type: 'minLength',
      message: '3文字以上で入力してください',
    } as FieldError,
  },
}

/**
 * 最大文字数エラー
 */
export const MaxLengthError: Story = {
  args: {
    error: {
      type: 'maxLength',
      message: '10文字以下で入力してください',
    } as FieldError,
  },
}

/**
 * カスタムバリデーションエラー
 */
export const CustomError: Story = {
  args: {
    error: {
      type: 'custom',
      message: 'この値は既に使用されています',
    } as FieldError,
  },
}

/**
 * 長いエラーメッセージ
 */
export const LongErrorMessage: Story = {
  args: {
    error: {
      type: 'validate',
      message:
        'パスワードは8文字以上で、大文字・小文字・数字・記号をそれぞれ1文字以上含む必要があります。また、連続する同じ文字は使用できません。',
    } as FieldError,
  },
}

/**
 * 空文字のエラーメッセージ
 */
export const EmptyErrorMessage: Story = {
  args: {
    error: {
      type: 'custom',
      message: '',
    } as FieldError,
  },
}
