# コンポーネント設計ガイド

家計簿アプリで採用しているコンポーネント設計原則とベストプラクティスをまとめています。

## 🏗 設計原則

### 1. Single Responsibility Principle (単一責任原則)

各コンポーネントは一つの明確な責任を持つべきです。

```tsx
// ✅ Good: 支出入力のみに責任を持つ
function ExpenseInput({ value, onChange }) {
  return (
    <TextInput
      type="number"
      value={value}
      onChange={onChange}
      placeholder="支出金額を入力"
    />
  )
}

// ❌ Bad: 複数の責任を持つ
function ExpenseInputForm({ value, onChange, onSubmit, categories }) {
  // 入力、バリデーション、送信、カテゴリ管理など複数の責任
}
```

### 2. Composition over Inheritance (継承より合成)

継承ではなく合成によってコンポーネントを組み立てます。

```tsx
// ✅ Good: 合成による設計
function ExpenseForm({ onSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <ExpenseInput value={amount} onChange={setAmount} />
      <SubmitButton>支出を登録</SubmitButton>
    </form>
  )
}

// より良い: さらに柔軟な合成
function ExpenseForm({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
    </form>
  )
}
```

### 3. Props Interface Design

明確で拡張可能なProps設計を心がけます。

```tsx
// ✅ Good: 明確な型定義
interface TextInputProps {
  type?: 'text' | 'number' | 'email' | 'password'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
  required?: boolean
  disabled?: boolean
}

// ✅ Better: より詳細な型定義
interface TextInputProps {
  // 基本プロパティ
  type?: InputType
  placeholder?: string
  value: string
  onChange: (value: string) => void

  // スタイリング
  className?: string
  variant?: 'default' | 'error' | 'success'
  size?: 'small' | 'medium' | 'large'

  // 状態
  required?: boolean
  disabled?: boolean
  loading?: boolean

  // アクセシビリティ
  'aria-label'?: string
  'aria-describedby'?: string
}
```

## 📁 ディレクトリ構成戦略

### フィーチャーベース設計

機能ごとにディレクトリを分割し、関連するファイルを集約します。

```
src/
├── components/
│   └── common/              # 汎用コンポーネント
│       ├── TextInput.tsx        # MUIベース汎用入力
│       └── __tests__/           # 単体テスト
│           └── TextInput.test.tsx
├── features/
│   ├── expenses/            # 支出管理機能
│   │   ├── components/
│   │   │   ├── ExpenseForm.tsx      # フォームコンポーネント
│   │   │   ├── ExpenseInput.tsx     # 入力コンポーネント
│   │   │   └── __tests__/           # テストディレクトリ
│   │   │       ├── ExpenseForm.test.tsx
│   │   │       ├── ExpenseInput.test.tsx
│   │   │       └── integration/     # 統合テスト
│   │   │           └── expense-flow.test.tsx
│   │   ├── hooks/               # カスタムフック（将来）
│   │   ├── types.ts             # 型定義（将来）
│   │   └── README.md
│   └── budgets/             # 予算管理機能（将来）
├── shared/                  # 共有リソース（将来）
│   ├── types/
│   ├── utils/
│   └── constants/
└── App.test.tsx             # シンプルコンポーネント（co-located）
```

## 🧩 コンポーネントタイプ

### 1. Presentational Components (表示専用)

UIの見た目のみに責任を持ちます。

```tsx
interface CardProps {
  title: string
  children: React.ReactNode
  className?: string
}

function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  )
}
```

### 2. Container Components (ロジック管理)

状態管理やビジネスロジックを担当します。

```tsx
function ExpenseFormContainer() {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (amount: number) => {
    setIsLoading(true)
    try {
      await submitExpense(amount)
      setAmount('')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ExpenseForm
      amount={amount}
      onAmountChange={setAmount}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}
```

### 3. Higher-Order Components (HOC)

共通機能を提供する高次コンポーネントです。

```tsx
function withLoading<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function LoadingComponent(props: T & { isLoading?: boolean }) {
    if (props.isLoading) {
      return <LoadingSpinner />
    }
    return <WrappedComponent {...props} />
  }
}

// 使用例
const ExpenseFormWithLoading = withLoading(ExpenseForm)
```

## 🎣 カスタムフック設計

### 1. ロジックの分離

コンポーネントからビジネスロジックを分離します。

```tsx
// カスタムフック
function useExpenseForm() {
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateAmount = (value: string): boolean => {
    const numValue = parseFloat(value)
    if (isNaN(numValue) || numValue <= 0) {
      setErrors(['金額は正の数値を入力してください'])
      return false
    }
    setErrors([])
    return true
  }

  const submitExpense = async () => {
    if (!validateAmount(amount)) return

    setIsSubmitting(true)
    try {
      await api.createExpense({ amount: parseFloat(amount) })
      setAmount('')
    } catch (error) {
      setErrors(['送信に失敗しました'])
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    amount,
    setAmount,
    errors,
    isSubmitting,
    submitExpense,
  }
}

// コンポーネントでの使用
function ExpenseForm() {
  const { amount, setAmount, errors, isSubmitting, submitExpense } =
    useExpenseForm()

  return (
    <form onSubmit={submitExpense}>
      <ExpenseInput value={amount} onChange={setAmount} />
      {errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
      <SubmitButton disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '支出を登録'}
      </SubmitButton>
    </form>
  )
}
```

