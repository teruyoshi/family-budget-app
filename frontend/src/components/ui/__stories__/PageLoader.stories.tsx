import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Paper } from '@mui/material'
import { Suspense } from 'react'
import PageLoader from '../PageLoader'

const meta: Meta<typeof PageLoader> = {
  title: 'UI/PageLoader',
  component: PageLoader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'React.lazy による遅延ロード時のSuspense fallbackとして使用されるローディングコンポーネント。',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InContainer: Story = {
  decorators: [
    (Story) => (
      <Paper sx={{ width: 400, height: 300, p: 2 }}>
        <Story />
      </Paper>
    ),
  ],
}

export const WithSuspense: Story = {
  render: () => {
    const LazyComponent = () => (
      <Box sx={{ p: 2 }}>
        <h2>遅延ロードされたコンポーネント</h2>
        <p>このコンポーネントは遅延ロードされました。</p>
      </Box>
    )

    return (
      <Paper sx={{ width: 400, height: 300, p: 2 }}>
        <Suspense fallback={<PageLoader />}>
          <LazyComponent />
        </Suspense>
      </Paper>
    )
  },
}

export const MultipleLoaders: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Paper sx={{ width: 200, height: 200 }}>
        <PageLoader />
      </Paper>
      <Paper sx={{ width: 200, height: 200 }}>
        <PageLoader />
      </Paper>
      <Paper sx={{ width: 200, height: 200 }}>
        <PageLoader />
      </Paper>
    </Box>
  ),
}

export const DifferentHeights: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper sx={{ width: 400, height: 100 }}>
        <PageLoader />
      </Paper>
      <Paper sx={{ width: 400, height: 200 }}>
        <PageLoader />
      </Paper>
      <Paper sx={{ width: 400, height: 300 }}>
        <PageLoader />
      </Paper>
    </Box>
  ),
}
