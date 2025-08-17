import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

/**
 * 合計支出表示コンポーネントのProps型定義
 */
export interface TotalExpenseDisplayProps {
  /** 表示する合計支出金額 */
  totalAmount: number
}

/**
 * 合計支出金額を中央揃えで表示するコンポーネント
 *
 * @component
 * @example
 * <TotalExpenseDisplay totalAmount={15000} />
 */
export default function TotalExpenseDisplay({
  totalAmount,
}: TotalExpenseDisplayProps) {
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