## 🎨 スタイリング戦略

### MUI (Material-UI) 活用

Material Designガイドラインに基づいた一貫したデザインシステムを構築します。

```tsx
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'

// テーマカスタマイズ例
interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'danger'
  children: React.ReactNode
}

function Button({ variant = 'primary', children, sx, ...props }: ButtonProps) {
  const getVariantProps = () => {
    switch (variant) {
      case 'primary':
        return { variant: 'contained' as const, color: 'primary' as const }
      case 'secondary':
        return { variant: 'outlined' as const, color: 'primary' as const }
      case 'danger':
        return { variant: 'contained' as const, color: 'error' as const }
      default:
        return { variant: 'contained' as const, color: 'primary' as const }
    }
  }

  return (
    <MuiButton
      {...getVariantProps()}
      sx={{ fontWeight: 'bold', ...sx }}
      {...props}
    >
      {children}
    </MuiButton>
  )
}
```

## 🔧 パフォーマンス最適化

### 1. React.memo による最適化

```tsx
import { Box, Typography, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

const ExpenseItem = memo(function ExpenseItem({
  expense,
  onEdit,
  onDelete,
}: ExpenseItemProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
      <Typography variant="body1">{expense.amount}</Typography>
      <IconButton onClick={() => onEdit(expense.id)} size="small">
        <Edit />
      </IconButton>
      <IconButton
        onClick={() => onDelete(expense.id)}
        size="small"
        color="error"
      >
        <Delete />
      </IconButton>
    </Box>
  )
})
```

### 2. useMemo と useCallback

```tsx
import { List } from '@mui/material'

function ExpenseList({ expenses, filter }: ExpenseListProps) {
  // 高コストな計算のメモ化
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => expense.category.includes(filter))
  }, [expenses, filter])

  // コールバック関数のメモ化
  const handleExpenseEdit = useCallback((id: string) => {
    // 編集処理
  }, [])

  return (
    <List>
      {filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={handleExpenseEdit}
        />
      ))}
    </List>
  )
}
```

## 📝 テスト可能な設計

### テスト配置戦略

現在のプロジェクトではハイブリッドテスト戦略を採用：

- ****tests**/**: 複雑なコンポーネントの包括テスト
- **integration/**: フィーチャーフロー統合テスト
- **co-located**: シンプルコンポーネント基本テスト
- **MUI対応**: 数値型フィールド、非同期状態管理

### 1. Pure Components

副作用のないコンポーネントは簡単にテストできます。

```tsx
// テストしやすい純粋なコンポーネント
function PriceDisplay({ amount, currency = 'JPY' }: PriceDisplayProps) {
  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
  })

  return <span>{formatter.format(amount)}</span>
}

// テスト例
test('金額を正しい形式で表示する', () => {
  render(<PriceDisplay amount={1000} />)
  expect(screen.getByText('¥1,000')).toBeInTheDocument()
})
```

### 2. Dependency Injection

依存関係を外部から注入することでテストを容易にします。

```tsx
interface ApiService {
  submitExpense(expense: ExpenseData): Promise<void>;
}

interface ExpenseFormProps {
  apiService?: ApiService;
  onSuccess?: () => void;
}

function ExpenseForm({
  apiService = defaultApiService,
  onSuccess
}: ExpenseFormProps) {
  const handleSubmit = async (expense: ExpenseData) => {
    await apiService.submitExpense(expense);
    onSuccess?.();
  };

  return (/* JSX */);
}

// テスト時にモックサービスを注入
const mockApiService = {
  submitExpense: jest.fn().mockResolvedValue(undefined),
};

test('支出が正しく送信される', async () => {
  render(<ExpenseForm apiService={mockApiService} />);
  // テストコード...
});
```

## 🚀 将来拡張への準備

### 1. 拡張可能な設計

```tsx
// 基本インターフェース
interface BaseInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

// 拡張インターフェース
interface NumberInputProps extends BaseInputProps {
  min?: number
  max?: number
  step?: number
}

interface DateInputProps extends BaseInputProps {
  min?: string
  max?: string
}
```

### 2. Plugin システム

```tsx
// プラグイン可能な設計
interface FormPlugin {
  name: string
  validate?: (value: any) => boolean
  format?: (value: any) => string
  transform?: (value: any) => any
}

function useFormWithPlugins(plugins: FormPlugin[] = []) {
  // プラグインを活用したフォーム処理
}
```

このガイドに従って、保守しやすく拡張可能なコンポーネントを設計しましょう。
