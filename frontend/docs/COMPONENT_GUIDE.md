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
  );
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
  );
}

// より良い: さらに柔軟な合成
function ExpenseForm({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
    </form>
  );
}
```

### 3. Props Interface Design
明確で拡張可能なProps設計を心がけます。

```tsx
// ✅ Good: 明確な型定義
interface TextInputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

// ✅ Better: より詳細な型定義
interface TextInputProps {
  // 基本プロパティ
  type?: InputType;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  
  // スタイリング
  className?: string;
  variant?: 'default' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  
  // 状態
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  
  // アクセシビリティ
  'aria-label'?: string;
  'aria-describedby'?: string;
}
```

## 📁 ディレクトリ構成戦略

### フィーチャーベース設計
機能ごとにディレクトリを分割し、関連するファイルを集約します。

```
src/
├── components/
│   └── common/              # 汎用コンポーネント
│       ├── TextInput/
│       │   ├── TextInput.tsx
│       │   ├── TextInput.test.tsx
│       │   └── index.ts     # re-export
│       └── Button/
│           ├── Button.tsx
│           └── Button.test.tsx
├── features/
│   ├── expenses/            # 支出管理機能
│   │   ├── components/
│   │   │   ├── ExpenseForm/
│   │   │   └── ExpenseInput/
│   │   ├── hooks/           # カスタムフック
│   │   ├── types.ts         # 型定義
│   │   └── README.md
│   └── budgets/             # 予算管理機能（将来）
└── shared/                  # 共有リソース
    ├── types/
    ├── utils/
    └── constants/
```

## 🧩 コンポーネントタイプ

### 1. Presentational Components (表示専用)
UIの見た目のみに責任を持ちます。

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
```

### 2. Container Components (ロジック管理)
状態管理やビジネスロジックを担当します。

```tsx
function ExpenseFormContainer() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (amount: number) => {
    setIsLoading(true);
    try {
      await submitExpense(amount);
      setAmount('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExpenseForm
      amount={amount}
      onAmountChange={setAmount}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
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
      return <LoadingSpinner />;
    }
    return <WrappedComponent {...props} />;
  };
}

// 使用例
const ExpenseFormWithLoading = withLoading(ExpenseForm);
```

## 🎣 カスタムフック設計

### 1. ロジックの分離
コンポーネントからビジネスロジックを分離します。

```tsx
// カスタムフック
function useExpenseForm() {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateAmount = (value: string): boolean => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setErrors(['金額は正の数値を入力してください']);
      return false;
    }
    setErrors([]);
    return true;
  };

  const submitExpense = async () => {
    if (!validateAmount(amount)) return;
    
    setIsSubmitting(true);
    try {
      await api.createExpense({ amount: parseFloat(amount) });
      setAmount('');
    } catch (error) {
      setErrors(['送信に失敗しました']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    amount,
    setAmount,
    errors,
    isSubmitting,
    submitExpense,
  };
}

// コンポーネントでの使用
function ExpenseForm() {
  const {
    amount,
    setAmount,
    errors,
    isSubmitting,
    submitExpense,
  } = useExpenseForm();

  return (
    <form onSubmit={submitExpense}>
      <ExpenseInput value={amount} onChange={setAmount} />
      {errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      <SubmitButton disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '支出を登録'}
      </SubmitButton>
    </form>
  );
}
```

## 🎨 スタイリング戦略

### Tailwind CSS活用
一貫したデザインシステムを構築します。

```tsx
// デザイントークンの定義
const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-500 hover:bg-red-700 text-white',
};

const buttonSizes = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-4 py-2',
  large: 'px-6 py-3 text-lg',
};

interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  onClick 
}: ButtonProps) {
  const classes = [
    'font-bold rounded focus:outline-none focus:ring-2',
    buttonVariants[variant],
    buttonSizes[size],
  ].join(' ');

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
```

## 🔧 パフォーマンス最適化

### 1. React.memo による最適化
```tsx
const ExpenseItem = memo(function ExpenseItem({ 
  expense,
  onEdit,
  onDelete 
}: ExpenseItemProps) {
  return (
    <div className="expense-item">
      <span>{expense.amount}</span>
      <button onClick={() => onEdit(expense.id)}>編集</button>
      <button onClick={() => onDelete(expense.id)}>削除</button>
    </div>
  );
});
```

### 2. useMemo と useCallback
```tsx
function ExpenseList({ expenses, filter }: ExpenseListProps) {
  // 高コストな計算のメモ化
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => 
      expense.category.includes(filter)
    );
  }, [expenses, filter]);

  // コールバック関数のメモ化
  const handleExpenseEdit = useCallback((id: string) => {
    // 編集処理
  }, []);

  return (
    <div>
      {filteredExpenses.map(expense => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={handleExpenseEdit}
        />
      ))}
    </div>
  );
}
```

## 📝 テスト可能な設計

### 1. Pure Components
副作用のないコンポーネントは簡単にテストできます。

```tsx
// テストしやすい純粋なコンポーネント
function PriceDisplay({ amount, currency = 'JPY' }: PriceDisplayProps) {
  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency,
  });
  
  return <span>{formatter.format(amount)}</span>;
}

// テスト例
test('金額を正しい形式で表示する', () => {
  render(<PriceDisplay amount={1000} />);
  expect(screen.getByText('¥1,000')).toBeInTheDocument();
});
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
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

// 拡張インターフェース
interface NumberInputProps extends BaseInputProps {
  min?: number;
  max?: number;
  step?: number;
}

interface DateInputProps extends BaseInputProps {
  min?: string;
  max?: string;
}
```

### 2. Plugin システム
```tsx
// プラグイン可能な設計
interface FormPlugin {
  name: string;
  validate?: (value: any) => boolean;
  format?: (value: any) => string;
  transform?: (value: any) => any;
}

function useFormWithPlugins(plugins: FormPlugin[] = []) {
  // プラグインを活用したフォーム処理
}
```

このガイドに従って、保守しやすく拡張可能なコンポーネントを設計しましょう。