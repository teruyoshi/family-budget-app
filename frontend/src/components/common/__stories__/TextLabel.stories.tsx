import type { Meta, StoryObj } from '@storybook/react';
import TextLabel from './TextLabel';

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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

