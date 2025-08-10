import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

/**
 * 残高表示コンポーネントのProps型定義
 */
export interface BalanceDisplayProps {
  /** 表示する残高金額 */
  balance: number
}

/**
 * 現在の残高を中央揃えで表示するコンポーネント
 *
 * @component
 * @example
 * <BalanceDisplay balance={25000} />
 */
export default function BalanceDisplay({ balance }: BalanceDisplayProps) {
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
