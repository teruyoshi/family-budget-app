import type { Meta, StoryObj } from '@storybook/react-vite'
import TransactionForm from '../TransactionForm'

const meta: Meta<typeof TransactionForm> = {
  component: TransactionForm,
  title: '共通コンポーネント/TransactionForm',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
収入・支出共用取引登録統合フォームコンポーネント。金額入力・日付選択・送信ボタンを統合した汎用フォーム。

## 📋 仕様トレーサビリティ

| 項目 | 関連資料 | 備考 |
|---|---|---|
| **設計判断** | [ADR-0001: TSDoc統一](../docs-src/adr/0001-use-tsdoc-unified-documentation.md) | ドキュメント戦略 |
| **ドメインモデル** | [用語集: 取引・入力UI](../docs-src/glossary.md#金額取引関連) | 用語定義・制約 |
| **単体テスト** | N/A（テスト未実装） | 今後実装予定 |
| **統合テスト** | [AmountInput + DatePicker連携](../src/components/common/__tests__/) | コンポーネント連携 |
| **品質方針** | [アクセシビリティガイド](../docs-src/quality/accessibility.md) | フォーム操作・キーボード対応 |

## 🧪 テストカバレッジ
- **基本機能**: フォーム送信、バリデーション、日付トグル
- **アクセシビリティ**: キーボード操作、Enter送信対応
- **統合**: AmountInput・DatePicker・Buttonの連携
        `,
      },
    },
  },
}
export default meta

export const ExpenseForm: StoryObj<typeof TransactionForm> = {
  args: {
    placeholder: '支出金額を入力してください',
    buttonText: '支出を登録',
    buttonColor: 'error',
    datePickerLabel: '支出日付',
    onSubmit: (data) => console.log('Expense:', data.amount, data.date),
  },
}

export const IncomeForm: StoryObj<typeof TransactionForm> = {
  args: {
    placeholder: '収入金額を入力してください',
    buttonText: '収入を登録',
    buttonColor: 'success',
    datePickerLabel: '収入日付',
    onSubmit: (data) => console.log('Income:', data.amount, data.date),
  },
}
