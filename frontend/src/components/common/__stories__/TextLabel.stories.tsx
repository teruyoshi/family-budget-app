import type { Meta, StoryObj } from '@storybook/react'
import TextLabel from '../TextLabel'

const meta: Meta<typeof TextLabel> = {
  component: TextLabel,
  title: 'components/common/TextLabel',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof TextLabel> = {
  args: {
    children: '残高',
  },
}

export const SmallLabel: StoryObj<typeof TextLabel> = {
  args: {
    children: '小さなラベル',
    variant: 'caption',
  },
}

export const LargeLabel: StoryObj<typeof TextLabel> = {
  args: {
    children: '大きなラベル',
    variant: 'h6',
  },
}
