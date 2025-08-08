import { Box } from '@mui/material'
import TextLabel from '../../../components/common/TextLabel'
import AmountText from '../../../components/common/AmountText'

/**
 * BalanceDisplayコンポーネントのプロパティ
 * @typedef {Object} BalanceDisplayProps
 * @property {number} balance - 表示する残高（収入 - 支出）
 */
interface BalanceDisplayProps {
  balance: number
}

/**
 * 残高表示コンポーネント
 *
 * 現在の残高を中央揃えで表示します。残高は緑色で強調表示され、
 * 「残高」ラベルと金額が横並びで配置されます。
 *
 * @group 残高機能
 * @component
 * @param {BalanceDisplayProps} props - コンポーネントのプロパティ
 * @param {number} props.balance - 表示する残高金額（正負両方対応）
 *
 * @returns {JSX.Element} 残高表示UI
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <BalanceDisplay balance={25000} />
 *
 * // マイナス残高の場合
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
