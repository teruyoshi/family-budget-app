import { Box, Typography } from '@mui/material'

/**
 * ページ読み込み中表示コンポーネント
 *
 * React.lazy による遅延ロード時のSuspense fallbackとして使用。
 *
 * @example
 * ```tsx
 * <Suspense fallback={<PageLoader />}>
 *   <LazyComponent />
 * </Suspense>
 * ```
 */
const PageLoader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 200,
    }}
  >
    <Typography variant="h6" color="text.secondary">
      読み込み中...
    </Typography>
  </Box>
)

export default PageLoader
