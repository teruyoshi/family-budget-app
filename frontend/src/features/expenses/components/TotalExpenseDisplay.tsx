import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

/**
 * TotalExpenseDisplayコンポーネントのプロパティ
 * @typedef {Object} TotalExpenseDisplayProps
 * @property {number} totalAmount - 表示する合計支出金額
 */
interface TotalExpenseDisplayProps {
  totalAmount: number
}

/**
 * 合計支出表示コンポーネント
 *
 * 合計支出金額を中央揃えで表示します。金額はプライマリカラーで強調表示され、
 * 「合計支出」ラベルと金額が横並びで配置されます。
 *
 * @component
 * @param {TotalExpenseDisplayProps} props - コンポーネントのプロパティ
 * @param {number} props.totalAmount - 表示する合計支出金額
 *
 * @returns {JSX.Element} 合計支出表示UI
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <TotalExpenseDisplay totalAmount={15000} />
 *
 * // 状態管理と組み合わせ
 * <TotalExpenseDisplay totalAmount={values.totalExpenseAmount} />
 * ```
 */
function TotalExpenseDisplay({ totalAmount }: TotalExpenseDisplayProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'primary.main',
        fontWeight: 'bold',
        mt: 3,
      }}
    >
      <TextLabel variant="h6" sx={{ display: 'inline' }}>
        合計支出
      </TextLabel>
      <AmountText
        amount={totalAmount}
        variant="h6"
        sx={{ display: 'inline' }}
      />
    </Box>
  )
}

export default TotalExpenseDisplay
