import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Paper, Typography } from '@mui/material'
import PageTransition from '../PageTransition'

const meta: Meta<typeof PageTransition> = {
  title: '共通/PageTransition',
  component: PageTransition,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ページ遷移時のアニメーション効果を提供するコンポーネント。
React Router との統合を考慮し、SSR対応やアクセシビリティにも配慮した設計。

## 主な改善点（PRレビュー対応）
- **SSR安全性**: \`useMediaQuery({ noSsr: true })\` でクライアントサイド限定処理
- **マウント制御**: \`appear\`, \`mountOnEnter\`, \`unmountOnExit\` プロパティ対応
- **カスタマイズ**: \`easing\` プロパティでテーマ統合
- **型安全性**: \`any\` 型を \`Record<string, unknown>\` に変更
- **forwardRef**: ref転送対応でDOM操作可能
- **ルート統合**: \`locationKey\` でページ変更識別

## 使用推奨パターン
\`\`\`tsx
<Box sx={{ position: 'relative', overflow: 'hidden' }}>
  <PageTransition locationKey={location.key}>
    <Routes />
  </PageTransition>
</Box>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['fade', 'slide', 'none'],
      description: 'トランジションの種類',
    },
    direction: {
      control: 'select',
      options: ['left', 'right', 'up', 'down'],
      description: 'スライド方向（type="slide"時のみ有効）',
    },
    duration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'アニメーション時間（ミリ秒）',
    },
    easing: {
      control: 'text',
      description: 'カスタムイージング関数（CSS transition-timing-function値）',
    },
    appear: {
      control: 'boolean',
      description: '初期レンダリング時にもアニメーションを実行するか',
    },
    mountOnEnter: {
      control: 'boolean',
      description: '要素がマウントされる際にアニメーションを実行するか',
    },
    unmountOnExit: {
      control: 'boolean',
      description: '要素がアンマウントされる際にアニメーションを実行するか',
    },
    in: {
      control: 'boolean',
      description: 'トランジション有効フラグ',
    },
    locationKey: {
      control: 'text',
      description: 'ルートの変更を識別するためのキー',
    },
  },
  args: {
    type: 'fade',
    duration: 250,
    direction: 'left',
    in: true,
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
  },
}

export default meta
type Story = StoryObj<typeof PageTransition>

// サンプルコンテンツコンポーネント
const SampleContent = ({
  title = 'ページコンテンツ',
  color = 'primary.main',
}) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      minWidth: 300,
      minHeight: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: color,
      color: 'white',
    }}
  >
    <Typography variant="h5" component="h2">
      {title}
    </Typography>
  </Paper>
)

// 基本ストーリー
export const デフォルト: Story = {
  args: {
    children: <SampleContent />,
  },
}

export const FadeTransition: Story = {
  args: {
    type: 'fade',
    duration: 300,
    children: <SampleContent title="フェードトランジション" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'デフォルトのフェードイン/アウト効果。スムーズで汎用的なトランジション。',
      },
    },
  },
}

export const SlideLeft: Story = {
  args: {
    type: 'slide',
    direction: 'left',
    duration: 400,
    children: <SampleContent title="左スライド" color="secondary.main" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          '左方向へのスライドトランジション。ページ進行の視覚的表現に適している。',
      },
    },
  },
}

export const SlideRight: Story = {
  args: {
    type: 'slide',
    direction: 'right',
    duration: 400,
    children: <SampleContent title="右スライド" color="success.main" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          '右方向へのスライドトランジション。戻る操作の視覚的表現に適している。',
      },
    },
  },
}

export const CustomEasing: Story = {
  args: {
    type: 'fade',
    duration: 600,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    children: <SampleContent title="カスタムイージング" color="warning.main" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'カスタムイージング関数を使用したトランジション。より自然な動きを演出。',
      },
    },
  },
}

export const NoAnimation: Story = {
  args: {
    type: 'none',
    children: <SampleContent title="アニメーション無し" color="error.main" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'アニメーション無し。パフォーマンス重視やアクセシビリティ考慮時に使用。',
      },
    },
  },
}

export const WithLocationKey: Story = {
  args: {
    locationKey: 'page-1',
    children: <SampleContent title="ルートキー付き" color="info.main" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'React Router の location.key を使用したページ識別。適切なトランジション制御が可能。',
      },
    },
  },
}

export const MountControlled: Story = {
  args: {
    appear: false,
    mountOnEnter: false,
    unmountOnExit: false,
    children: <SampleContent title="マウント制御" color="text.secondary" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'マウント・アンマウント動作を細かく制御。メモリ使用量やパフォーマンスの最適化に有効。',
      },
    },
  },
}

// コントロール可能なインタラクティブストーリー
export const インタラクティブ: Story = {
  args: {
    type: 'fade',
    duration: 300,
    direction: 'left',
    easing: 'ease-in-out',
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
    children: <SampleContent title="インタラクティブデモ" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'すべてのプロパティを操作可能なインタラクティブデモ。設定変更の効果を確認できます。',
      },
    },
  },
}

// レスポンシブ推奨コンテナパターン
export const RecommendedContainer: Story = {
  args: {
    type: 'slide',
    direction: 'left',
    locationKey: 'demo-page',
    children: <SampleContent title="推奨コンテナパターン" />,
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 1,
          p: 2,
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 2, display: 'block' }}
        >
          推奨: position: 'relative', overflow: 'hidden' でラップ
        </Typography>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'React Router での推奨使用パターン。position: relative と overflow: hidden でコンテナをラップ。',
      },
    },
  },
}

// トレーサビリティ表
export const Traceability = {
  parameters: {
    docs: {
      page: () => (
        <div>
          <h2>🔗 トレーサビリティ表</h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '16px',
            }}
          >
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>項目</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>
                  関連リソース
                </th>
                <th style={{ padding: '12px', textAlign: 'left' }}>説明</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>
                  <strong>PRレビュー対応</strong>
                </td>
                <td style={{ padding: '12px' }}>
                  <a
                    href="https://github.com/teruyoshi/family-budget-app/pull/23#pullrequestreview-3123071862"
                    target="_blank"
                  >
                    PR #23 Review
                  </a>
                </td>
                <td style={{ padding: '12px' }}>
                  SSR対応、型安全性、マウント制御などの改善実装
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>
                  <strong>設計判断</strong>
                </td>
                <td style={{ padding: '12px' }}>ADR-007 (予定)</td>
                <td style={{ padding: '12px' }}>
                  ページトランジション設計とパフォーマンス考慮
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>
                  <strong>用語集</strong>
                </td>
                <td style={{ padding: '12px' }}>docs-src/glossary.md</td>
                <td style={{ padding: '12px' }}>
                  SSR、トランジション、アクセシビリティ関連用語
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px' }}>
                  <strong>テスト</strong>
                </td>
                <td style={{ padding: '12px' }}>PageTransition.test.tsx</td>
                <td style={{ padding: '12px' }}>
                  コンポーネント動作、reduced-motion対応テスト
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>
                  <strong>品質ガイド</strong>
                </td>
                <td style={{ padding: '12px' }}>docs-src/quality/</td>
                <td style={{ padding: '12px' }}>
                  アクセシビリティ、パフォーマンス、UX品質基準
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  },
}
