import type { Meta, StoryObj } from '@storybook/react';
import AppTitle from './AppTitle';

const meta: Meta<typeof AppTitle> = {
  title: '共通コンポーネント/AppTitle',
  component: AppTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `アプリケーションのタイトルを表示するコンポーネントです。統一されたスタイリングを提供します。
        
詳細な技術仕様は [TypeDoc](http://localhost:3001/modules/components_common_AppTitle.html) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InHeader: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'ヘッダー領域での使用例',
      },
    },
  },
};