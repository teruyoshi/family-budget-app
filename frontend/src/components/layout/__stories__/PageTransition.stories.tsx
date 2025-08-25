import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Box, Paper, Typography, Button, Stack } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { DateLocalizationProvider } from '@/components/provider'
import PageTransition from '../PageTransition'

const theme = createTheme()

const meta: Meta<typeof PageTransition> = {
  title: 'コンポーネント/レイアウト/PageTransition',
  component: PageTransition,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ページ遷移時のアニメーション効果を提供するコンポーネント

React Router との統合を考慮し、SSR対応やアクセシビリティにも配慮した設計。
MUI の Transition コンポーネントを使用して、設定可能な遷移効果を実現します。

## 主な機能
- フェードイン/アウト効果
- スライドトランジション（上下左右対応）
- カスタマイズ可能なアニメーション時間・イージング
- SSR対応（安全なメディアクエリ処理）
- アクセシビリティ対応（prefers-reduced-motion考慮）
- マウント・アンマウント制御
- ルーティング統合（locationKeyサポート）

## アニメーションタイプ
- **fade**: フェードイン/アウト（デフォルト）
- **slide**: スライド遷移
- **none**: アニメーション無し（パフォーマンス重視）

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
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DateLocalizationProvider>
          <Story />
        </DateLocalizationProvider>
      </ThemeProvider>
    ),
  ],
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
    in: {
      control: 'boolean',
      description: 'トランジション有効フラグ',
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
    easing: {
      control: 'text',
      description: 'カスタムイージング関数',
    },
    locationKey: {
      control: 'text',
      description: 'ルートの変更を識別するためのキー',
    },
  },
}

export default meta

type Story = StoryObj<typeof PageTransition>

// サンプルコンテンツコンポーネント
const SampleContent = ({ title = 'ページコンテンツ', color = '#1976d2' }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      minWidth: 300,
      minHeight: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      color: 'white',
    }}
  >
    <Typography variant="h4" component="h1" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" align="center">
      このコンテンツにPageTransitionアニメーションが適用されています。
    </Typography>
  </Paper>
)

export const デフォルト: Story = {
  args: {},
  render: (args) => (
    <PageTransition {...args}>
      <SampleContent />
    </PageTransition>
  ),
}

export const フェードトランジション: Story = {
  args: {
    type: 'fade',
    duration: 300,
  },
  render: (args) => (
    <PageTransition {...args}>
      <SampleContent title="フェード効果" color="#2e7d32" />
    </PageTransition>
  ),
  parameters: {
    docs: {
      description: {
        story: 'フェードイン/アウト効果でページが表示されます。',
      },
    },
  },
}

export const スライドトランジション: Story = {
  args: {
    type: 'slide',
    direction: 'left',
    duration: 250,
  },
  render: (args) => (
    <PageTransition {...args}>
      <SampleContent title="スライド効果" color="#ed6c02" />
    </PageTransition>
  ),
  parameters: {
    docs: {
      description: {
        story: '指定した方向からスライドしながらページが表示されます。',
      },
    },
  },
}

export const スライド方向バリエーション: Story = {
  render: () => {
    const directions = ['left', 'right', 'up', 'down'] as const
    const colors = ['#1976d2', '#2e7d32', '#ed6c02', '#d32f2f']

    return (
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {directions.map((direction, index) => (
          <PageTransition
            key={direction}
            type="slide"
            direction={direction}
            duration={400}
          >
            <Paper
              elevation={2}
              sx={{
                p: 2,
                minWidth: 140,
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors[index],
                color: 'white',
                mb: 2,
              }}
            >
              <Typography variant="h6">{direction}</Typography>
              <Typography variant="body2">スライド</Typography>
            </Paper>
          </PageTransition>
        ))}
      </Stack>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          '4つのスライド方向（left, right, up, down）のデモンストレーション。',
      },
    },
  },
}

export const アニメーション無し: Story = {
  args: {
    type: 'none',
  },
  render: (args) => (
    <PageTransition {...args}>
      <SampleContent title="アニメーション無し" color="#757575" />
    </PageTransition>
  ),
  parameters: {
    docs: {
      description: {
        story: 'パフォーマンス重視でアニメーション効果を無効にした状態。',
      },
    },
  },
}

export const カスタム設定: Story = {
  args: {
    type: 'fade',
    duration: 600,
    easing: 'ease-in-out',
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
  },
  render: (args) => (
    <PageTransition {...args}>
      <SampleContent title="カスタム設定" color="#7b1fa2" />
    </PageTransition>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'アニメーション時間、イージング、マウント制御をカスタマイズした例。',
      },
    },
  },
}

export const 高速アニメーション: Story = {
  args: {
    type: 'slide',
    direction: 'right',
    duration: 150,
  },
  render: (args) => (
    <PageTransition {...args}>
      <SampleContent title="高速アニメーション" color="#c62828" />
    </PageTransition>
  ),
  parameters: {
    docs: {
      description: {
        story: 'アニメーション時間を短縮してレスポンシブ感を向上させた例。',
      },
    },
  },
}

export const 低速アニメーション: Story = {
  args: {
    type: 'fade',
    duration: 800,
  },
  render: (args) => (
    <PageTransition {...args}>
      <SampleContent title="低速アニメーション" color="#5d4037" />
    </PageTransition>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ゆったりとしたアニメーションで上品な印象を与える例。',
      },
    },
  },
}

export const インタラクティブデモ: Story = {
  render: function InteractivePageTransition() {
    const [transitionKey, setTransitionKey] = useState(0)
    const [currentType, setCurrentType] = useState<'fade' | 'slide' | 'none'>(
      'fade'
    )
    const [currentDirection, setCurrentDirection] = useState<
      'left' | 'right' | 'up' | 'down'
    >('left')

    const pages = [
      { title: 'ページ 1', color: '#1976d2' },
      { title: 'ページ 2', color: '#2e7d32' },
      { title: 'ページ 3', color: '#ed6c02' },
      { title: 'ページ 4', color: '#d32f2f' },
    ]

    const currentPage = pages[transitionKey % pages.length]

    const triggerTransition = () => {
      setTransitionKey((prev) => prev + 1)
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            onClick={() => setCurrentType('fade')}
            color={currentType === 'fade' ? 'primary' : 'inherit'}
          >
            フェード
          </Button>
          <Button
            variant="outlined"
            onClick={() => setCurrentType('slide')}
            color={currentType === 'slide' ? 'primary' : 'inherit'}
          >
            スライド
          </Button>
          <Button
            variant="outlined"
            onClick={() => setCurrentType('none')}
            color={currentType === 'none' ? 'primary' : 'inherit'}
          >
            なし
          </Button>
        </Stack>

        {currentType === 'slide' && (
          <Stack direction="row" spacing={1}>
            {(['left', 'right', 'up', 'down'] as const).map((dir) => (
              <Button
                key={dir}
                size="small"
                variant="outlined"
                onClick={() => setCurrentDirection(dir)}
                color={currentDirection === dir ? 'primary' : 'inherit'}
              >
                {dir}
              </Button>
            ))}
          </Stack>
        )}

        <PageTransition
          key={transitionKey}
          type={currentType}
          direction={currentDirection}
          duration={300}
          locationKey={transitionKey.toString()}
        >
          <SampleContent title={currentPage.title} color={currentPage.color} />
        </PageTransition>

        <Button variant="contained" onClick={triggerTransition} size="large">
          次のページへ遷移
        </Button>
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'トランジションタイプや方向を動的に変更できるインタラクティブなデモ。実際のページ遷移をシミュレートします。',
      },
    },
  },
}
