import { Typography } from '@mui/material'

/**
 * アプリケーションのメインタイトルを表示するコンポーネント
 *
 * @component
 * @example
 * <AppTitle />
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
