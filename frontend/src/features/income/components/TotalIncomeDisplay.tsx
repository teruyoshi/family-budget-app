import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

/**
 * TotalIncomeDisplayコンポーネントのプロパティ
 * @typedef {Object} TotalIncomeDisplayProps
 * @property {number} totalAmount - 表示する合計収入金額
 */
interface TotalIncomeDisplayProps {
  totalAmount: number
}

/**
 * 合計収入表示コンポーネント
 *
 * 合計収入金額を中央揃えで表示します。金額は成功カラー（グリーン）で強調表示され、
 * 「合計収入」ラベルと金額が横並びで配置されます。
 *
 * @component
 * @param {TotalIncomeDisplayProps} props - コンポーネントのプロパティ
 * @param {number} props.totalAmount - 表示する合計収入金額
 *
 * @returns {JSX.Element} 合計収入表示UI
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <TotalIncomeDisplay totalAmount={250000} />
 *
 * // 状態管理と組み合わせ
 * <TotalIncomeDisplay totalAmount={values.totalIncomeAmount} />
 * ```
 */
function TotalIncomeDisplay({ totalAmount }: TotalIncomeDisplayProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'success.main',
        fontWeight: 'bold',
        mt: 3,
      }}
    >
      <TextLabel variant="h6" sx={{ display: 'inline' }}>
        合計収入
      </TextLabel>
      <AmountText
        amount={totalAmount}
        variant="h6"
        sx={{ display: 'inline' }}
      />
    </Box>
  )
}

export default TotalIncomeDisplay
