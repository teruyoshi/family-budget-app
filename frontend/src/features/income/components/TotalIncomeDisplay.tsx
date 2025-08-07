import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

interface TotalIncomeDisplayProps {
  totalAmount: number
}

/**
 * 合計収入表示コンポーネント
 *
 * 合計収入金額を表示するためのコンポーネント。
 * センタリングされ、成功カラー（グリーン）で強調表示されます。
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
        合計収入：
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