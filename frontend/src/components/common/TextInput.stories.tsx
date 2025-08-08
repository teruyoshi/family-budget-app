import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: '共通コンポーネント/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `汎用テキスト入力コンポーネント  MUI TextFieldをラップした再利用可能なコンポーネントです。 プロジェクト全体で一貫したスタイリングとAPI設計を提供します。  設計原則: - Single Responsibility: 入力機能のみに責任を持つ - Composition: MUIコンポーネントを合成して機能を提供 - Reusability: 型安全で再利用可能な設計  @group 共通コンポーネント @component @param {TextInputProps} props - コンポーネントのプロパティ @param {'text' | 'number' | 'email' | 'password'} props.type - 入力フィールドのタイプ @param {string} props.placeholder - プレースホルダーテキスト @param {string} props.value - 現在の入力値 @param {function} props.onChange - 値変更時のコールバック関数 @param {SxProps<Theme>} props.sx - スタイルオブジェクト @param {boolean} props.required - 必須項目かどうか @param {boolean} props.fullWidth - 全幅で表示するかどうか @param {'outlined' | 'filled' | 'standard'} props.variant - 入力フィールドのバリアント @returns {JSX.Element} Material-UIのTextFieldをラップしたテキスト入力コンポーネント  @example // 基本使用例 <TextInput   value={name}   onChange={setName}   placeholder="名前を入力" />  @example // 数値入力 <TextInput   type="number"   value={amount}   onChange={setAmount}   required />  @example // メール入力 <TextInput   type="email"   value={email}   onChange={setEmail}   placeholder="メールアドレス"   required />
        
詳細な技術仕様は [TypeDoc](http://localhost:3001) で確認できます。`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'number',
      description: '入力フィールドのタイプ (任意)',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト (任意)',
    },
    value: {
      control: 'text',
      description: '現在の入力値 (必須)',
    },
    onChange: {
      control: 'text',
      description: '値変更時のコールバック関数 (必須)',
    },
    sx: {
      control: 'object',
      description: 'スタイルオブジェクト (任意)',
    },
    required: {
      control: 'boolean',
      description: '必須項目かどうか (任意)',
    },
    fullWidth: {
      control: 'boolean',
      description: '全幅で表示するかどうか (任意)',
    },
    variant: {
      control: 'select',
      description: '入力フィールドのバリアント (任意)',
      options: ["outlined","filled","standard"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'プレースホルダーテキスト',
    value: 'テキスト',
    onChange: () => console.log('クリック'),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <TextInput variant="outlined" />
      <TextInput variant="filled" />
      <TextInput variant="standard" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'バリアントの表示例',
      },
    },
  },
};
