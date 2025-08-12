import { Typography, type TypographyProps } from '@mui/material'
import type { ReactNode } from 'react'

/**
 * テキストラベルコンポーネントのProps型定義
 *
 * コロン自動付加機能付きのラベル表示用プロパティセット。
 * フォームやデータ表示でのラベル統一化に使用します。
 */
export interface TextLabelProps {
  /**
   * ラベルとして表示するコンテンツ
   * @example "残高" → "残高：" と自動でコロンが付加される
   * @example "支出金額" → "支出金額：" と表示
   */
  children: ReactNode

  /**
   * MUI Typographyのバリアント
   * @defaultValue "body1"
   * @example "h6" - セクションヘッダー用の大きめラベル
   * @example "body2" - 詳細項目用の小さめラベル
   */
  variant?: TypographyProps['variant']

  /**
   * MUI sx propsによるカスタムスタイル
   * @example { color: 'primary.main', fontWeight: 'bold' } - 強調ラベル
   * @example { mb: 1 } - 下部マージン調整
   */
  sx?: TypographyProps['sx']
}

/**
 * コロン自動付加機能付きテキストラベルコンポーネント
 *
 * フォームやデータ表示での統一されたラベル表現を提供する表示専用コンポーネント。
 * 入力されたテキストの後に自動的に全角コロン（：）を付加し、一貫したラベル表記を実現します。
 *
 * @remarks
 * - **自動付加**: テキスト末尾に自動で「：」を追加
 * - **統一性**: プロジェクト全体でのラベル表記統一
 * - **MUI統合**: Typographyベースでテーマ対応
 * - **軽量**: 表示のみの単純なコンポーネント
 * - **アクセシビリティ**: セマンティックな意味を保持
 *
 * @example
 * ```tsx
 * // 基本的な使用例（残高表示）
 * <TextLabel>残高</TextLabel>
 * // 出力: "残高："
 * ```
 *
 * @example
 * ```tsx
 * // フォームラベルとしての使用
 * <Box>
 *   <TextLabel variant="h6">支出入力</TextLabel>
 *   <AmountInput value={amount} onChange={setAmount} />
 * </Box>
 * // ラベルが "支出入力：" と表示される
 * ```
 *
 * @example
 * ```tsx
 * // データ表示でのラベル使用
 * <Stack spacing={1}>
 *   <Box display="flex" gap={2}>
 *     <TextLabel sx={{ minWidth: 80 }}>今月の収入</TextLabel>
 *     <AmountText amount={totalIncome} />
 *   </Box>
 *   <Box display="flex" gap={2}>
 *     <TextLabel sx={{ minWidth: 80 }}>今月の支出</TextLabel>
 *     <AmountText amount={totalExpense} />
 *   </Box>
 * </Stack>
 * // "今月の収入：" "今月の支出：" とラベルが統一表示
 * ```
 *
 * @example
 * ```tsx
 * // カスタムスタイリング例
 * <TextLabel
 *   variant="body2"
 *   sx={{
 *     color: 'text.secondary',
 *     fontWeight: 'medium',
 *     mb: 0.5
 *   }}
 * >
 *   取引詳細
 * </TextLabel>
 * // "取引詳細：" をカスタムスタイルで表示
 * ```
 */
export default function TextLabel({
  children,
  variant = 'body1',
  sx,
}: TextLabelProps) {
  return (
    <Typography variant={variant} sx={sx}>
      {children}：
    </Typography>
  )
}
