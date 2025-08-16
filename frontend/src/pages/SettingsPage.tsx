import { Paper, Typography, Box, Alert, Divider } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import AppLayout from '@/components/layout/AppLayout'

/**
 * 設定ページコンポーネントのProps型定義
 *
 * 将来的な拡張を考慮した型定義（設定カテゴリ、初期値等）
 */
export interface SettingsPageProps {
  /** 初期表示する設定カテゴリ（将来実装） */
  initialCategory?: 'general' | 'appearance' | 'data' | 'account'
}

/**
 * 設定管理専用ページコンポーネント
 *
 * アプリケーションの各種設定を管理するページです。
 * 将来的な機能拡張に備えた基盤として作成されています。
 *
 * @remarks
 * **現在の状態:**
 * - プレースホルダー実装（将来拡張用の基盤）
 * - 基本的なUI構造のみ提供
 * - 設定項目は今後の要件に応じて追加予定
 *
 * **将来的な実装予定機能:**
 * - 外観設定（テーマ、言語、フォントサイズ等）
 * - データ設定（エクスポート、インポート、バックアップ等）
 * - 通知設定（アラート、リマインダー等）
 * - アカウント設定（プロフィール、セキュリティ等）
 * - アプリケーション設定（自動保存、デフォルト値等）
 *
 * **UI構成:**
 * - ヘッダー: ページタイトル
 * - メイン: 設定カテゴリとオプション（将来実装）
 * - 現在: 工事中メッセージと情報表示
 *
 * **デザインテーマ:**
 * - カラー: ブルーグレー系（設定画面らしい落ち着いた色調）
 * - レイアウト: シンプルで見やすい構成
 *
 * **ルーティング:**
 * - パス: /settings
 * - React Router経由でアクセス
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <Route path="/settings" element={<SettingsPage />} />
 * ```
 *
 * @example
 * ```tsx
 * // 将来的な拡張例（初期カテゴリ指定）
 * <SettingsPage initialCategory="appearance" />
 * ```
 */
export default function SettingsPage() {
  return (
    <AppLayout maxWidth="md">
      {/* ページヘッダー */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#e3f2fd', // 設定テーマ色（ブルー系）
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 1,
          }}
        >
          <SettingsIcon
            sx={{
              fontSize: 40,
              color: '#1565c0',
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#1565c0',
            }}
          >
            設定
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: '#0d47a1',
          }}
        >
          アプリケーションの設定管理
        </Typography>
      </Paper>

      {/* メインコンテンツ */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
        }}
      >
        {/* 工事中メッセージ */}
        <Alert
          severity="info"
          icon={<InfoIcon />}
          sx={{
            mb: 4,
            '& .MuiAlert-message': {
              fontSize: '1.1rem',
            },
          }}
        >
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            設定機能は開発中です
          </Typography>
          <Typography variant="body2">
            現在この機能は実装準備中です。将来のバージョンで以下の設定機能が追加される予定です。
          </Typography>
        </Alert>

        {/* 将来実装予定の機能一覧 */}
        <Typography variant="h6" component="h2" sx={{ mb: 3, color: '#1565c0' }}>
          実装予定の設定項目
        </Typography>

        <Box sx={{ mb: 4 }}>
          {/* 外観設定 */}
          <Typography variant="h6" component="h3" sx={{ mb: 2, color: '#424242' }}>
            🎨 外観設定
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, pl: 2, color: '#666' }}>
            • テーマ選択（ライト・ダーク・システム連動）
            <br />
            • 言語設定（日本語・英語）
            <br />
            • フォントサイズ調整
            <br />
            • カラーテーマのカスタマイズ
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* データ設定 */}
          <Typography variant="h6" component="h3" sx={{ mb: 2, color: '#424242' }}>
            💾 データ設定
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, pl: 2, color: '#666' }}>
            • データエクスポート（CSV・JSON・PDF）
            <br />
            • データインポート（他家計簿アプリから移行）
            <br />
            • 自動バックアップ設定
            <br />
            • データ削除・リセット
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* 通知設定 */}
          <Typography variant="h6" component="h3" sx={{ mb: 2, color: '#424242' }}>
            🔔 通知設定
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, pl: 2, color: '#666' }}>
            • 支出アラート（月次予算超過時）
            <br />
            • 定期入力リマインダー
            <br />
            • レポート自動生成通知
            <br />
            • ブラウザ通知の有効/無効
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* アプリケーション設定 */}
          <Typography variant="h6" component="h3" sx={{ mb: 2, color: '#424242' }}>
            ⚙️ アプリケーション設定
          </Typography>
          <Typography variant="body2" sx={{ pl: 2, color: '#666' }}>
            • 自動保存間隔の設定
            <br />
            • デフォルト金額・日付の設定
            <br />
            • 表示形式の設定（通貨、日付フォーマット）
            <br />
            • 初期表示ページの設定
          </Typography>
        </Box>

        {/* 現在の情報 */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: '#f8f9fa',
            borderRadius: 2,
            border: '1px solid #e9ecef',
          }}
        >
          <Typography variant="h6" component="h3" sx={{ mb: 2, color: '#495057' }}>
            現在のアプリケーション情報
          </Typography>
          <Typography variant="body2" sx={{ color: '#6c757d' }}>
            • バージョン: 0.3.1
            <br />
            • 最終更新: React Router 対応完了
            <br />
            • データ保存: ブラウザローカルストレージ（インメモリ）
            <br />
            • 対応ブラウザ: Chrome, Firefox, Safari, Edge（最新版）
          </Typography>
        </Box>
      </Paper>
    </AppLayout>
  )
}