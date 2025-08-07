import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

interface TotalExpenseDisplayProps {
  totalAmount: number
}

/**
 * 合計支出表示コンポーネント
 * 
 * 合計支出金額を表示するためのコンポーネント。
 * センタリングされ、プライマリカラーで強調表示されます。
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
      <TextLabel text="合計支出：" variant="h6" sx={{ display: 'inline' }} />
      <AmountText amount={totalAmount} variant="h6" sx={{ display: 'inline' }} />
    </Box>
  )
}

export default TotalExpenseDisplay