import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import TextInput from '../TextInput'

const meta: Meta<typeof TextInput> = {
  title: 'UI Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI TextFieldをラップした統一的なテキスト入力UI。様々な入力タイプに対応し、他の入力コンポーネントの基盤としても使用。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '入力タイプ',
      control: { type: 'select' },
      options: ['text', 'number', 'email', 'password'],
      table: {
        type: { summary: "'text' | 'number' | 'email' | 'password'" },
        defaultValue: { summary: "'text'" },
      },
    },
    value: {
      description: '入力値',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: '値変更時のコールバック',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    placeholder: {
      description: 'プレースホルダーテキスト',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      description: 'フォーム識別用name属性',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      description: '必須項目フラグ',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      description: '全幅表示フラグ',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    variant: {
      description: 'MUIバリアント',
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
      table: {
        type: { summary: "'outlined' | 'filled' | 'standard'" },
        defaultValue: { summary: "'outlined'" },
      },
    },
    error: {
      description: 'エラー状態フラグ',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    helperText: {
      description: 'エラーメッセージ',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 基本ストーリー
export const Default: Story = {
  args: {
    value: '',
    placeholder: 'テキストを入力',
  },
}

// テキスト入力
export const BasicText: Story = {
  args: {
    type: 'text',
    value: 'サンプルテキスト',
    placeholder: 'お名前を入力してください',
  },
}

// メール入力
export const EmailInput: Story = {
  args: {
    type: 'email',
    value: 'user@example.com',
    placeholder: 'メールアドレスを入力',
  },
}

// パスワード入力
export const PasswordInput: Story = {
  args: {
    type: 'password',
    value: 'password123',
    placeholder: 'パスワードを入力',
  },
}

// 数値入力
export const NumberInput: Story = {
  args: {
    type: 'number',
    value: '123',
    placeholder: '数値を入力',
  },
}

// 必須項目
export const Required: Story = {
  args: {
    value: '',
    placeholder: '必須項目です',
    required: true,
  },
}

// エラー状態
export const WithError: Story = {
  args: {
    value: '',
    placeholder: 'テキストを入力',
    error: true,
    helperText: 'この項目は必須です',
  },
}

// バリアント - Filled
export const FilledVariant: Story = {
  args: {
    value: 'サンプル',
    placeholder: 'Filledバリアント',
    variant: 'filled',
  },
}

// バリアント - Standard
export const StandardVariant: Story = {
  args: {
    value: 'サンプル',
    placeholder: 'Standardバリアント',
    variant: 'standard',
  },
}

// 幅を制限
export const FixedWidth: Story = {
  args: {
    value: 'サンプル',
    placeholder: '固定幅',
    fullWidth: false,
  },
}

// インタラクティブストーリー
export const Interactive: Story = {
  render: function InteractiveTextInput(args) {
    const [value, setValue] = useState(args.value || '')

    return (
      <TextInput
        {...args}
        value={value}
        onChange={setValue}
      />
    )
  },
  args: {
    placeholder: '自由に入力してください',
    value: '',
  },
}

// フォームでの使用例
export const InFormLayout: Story = {
  render: function FormLayoutExample() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <TextInput
          value={name}
          onChange={setName}
          placeholder="お名前"
          required
        />
        <TextInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="メールアドレス"
          required
        />
        <TextInput
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="パスワード"
          required
        />
        <TextInput
          type="number"
          value={age}
          onChange={setAge}
          placeholder="年齢"
        />
        <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p><strong>入力値:</strong></p>
          <p>名前: {name || '(未入力)'}</p>
          <p>メール: {email || '(未入力)'}</p>
          <p>パスワード: {'*'.repeat(password.length) || '(未入力)'}</p>
          <p>年齢: {age || '(未入力)'}</p>
        </div>
      </div>
    )
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'フォーム内での実際の使用例。様々な入力タイプと入力値の表示。',
      },
    },
  },
}

// バリデーションの例
export const WithValidation: Story = {
  render: function ValidationExample() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const validateEmail = (value: string) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (value && !emailPattern.test(value)) {
        setError('有効なメールアドレスを入力してください')
      } else {
        setError('')
      }
    }

    const handleChange = (value: string) => {
      setEmail(value)
      validateEmail(value)
    }

    return (
      <TextInput
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="メールアドレスを入力"
        error={!!error}
        helperText={error || 'メールアドレス形式で入力してください'}
      />
    )
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'リアルタイムバリデーションの実装例。メールアドレス形式をチェック。',
      },
    },
  },
}