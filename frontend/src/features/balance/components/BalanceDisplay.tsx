import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

interface BalanceDisplayProps {
  balance: number
}

/**
 * 残金表示コンポーネント
 *
 * 現在の残高を表示するためのコンポーネント。
 * センタリングされ、緑色で強調表示されます。
 */
function BalanceDisplay({ balance }: BalanceDisplayProps) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'success.main',
        fontWeight: 'bold',
        mb: 3,
      }}
    >
      <TextLabel variant="h5" sx={{ display: 'inline' }}>
        残金
      </TextLabel>
      <AmountText amount={balance} variant="h5" sx={{ display: 'inline' }} />
    </Box>
  )
}

export default BalanceDisplay
