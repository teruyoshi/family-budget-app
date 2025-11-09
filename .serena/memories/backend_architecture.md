# バックエンドアーキテクチャ詳細

## 技術スタック
- **言語**: Go 1.21
- **Webフレームワーク**: Gin
- **ORM**: GORM
- **データベース**: MySQL 8.0
- **CORS**: 設定済み（フロントエンド連携対応）

## ディレクトリ構造
```
backend/
├── cmd/server/           # メインサーバーエントリポイント
│   └── main.go          # アプリケーション起動
├── internal/            # 内部パッケージ
│   ├── database/        # データベース接続・設定
│   ├── models/          # データモデル定義
│   ├── middleware/      # ミドルウェア（CORS等）
│   └── handlers/        # APIハンドラー
├── go.mod              # Go モジュール定義
└── go.sum              # 依存関係チェックサム
```

## データモデル

### User（ユーザー）
```go
type User struct {
    ID        uint
    Name      string         // 100文字制限
    Email     string         // 100文字制限、ユニークインデックス
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt gorm.DeletedAt // ソフトデリート対応
    
    // リレーション
    Transactions []Transaction
    Budgets      []Budget
}
```

### Category（カテゴリ）
```go
type Category struct {
    ID          uint
    Name        string         // 50文字制限
    Type        string         // 'income' または 'expense'
    Color       string         // カラーコード（デフォルト: #6B7280）
    Description string         // 200文字制限
    CreatedAt   time.Time
    UpdatedAt   time.Time
    DeletedAt   gorm.DeletedAt
    
    // リレーション
    Transactions []Transaction
    Budgets      []Budget
}
```

### Transaction（取引）
```go
type Transaction struct {
    ID          uint
    UserID      uint           // 外部キー
    CategoryID  uint           // 外部キー
    Amount      int64          // 金額（円単位で保存）
    Description string         // 説明（200文字制限）
    Date        time.Time      // 取引日
    CreatedAt   time.Time
    UpdatedAt   time.Time
    DeletedAt   gorm.DeletedAt
    
    // リレーション
    User     User
    Category Category
}
```

### Budget（予算）
```go
type Budget struct {
    ID         uint
    UserID     uint           // 外部キー
    CategoryID uint           // 外部キー
    Amount     int64          // 予算金額（円単位）
    Month      time.Time      // 対象月
    CreatedAt  time.Time
    UpdatedAt  time.Time
    DeletedAt  gorm.DeletedAt
    
    // リレーション
    User     User
    Category Category
}
```

## API エンドポイント

### 実装済み
- **GET /api/health** - ヘルスチェック
- **GET /api/categories** - カテゴリ一覧取得
- **POST /api/categories** - カテゴリ作成
- **GET /api/categories/:id** - 特定カテゴリ取得
- **PUT /api/categories/:id** - カテゴリ更新
- **DELETE /api/categories/:id** - カテゴリ削除

### 未実装（今後の拡張）
- Transaction API（取引管理）
- Budget API（予算管理）
- User API（ユーザー管理）

## データベース機能
- **自動マイグレーション**: アプリケーション起動時実行
- **シードデータ**: 初期データ自動投入
- **ソフトデリート**: 論理削除対応
- **外部キー制約**: リレーション整合性保証

## セキュリティ・バリデーション
- **入力バリデーション**: JSON入力の妥当性チェック
- **型バリデーション**: カテゴリタイプの制約（income/expense）
- **CORS設定**: フロントエンドからのアクセス許可
- **エラーハンドリング**: 適切なHTTPステータスコード返却