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
 * TextInputをベースに金額入力に特化した機能を提供します。
 * 入力中にカンマ区切りで表示し、実際の値は数値として管理します。
 *
 * 特徴:
 * - 入力中に自動的にカンマ区切り + 円マーク表示（1000 → ¥1,000）
 * - 内部的には数値として管理
 * - TextInputをコンポジションで活用
 * - 右寄せ表示で視認性を向上
 *
 * @component
 * @param {AmountInputProps} props - コンポーネントのプロパティ
 * @param {string} props.placeholder - プレースホルダーテキスト
 * @param {number} props.value - 現在の金額（数値）
 * @param {function} props.onChange - 金額変更時のコールバック関数
 * @param {SxProps<Theme>} props.sx - スタイルオブジェクト
 * @param {boolean} props.required - 必須項目かどうか
 * @param {boolean} props.fullWidth - 全幅で表示するかどうか
 * @param {'outlined' | 'filled' | 'standard'} props.variant - 入力フィールドのバリアント
 * @returns {JSX.Element} 金額フォーマット機能付きのテキスト入力コンポーネント
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

    /**
     * 数値を表示用文字列に変換（カンマ区切り + 円マーク）
     * @param {number} num - 変換する数値
     * @returns {string} フォーマット済みの文字列（¥1,000形式）、0またはNaNの場合は空文字列
     */
    const formatNumber = (num: number): string => {
      if (isNaN(num) || num === 0) return ''
      return `¥${num.toLocaleString()}`
    }

    /**
     * 表示用文字列を数値に変換（カンマと円マークを除去）
     * @param {string} str - 変換する文字列
     * @returns {number} 抽出された数値、数字がない場合は0
     */
    const parseNumber = (str: string): number => {
      const cleaned = str.replace(/[^0-9]/g, '')
      return cleaned === '' ? 0 : parseInt(cleaned, 10)
    }

    // 初期値とpropsのvalueが変更された時に表示値を更新
    useEffect(() => {
      setDisplayValue(formatNumber(value))
    }, [value])

    /**
     * 入力値変更ハンドラー
     * @param {string} inputValue - 入力された値
     */
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
