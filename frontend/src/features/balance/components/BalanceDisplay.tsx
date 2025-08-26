import { Box } from '@mui/material'
import { AmountText, TextLabel } from '@/components/ui'

/**
 * 残高表示コンポーネントのProps型定義
 */
export interface BalanceDisplayProps {
  /** 表示する残高金額 */
  balance: number
}

/**
 * 家計残高表示コンポーネント
 *
 * 現在の残高を中央揃えで表示します。
 * 残高の正負に関わらず緑色で表示されます。
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
