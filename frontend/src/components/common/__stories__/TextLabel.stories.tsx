import type { Meta, StoryObj } from '@storybook/react';
import TextLabel from '../TextLabel';

const meta: Meta<typeof TextLabel> = {
  title: '共通コンポーネント/TextLabel',
  component: TextLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `テキストラベルコンポーネントのProps型定義
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'object',
      description: '表示するコンテンツ (必須)',
    },
    variant: {
      control: 'object',
      description: 'Typography のバリエーション (任意)',
    },
    sx: {
      control: 'object',
      description: 'スタイルオブジェクト (任意)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: undefined,
  },
};

