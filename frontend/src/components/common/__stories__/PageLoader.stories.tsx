import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box, Typography } from '@mui/material'
import PageLoader from '../PageLoader'
import AppLayout from '@/components/layout/AppLayout'

/**
 * PageLoaderコンポーネントのStorybookストーリー
 * 
 * ページ読み込み中の表示、Suspenseフォールバック、
 * ローディング状態の視覚化を展示します。
 */

const theme = createTheme()

const meta: Meta<typeof PageLoader> = {
  title: 'Components/PageLoader',
  component: PageLoader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# PageLoader

ページの読み込み中に表示されるローディングコンポーネント。

## 主な機能
- **Suspenseフォールバック**: React.lazyでのコード分割時の表示
- **一貫したローディング体験**: 全ページで統一されたローディング表示
- **アクセシビリティ対応**: スクリーンリーダー向けの適切な通知
- **パフォーマンス最適化**: 軽量で高速なローディング表示

## 使用場面
- ページコンポーネントの遅延ロード時
- 大きなファイルのインポート時
- ネットワーク通信中の待機表示
- 重い計算処理中の表示

## 設計思想
- ユーザーの不安を軽減する明確な進行表示
- アプリ全体の統一感維持
- 素早い表示でユーザー体験向上
        `
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#303030' },
        { name: 'white', value: '#ffffff' }
      ]
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    )
  ]
} satisfies Meta<typeof PageLoader>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なローディング表示
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'PageLoaderの基本表示。中央配置されたローディングアニメーションとメッセージ。'
      }
    }
  }
}

/**
 * アプリレイアウト内でのローディング
 */
export const WithinAppLayout: Story = {
  render: () => (
    <AppLayout>
      <PageLoader />
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AppLayout内でのPageLoader表示。実際のページ遷移時のローディング状態を再現。'
      }
    }
  }
}

/**
 * Suspenseフォールバックシミュレーション
 */
export const SuspenseFallback: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Suspenseフォールバックデモ
        </Typography>
        <Typography variant="body1" paragraph>
          React.lazy()でのコード分割時に表示されるローディング状態のシミュレーション。
        </Typography>
        <Box sx={{ border: '2px dashed #ccc', borderRadius: 2, p: 2, mt: 3 }}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            ↓ ここに遅延ロードされるコンポーネントが表示される予定
          </Typography>
          <PageLoader />
        </Box>
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'React SuspenseとReact.lazyによるコード分割時のフォールバック表示シミュレーション。'
      }
    }
  }
}

/**
 * 複数のローディング状態
 */
export const MultipleLoaders: Story = {
  render: () => (
    <AppLayout maxWidth="lg">
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          複数ローディング状態デモ
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              ページA ローディング中
            </Typography>
            <PageLoader />
          </Box>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 1, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              ページB ローディング中
            </Typography>
            <PageLoader />
          </Box>
        </div>
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: '複数のページまたはコンポーネントが同時にローディング中の状態を表示。'
      }
    }
  }
}

/**
 * モバイル表示
 */
export const MobileView: Story = {
  render: () => (
    <AppLayout maxWidth="sm" padding={2}>
      <PageLoader />
    </AppLayout>
  ),
  parameters: {
    viewport: {
      name: 'iphone',
      styles: {
        width: '375px',
        height: '667px'
      }
    },
    docs: {
      description: {
        story: 'モバイルデバイスでのPageLoader表示。小さな画面でも適切に中央配置される。'
      }
    }
  }
}

/**
 * タブレット表示
 */
export const TabletView: Story = {
  render: () => (
    <AppLayout maxWidth="md" padding={3}>
      <PageLoader />
    </AppLayout>
  ),
  parameters: {
    viewport: {
      name: 'ipad',
      styles: {
        width: '768px',
        height: '1024px'
      }
    },
    docs: {
      description: {
        story: 'タブレットデバイスでのPageLoader表示。中間サイズでの最適化された表示。'
      }
    }
  }
}

/**
 * ダークテーマ
 */
export const DarkTheme: Story = {
  render: () => (
    <AppLayout backgroundColor="#303030">
      <PageLoader />
    </AppLayout>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'ダークテーマでのPageLoader表示。暗い背景でも視認性の良いローディング表示。'
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <CssBaseline />
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    )
  ]
}

/**
 * ルーティング遷移シミュレーション
 */
export const RoutingTransition: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          ページ遷移ローディング
        </Typography>
        <Typography variant="body1" paragraph>
          ページ間の遷移時に表示されるローディング状態のシミュレーション。
        </Typography>
        <Box sx={{ 
          border: '2px solid #2196f3', 
          borderRadius: 2, 
          p: 3, 
          mt: 3,
          backgroundColor: 'rgba(33, 150, 243, 0.05)'
        }}>
          <Typography variant="body2" gutterBottom color="primary">
            🔄 ページ遷移中: /expenses → /income
          </Typography>
          <PageLoader />
        </Box>
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ページ間遷移時のローディング状態シミュレーション。ユーザーに進行状況を明確に伝達。'
      }
    }
  }
}

/**
 * 長時間ローディング
 */
export const LongLoading: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          長時間ローディングテスト
        </Typography>
        <Typography variant="body1" paragraph>
          重いコンポーネントや大きなデータの読み込み時の表示。
        </Typography>
        <Box sx={{ 
          border: '2px solid #ff9800', 
          borderRadius: 2, 
          p: 3, 
          mt: 3,
          backgroundColor: 'rgba(255, 152, 0, 0.05)'
        }}>
          <Typography variant="body2" gutterBottom color="warning.main">
            ⏳ 大きなファイルを読み込み中... （通常より時間がかかります）
          </Typography>
          <PageLoader />
          <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
            * このローディングは長時間表示され続ける場合があります
          </Typography>
        </Box>
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: '長時間のローディング状況をシミュレート。ユーザーの不安を軽減する追加メッセージ付き。'
      }
    }
  }
}

/**
 * エラー境界との組み合わせ
 */
export const WithErrorBoundary: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          エラー境界テスト
        </Typography>
        <Typography variant="body1" paragraph>
          ローディング中にエラーが発生した場合の対応例。
        </Typography>
        <Box sx={{ 
          border: '2px solid #f44336', 
          borderRadius: 2, 
          p: 3, 
          mt: 3,
          backgroundColor: 'rgba(244, 67, 54, 0.05)'
        }}>
          <Typography variant="body2" gutterBottom color="error">
            ❌ ローディング中にエラーが発生しました
          </Typography>
          <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
            通常はエラー境界でキャッチされ、エラーページに遷移します
          </Typography>
          <PageLoader />
        </Box>
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ローディング中のエラー発生シナリオ。エラー境界と組み合わせた適切なエラーハンドリング。'
      }
    }
  }
}

/**
 * アクセシビリティテスト
 */
export const AccessibilityTest: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          アクセシビリティ確認
        </Typography>
        <Typography variant="body1" paragraph>
          PageLoaderのアクセシビリティ機能確認：
        </Typography>
        <ul>
          <li>スクリーンリーダー向けの適切なARIAラベル</li>
          <li>ローディング状態の音声通知</li>
          <li>視覚的インジケーターとテキストの組み合わせ</li>
          <li>十分なコントラスト比</li>
        </ul>
        <Box sx={{ 
          border: '2px solid #4caf50', 
          borderRadius: 2, 
          p: 3, 
          mt: 3,
          backgroundColor: 'rgba(76, 175, 80, 0.05)'
        }}>
          <Typography variant="body2" gutterBottom color="success.main">
            ♿ アクセシビリティ対応ローディング
          </Typography>
          <PageLoader />
        </Box>
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: 'アクセシビリティ機能の確認用デモ。視覚障害者や聴覚障害者にも適切に情報を伝達。'
      }
    }
  }
}

/**
 * パフォーマンス最適化デモ
 */
export const PerformanceOptimized: Story = {
  render: () => (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          パフォーマンス最適化
        </Typography>
        <Typography variant="body1" paragraph>
          PageLoaderの軽量性とパフォーマンス最適化の確認。
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
          {Array.from({ length: 12 }, (_, i) => (
            <Box 
              key={i}
              sx={{ 
                border: '1px solid #ddd', 
                borderRadius: 1, 
                p: 2,
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="caption" gutterBottom>
                ローダー {i + 1}
              </Typography>
              <PageLoader />
            </Box>
          ))}
        </div>
        <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
          * 12個同時表示でのパフォーマンステスト
        </Typography>
      </div>
    </AppLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: '複数のPageLoaderを同時表示してパフォーマンスを確認。軽量設計により多数表示でも滑らか。'
      }
    }
  }
}