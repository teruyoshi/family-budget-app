import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

/**
 * 合計収入表示コンポーネントのProps型定義
 */
export interface TotalIncomeDisplayProps {
  /** 表示する合計収入金額 */
  totalAmount: number
}

/**
 * 合計収入金額を中央揃えで表示するコンポーネント
 *
 * @component
 * @example
 * <TotalIncomeDisplay totalAmount={250000} />
 */
export default function TotalIncomeDisplay({
  totalAmount,
}: TotalIncomeDisplayProps) {
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
