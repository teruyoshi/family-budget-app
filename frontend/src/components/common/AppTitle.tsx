import { Typography } from '@mui/material'

/**
 * アプリケーションのメインタイトル表示コンポーネント
 *
 * 家計簿アプリのメインヘッダーとして使用する固定タイトル。
 * MUI Typographyをベースとし、中央揃え・太字で視覚的な階層を提供します。
 *
 * @remarks
 * - 固定テキスト「家計簿アプリ」を表示
 * - h1セマンティック要素でアクセシビリティ対応
 * - 中央揃え・太字で視覚的な重要性を強調
 * - レスポンシブ対応（MUI Typographyの機能を活用）
 *
 * @example
 * ```tsx
 * // ページヘッダーとしての基本使用
 * <AppTitle />
 * ```
 *
 * @example
 * ```tsx
 * // レイアウトコンポーネント内での使用
 * <Container>
 *   <AppTitle />
 *   <Box>
 *     // その他のコンテンツ
 *   </Box>
 * </Container>
 * ```
 */
export default function AppTitle() {
  return (
    <Typography
      variant="h3"
      component="h1"
      gutterBottom
      sx={{
        textAlign: 'center',
        fontWeight: 'bold',
        mb: 3,
      }}
    >
      家計簿アプリ
    </Typography>
  )
}
