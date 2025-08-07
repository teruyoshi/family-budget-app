import { forwardRef, useState, useEffect } from 'react'
import TextInput from './TextInput'
import type { SxProps, Theme } from '@mui/material'

/**
 * 金額入力専用コンポーネント
 *
 * TextInputをベースに金額入力に特化した機能を提供します。
 * 入力中にカンマ区切りで表示し、実際の値は数値として管理します。
 *
 * 特徴:
 * - 入力中に自動的にカンマ区切り表示（1000 → 1,000）
 * - 内部的には数値として管理
 * - TextInputをコンポジションで活用
 *
 * @example
 * <AmountInput
 *   value={amount}
 *   onChange={setAmount}
 *   placeholder="金額を入力"
 * />
 */
interface AmountInputProps {
  placeholder?: string
  value: number
  onChange: (value: number) => void
  sx?: SxProps<Theme>
  required?: boolean
  fullWidth?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
}

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

    // 数値を表示用文字列に変換（カンマ区切り）
    const formatNumber = (num: number): string => {
      if (isNaN(num) || num === 0) return ''
      return num.toLocaleString()
    }

    // 表示用文字列を数値に変換（カンマを除去）
    const parseNumber = (str: string): number => {
      const cleaned = str.replace(/[^0-9]/g, '')
      return cleaned === '' ? 0 : parseInt(cleaned, 10)
    }

    // 初期値とpropsのvalueが変更された時に表示値を更新
    useEffect(() => {
      setDisplayValue(formatNumber(value))
    }, [value])

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