import { Breadcrumbs, Link, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { type AppRoute, getRouteInfo } from '@/routes/routes'

/**
 * パンくずナビゲーションコンポーネントのProps型定義
 */
export interface AppBreadcrumbsProps {
  /** カスタムパンくずアイテムの追加 */
  customItems?: Array<{
    /** 表示ラベル */
    label: string
    /** リンク先（省略時は非リンク） */
    href?: string
  }>
  /** ホームアイコンの表示有無 */
  showHomeIcon?: boolean
  /** 最大表示幅 */
  maxWidth?: number | string
}

/**
 * アプリケーション用パンくずナビゲーションコンポーネント
 *
 * 現在のルートパスに基づいて自動的にパンくずリストを生成します。
 * MUI の Breadcrumbs コンポーネントを使用し、React Router と連携。
 *
 * @remarks
 * **主な機能:**
 * - 現在ルートの自動検出とパンくず生成
 * - routes.tsx の設定との連携
 * - ホームアイコン付きナビゲーション
 * - カスタムアイテムの追加対応
 * - アクセシビリティ準拠（aria-label等）
 *
 * **パンくず構造:**
 * - 第1階層: ホーム（常に表示）
 * - 第2階層: 現在のページ
 * - 将来拡張: 深い階層のページ（詳細ページ等）
 *
 * **表示例:**
 * - ダッシュボード: 🏠 ホーム
 * - 支出管理: 🏠 ホーム > 支出管理
 * - 履歴表示: 🏠 ホーム > 履歴表示
 *
 * **使用場面:**
 * - AppLayout での自動表示
 * - ユーザーの現在位置把握
 * - 上位階層への簡単ナビゲーション
 *
 * @example
 * ```tsx
 * // 基本的な使用例（自動パンくず生成）
 * <AppBreadcrumbs />
 * ```
 *
 * @example
 * ```tsx
 * // カスタムアイテム付き
 * <AppBreadcrumbs
 *   customItems={[
 *     { label: '詳細ページ', href: '/detail/123' },
 *     { label: '編集' }
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // ホームアイコン無し、幅制限付き
 * <AppBreadcrumbs
 *   showHomeIcon={false}
 *   maxWidth={400}
 * />
 * ```
 */
export default function AppBreadcrumbs({
  customItems = [],
  showHomeIcon = true,
  maxWidth,
}: AppBreadcrumbsProps) {
  const location = useLocation()

  // 現在のルート情報を取得
  const currentRoute = getRouteInfo(location.pathname as AppRoute)

  // パンくずアイテムを構築
  const breadcrumbItems = []

  // 1. ホーム項目（常に第1階層）
  const isHomePage = location.pathname === '/'
  if (isHomePage) {
    // ホームページでは単独表示
    breadcrumbItems.push({
      label: 'ホーム',
      href: undefined, // 現在ページなのでリンク無し
      icon: showHomeIcon ? (
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
      ) : undefined,
      isCurrent: true,
    })
  } else {
    // 他ページではホームをリンクとして表示
    breadcrumbItems.push({
      label: 'ホーム',
      href: '/',
      icon: showHomeIcon ? (
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
      ) : undefined,
      isCurrent: false,
    })
  }

  // 2. 現在ページ項目（ホーム以外の場合）
  if (!isHomePage && currentRoute) {
    breadcrumbItems.push({
      label: currentRoute.title,
      href: undefined, // 現在ページなのでリンク無し
      icon: undefined,
      isCurrent: true,
    })
  }

  // 3. カスタムアイテム（詳細ページ等の深い階層用）
  customItems.forEach((item, index) => {
    breadcrumbItems.push({
      label: item.label,
      href: item.href,
      icon: undefined,
      isCurrent: index === customItems.length - 1 && !item.href, // 最後のアイテムでhrefが無い場合は現在ページ
    })
  })

  // パンくずが1項目のみの場合は非表示（ホームページ等）
  if (breadcrumbItems.length <= 1 && isHomePage) {
    return null
  }

  return (
    <Breadcrumbs
      aria-label="パンくずナビゲーション"
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{
        mb: 2,
        maxWidth,
        '& .MuiBreadcrumbs-ol': {
          flexWrap: 'nowrap',
        },
        '& .MuiBreadcrumbs-li': {
          minWidth: 0, // テキスト省略を有効化
        },
      }}
    >
      {breadcrumbItems.map((item, index) => {
        const key = `breadcrumb-${index}`

        if (item.isCurrent || !item.href) {
          // 現在ページ または リンク無しアイテム
          return (
            <Typography
              key={key}
              color="text.primary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: item.isCurrent ? 'medium' : 'normal',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.icon}
              {item.label}
            </Typography>
          )
        } else {
          // リンクアイテム
          return (
            <Link
              key={key}
              component={RouterLink}
              to={item.href}
              underline="hover"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        }
      })}
    </Breadcrumbs>
  )
}
