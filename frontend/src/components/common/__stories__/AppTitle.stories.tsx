import type { Meta, StoryObj } from '@storybook/react';
import AppTitle from '../AppTitle';

const meta: Meta<typeof AppTitle> = {
  title: '共通コンポーネント/AppTitle',
  component: AppTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `アプリタイトルコンポーネント
アプリケーションのメインタイトルを表示するコンポーネント。
一貫したスタイルでアプリケーション名を表示します。
@group 共通コンポーネント
@component
@returns {JSX.Element} センタリングされた「家計簿アプリ」タイトル
@example
\`\`\`tsx
// アプリのヘッダー部分で使用
function App() {
  return (
    <div>
      <AppTitle />
    </div>
  );
}
\`\`\`
        
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

