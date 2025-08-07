import { Typography } from '@mui/material'

/**
 * アプリタイトルコンポーネント
 *
 * アプリケーションのメインタイトルを表示するコンポーネント。
 * 一貫したスタイルでアプリケーション名を表示します。
 */
function AppTitle() {
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

export default AppTitle
