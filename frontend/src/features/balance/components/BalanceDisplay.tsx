import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

interface BalanceDisplayProps {
  balance: number
}

/**
 * 残高表示コンポーネント
 * 現在の残高を中央揃えで緑色表示します。
 *
 * @group 残高機能
 *
 * @example
 * ```tsx
 * <BalanceDisplay balance={25000} />
 * <BalanceDisplay balance={-1500} />
 * ```
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
        残高
      </TextLabel>
      <AmountText amount={balance} variant="h5" sx={{ display: 'inline' }} />
    </Box>
  )
}

export default BalanceDisplay
