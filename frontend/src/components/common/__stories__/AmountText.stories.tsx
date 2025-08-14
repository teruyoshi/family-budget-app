import type { Meta, StoryObj } from '@storybook/react-vite'
import AmountText from '../AmountText'

const meta: Meta<typeof AmountText> = {
  component: AmountText,
  title: '共通コンポーネント/AmountText',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
金額表示専用コンポーネント。統一フォーマットライブラリを使用し、一貫した金額表示を提供します。

## 📋 仕様トレーサビリティ

| 項目 | 関連資料 | 備考 |
|---|---|---|
| **設計判断** | [ADR-0001: TSDoc統一](../docs-src/adr/0001-use-tsdoc-unified-documentation.md) | ドキュメント戦略 |
| **ドメインモデル** | [用語集: 金額・表示UI](../docs-src/glossary.md#金額取引関連) | 用語定義・制約 |
| **単体テスト** | N/A（テスト未実装） | 今後実装予定 |
| **統合テスト** | [lib/format統合](../src/lib/format/__tests__/money.test.ts) | フォーマットライブラリ連携 |
| **品質方針** | [アクセシビリティガイド](../docs-src/quality/accessibility.md) | WCAG 2.1 AA準拠 |

## 🧪 テストカバレッジ
- **基本機能**: 金額フォーマット表示、バリアント対応
- **エッジケース**: ゼロ値・負値・大きな数値の表示確認
- **統合**: lib/format/money.ts との連携確認
        `,
      },
    },
  },
}
export default meta

export const Default: StoryObj<typeof AmountText> = {
  args: {
    amount: 15000,
  },
}

export const LargeAmount: StoryObj<typeof AmountText> = {
  args: {
    amount: 1234567,
    variant: 'h4',
  },
}

export const SmallAmount: StoryObj<typeof AmountText> = {
  args: {
    amount: 500,
    variant: 'body2',
  },
}
