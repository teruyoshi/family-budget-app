import { forwardRef, useState, useEffect } from 'react'
import TextInput from './TextInput'
import type { SxProps, Theme } from '@mui/material'

/**
 * 金額入力コンポーネントのProps型定義
 */
interface AmountInputProps {
  /** プレースホルダーテキスト */
  placeholder?: string
  /** 現在の金額（数値） */
  value: number
  /** 金額変更時のコールバック関数 */
  onChange: (value: number) => void
  /** スタイルオブジェクト */
  sx?: SxProps<Theme>
  /** 必須項目かどうか */
  required?: boolean
  /** 全幅で表示するかどうか */
  fullWidth?: boolean
  /** 入力フィールドのバリアント */
  variant?: 'outlined' | 'filled' | 'standard'
}

/**
 * 金額入力専用コンポーネント
 *
 * 自動的にカンマ区切りと円マーク表示を行い、右寄せで表示します。
 * 入力値は数値として管理され、TextInputをベースに構築されています。
 *
 * @group 共通コンポーネント
 *
 * @example
 * // 基本的な使用例
 * <AmountInput
 *   value={amount}
 *   onChange={setAmount}
 *   placeholder="金額を入力"
 * />
 *
 * @example
 * // 必須項目として使用
 * <AmountInput
 *   value={expense}
 *   onChange={setExpense}
 *   placeholder="支出金額"
 *   required
 * />
 */

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      placeholder,
      value,
      onChange,
      sx,
      required = false,
      fullWidth = true,
      variant = 'outlined',
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<string>('')

    /** 数値を¥1,000形式の文字列に変換 */
    const formatNumber = (num: number): string => {
      if (isNaN(num) || num === 0) return ''
      return `¥${num.toLocaleString()}`
    }

    /** 表示用文字列から数値を抽出 */
    const parseNumber = (str: string): number => {
      const cleaned = str.replace(/[^0-9]/g, '')
      return cleaned === '' ? 0 : parseInt(cleaned, 10)
    }

    // 初期値とpropsのvalueが変更された時に表示値を更新
    useEffect(() => {
      setDisplayValue(formatNumber(value))
    }, [value])

    /** 入力変更時に表示文字列を数値に変換して親コンポーネントに通知 */
    const handleChange = (inputValue: string) => {
      // 数字以外を除去
      const numericValue = parseNumber(inputValue)

      // 表示値を更新（カンマ区切り）
      setDisplayValue(formatNumber(numericValue))

      // 親コンポーネントには数値で通知
      onChange(numericValue)
    }

    return (
      <TextInput
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        required={required}
        fullWidth={fullWidth}
        variant={variant}
        sx={{
          '& .MuiInputBase-input': {
            textAlign: 'right',
            '&::placeholder': {
              textAlign: 'center',
              opacity: 0.6,
            },
          },
          ...sx,
        }}
      />
    )
  }
)

AmountInput.displayName = 'AmountInput'

export default AmountInput
