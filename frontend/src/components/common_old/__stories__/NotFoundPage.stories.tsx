import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import NotFoundPage from '../NotFoundPage'
import AppLayout from '@/components/layout/AppLayout'

/**
 * NotFoundPage（404エラーページ）のStorybookストーリー
 *
 * ルーティングエラー時の表示、ユーザビリティ、
 * 回復オプションを展示します。
 */

const theme = createTheme()

const meta: Meta<typeof NotFoundPage> = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# NotFoundPage (404エラーページ)

存在しないURLにアクセスした際に表示される404エラーページ。

## 主な機能
- **明確なエラーメッセージ**: ユーザーフレンドリーな説明
- **ナビゲーション維持**: アプリの基本機能は継続利用可能
- **回復オプション**: ホームページやメインページへの誘導
- **一貫性**: アプリ全体のデザインシステムを維持

## 設計思想
- ユーザーの混乱を最小限に抑える
- 明確で親しみやすいエラーメッセージ
- 次のアクションへの適切な誘導

## UX配慮
- 責める表現を避けた丁寧な説明
- 視覚的に分かりやすいアイコンとメッセージ
- 迷子にならないナビゲーション提供
        `,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#303030' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={['/nonexistent-page']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof NotFoundPage>

export default meta
type Story = StoryObj<typeof meta>

/**
 * スタンドアロン404ページ
 */
export const Standalone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '404エラーページの単体表示。レイアウトなしでのコンポーネント単体の確認用。',
      },
    },
  },
}

/**
 * アプリレイアウト統合表示
 */
export const WithAppLayout: Story = {
  render: () => (
    <AppLayout>
      <NotFoundPage />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'AppLayoutと統合された404ページ。実際のアプリケーションでの表示に最も近い状態。ナビゲーションから他ページへの移動が可能。',
      },
    },
  },
}

/**
 * 様々な無効URLパターン
 */
export const VariousInvalidUrls: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <h2>様々な無効URLパターンのテスト</h2>
        <p>以下のような無効URLでアクセスした場合の表示確認:</p>
        <ul>
          <li>/nonexistent-page</li>
          <li>/admin</li>
          <li>/api/test</li>
          <li>/expenses/invalid</li>
          <li>/settings/nonexistent</li>
        </ul>
        <NotFoundPage />
      </div>
    </AppLayout>
  ),
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={['/admin/users/123']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          '深いパスや管理者ページなど、様々な無効URLパターンでの404ページ表示例。',
      },
    },
  },
}

/**
 * モバイル表示
 */
export const MobileView: Story = {
  render: () => (
    <AppLayout maxWidth="sm" padding={2}>
      <NotFoundPage />
    </AppLayout>
  ),
  parameters: {
    viewport: {
      name: 'iphone',
      styles: {
        width: '375px',
        height: '667px',
      },
    },
    docs: {
      description: {
        story:
          'モバイルデバイスでの404ページ表示。コンパクトなレイアウトとタッチフレンドリーなナビゲーション。',
      },
    },
  },
}

/**
 * タブレット表示
 */
export const TabletView: Story = {
  render: () => (
    <AppLayout maxWidth="md" padding={3}>
      <NotFoundPage />
    </AppLayout>
  ),
  parameters: {
    viewport: {
      name: 'ipad',
      styles: {
        width: '768px',
        height: '1024px',
      },
    },
    docs: {
      description: {
        story:
          'タブレットデバイスでの404ページ表示。中間サイズでの最適化されたレイアウト。',
      },
    },
  },
}

/**
 * ダークテーマ
 */
export const DarkTheme: Story = {
  render: () => (
    <AppLayout backgroundColor="#303030">
      <div style={{ color: 'white' }}>
        <NotFoundPage />
      </div>
    </AppLayout>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'ダークテーマでの404ページ表示。暗い背景でも読みやすく、一貫したデザイン。',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <CssBaseline />
        <MemoryRouter initialEntries={['/dark-nonexistent']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
}

/**
 * ナビゲーション統合デモ
 */
export const NavigationIntegration: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <h2>ナビゲーション統合確認</h2>
        <p>404ページでもナビゲーションが正常に機能することを確認:</p>
        <ul>
          <li>左側ナビゲーションメニューが利用可能</li>
          <li>各ページへの移動が可能</li>
          <li>アプリタイトルクリックでホームに戻る</li>
          <li>パンくずナビゲーション（実装されている場合）</li>
        </ul>
        <NotFoundPage />
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '404ページでもナビゲーション機能が継続利用できることを確認するデモ。ユーザーが迷子にならない設計。',
      },
    },
  },
}

/**
 * アクセシビリティテスト
 */
export const AccessibilityTest: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <h2>アクセシビリティ確認</h2>
        <p>404ページのアクセシビリティ機能:</p>
        <ul>
          <li>適切な見出し構造（H1, H2等）</li>
          <li>キーボードナビゲーション対応</li>
          <li>スクリーンリーダー対応</li>
          <li>十分なコントラスト比</li>
          <li>明確なエラーメッセージ</li>
        </ul>
        <NotFoundPage />
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'アクセシビリティ機能の確認用デモ。視覚障害者や運動障害者にも使いやすい404ページ。',
      },
    },
  },
}

/**
 * エラー回復シナリオ
 */
export const ErrorRecoveryScenario: Story = {
  render: () => (
    <AppLayout>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          marginBottom: '20px',
        }}
      >
        <h3>🔍 エラー回復シナリオテスト</h3>
        <p>
          <strong>シナリオ:</strong>{' '}
          ユーザーが古いブックマークまたは無効なリンクからアクセス
        </p>
        <p>
          <strong>期待動作:</strong>
        </p>
        <ol>
          <li>明確な404メッセージ表示</li>
          <li>ナビゲーションは正常機能</li>
          <li>ホームページへの誘導</li>
          <li>検索機能（将来実装）</li>
          <li>よくアクセスされるページへのリンク</li>
        </ol>
      </div>
      <NotFoundPage />
    </AppLayout>
  ),
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={['/old-bookmark-url']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'ユーザーエラー回復のシナリオテスト。古いブックマークや無効リンクからの適切な回復を支援。',
      },
    },
  },
}

/**
 * 開発者向けデバッグ表示
 */
export const DeveloperDebug: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          <h4>🔧 開発者向けデバッグ情報</h4>
          <p>
            <strong>Current URL:</strong> /nonexistent-debug-page
          </p>
          <p>
            <strong>Matched Route:</strong> * (catch-all)
          </p>
          <p>
            <strong>Router State:</strong> NotFound
          </p>
          <p>
            <strong>Timestamp:</strong> {new Date().toISOString()}
          </p>
          <p>
            <strong>User Agent:</strong> {navigator.userAgent.substring(0, 50)}
            ...
          </p>
        </div>
        <NotFoundPage />
      </div>
    </AppLayout>
  ),
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={['/nonexistent-debug-page']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          '開発者向けの404ページデバッグ表示例。開発環境でのトラブルシューティングに活用。',
      },
    },
  },
}
