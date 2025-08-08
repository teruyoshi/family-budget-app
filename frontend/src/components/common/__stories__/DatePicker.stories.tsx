import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: '共通コンポーネント/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `日付選択コンポーネントのProps型定義
        
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

