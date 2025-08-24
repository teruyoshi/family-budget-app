# Mermaid図解ガイド

**目的**: 視覚的理解促進・設計コミュニケーション向上

**適用範囲**:
- 対象: アーキテクチャ・フロー・データモデル・状態図
- 影響: 設計理解・レビュー効率・ドキュメント保守性

**更新方針**:
- 変更があったらアーキテクト・設計者が更新
- **1ファイル1図の原則**: 差分レビュー容易性重視
- **Markdown直書き**: `.mmd`ファイル不使用、保守最小化

## 🎯 図解標準化方針

### 優先順位
1. **Mermaid（標準）**: フローチャート・シーケンス・ER・状態図
2. **PlantUML（補助）**: 厳密UML表現が必要時のみ
3. **Graphviz（最小）**: 単純グラフ構造のみ

### VSCode環境セットアップ
```bash
# 推奨拡張機能
- Markdown Preview Mermaid Support
- Markdown All in One
- (必要時) PlantUML
- (必要時) Graphviz (dot) language support
```

## 📊 図解種別・用途

### 1. システムアーキテクチャ図
```mermaid
%%{init: {'theme':'neutral','themeVariables':{'primaryColor':'#1976d2'}}}%%
flowchart TB
    subgraph "Frontend"
        React[React 19 SPA<br/>28 Components]
        Router[React Router v7<br/>5 Pages]
    end
    
    subgraph "Backend"  
        API[Go Gin API<br/>REST Endpoints]
        Models[GORM Models<br/>Database Layer]
    end
    
    subgraph "Infrastructure"
        DB[(MySQL 8.0<br/>Persistent Storage)]
        CDN[(Firebase Hosting<br/>Static Assets)]
    end
    
    React -->|HTTP Requests| API
    API -->|SQL Queries| DB
    React -->|Static Files| CDN
    Router -.->|Page Navigation| React
    API -.->|ORM| Models
    Models -.->|Schema| DB
```

### 2. データフロー・API呼び出し
```mermaid
%%{init: {'theme':'neutral','themeVariables':{'primaryColor':'#1976d2'}}}%%
sequenceDiagram
    participant U as User
    participant P as Page Component  
    participant H as Custom Hook
    participant C as API Client
    participant A as Go API
    participant D as MySQL
    
    U->>P: ユーザーインタラクション
    P->>H: 状態更新要求
    H->>C: API呼び出し
    C->>A: HTTP Request (JSON)
    A->>D: SQL Query
    D-->>A: Query Result
    A-->>C: HTTP Response (JSON)
    C-->>H: TypeScript Types
    H-->>P: React State Update
    P-->>U: UI Re-render
    
    Note over C,A: 生成クライアント使用
    Note over A,D: GORM経由のみ
```

### 3. データモデル・ER図
```mermaid
%%{init: {'theme':'neutral','themeVariables':{'primaryColor':'#1976d2'}}}%%
erDiagram
    USERS ||--o{ TRANSACTIONS : creates
    CATEGORIES ||--o{ TRANSACTIONS : classifies
    
    USERS {
        bigint id PK "プライマリキー"
        varchar name "ユーザー名"
        varchar email "メールアドレス"
        timestamp created_at "作成日時"
    }
    
    CATEGORIES {
        int id PK "プライマリキー"
        varchar name "カテゴリ名"
        enum type "income/expense"
        varchar color "表示色"
    }
    
    TRANSACTIONS {
        bigint id PK "プライマリキー"  
        bigint user_id FK "ユーザーID"
        int category_id FK "カテゴリID"
        decimal amount "金額"
        date occurred_on "発生日"
        text description "説明"
        timestamp created_at "登録日時"
    }
```

### 4. コンポーネント状態図
```mermaid
%%{init: {'theme':'neutral','themeVariables':{'primaryColor':'#1976d2'}}}%%
stateDiagram-v2
    [*] --> Idle
    
    Idle --> Editing : ユーザー入力開始
    Editing --> Validating : リアルタイムバリデーション
    
    Validating --> Valid : Zodスキーマ通過
    Validating --> Invalid : バリデーションエラー
    
    Valid --> Submitting : フォーム送信
    Invalid --> Editing : エラー修正
    
    Submitting --> Success : API成功レスポンス
    Submitting --> Error : API エラー
    
    Success --> Idle : 初期状態に戻る
    Error --> Editing : エラー表示・再編集
    
    Note right of Validating : react-hook-form<br/>+ Zod validation
    Note right of Submitting : 生成クライアント<br/>経由API呼び出し
```

## 🎨 図解スタイルガイド

### 統一テーマ設定
```mermaid
%%{init: {'theme':'neutral','themeVariables':{'primaryColor':'#1976d2','primaryTextColor':'#fff','primaryBorderColor':'#1565c0','lineColor':'#757575','sectionBkgColor':'#f5f5f5','altSectionBkgColor':'#ffffff','gridColor':'#e0e0e0','textColor':'#212121','fontSize':'14px'}}}%%
```

### 色彩ガイドライン
- **Primary**: `#1976d2` (メイン要素)
- **Secondary**: `#dc004e` (重要な注意点)
- **Success**: `#4caf50` (正常フロー)
- **Error**: `#f44336` (エラー・警告)
- **Neutral**: `#757575` (補助要素)

### アクセシビリティ対応
```mermaid
flowchart LR
    A[コンポーネントA] -->|"成功フロー<br/>🟢"| B[コンポーネントB]
    A -->|"エラーフロー<br/>🔴"| C[エラー処理]
    
    classDef success fill:#e8f5e8,stroke:#4caf50
    classDef error fill:#ffebee,stroke:#f44336
    
    class B success
    class C error
```

## 🔧 図解作成・保守手順

### 新規図解作成
1. **目的明確化**: 何を伝えたいか・誰が読むか
2. **種類選択**: フロー・シーケンス・ER・状態から選択
3. **Markdown直書き**: ファイル内にMermaidコードブロック記述
4. **VSCode確認**: プレビューで表示確認
5. **レビュー**: 設計観点・理解容易性確認

### 図解更新・保守
```bash
# VSCodeでのプレビュー確認
Ctrl+Shift+V (Windows/Linux)
Cmd+Shift+V (Mac)

# 必要時のSVG出力 (CI/CDで自動化可能)
npx @mermaid-js/mermaid-cli -i diagram.md -o diagram.svg
```

### バージョン管理
- **Git差分**: テキストベースで変更内容明確
- **コミット**: 図解変更理由をコミットメッセージに明記
- **レビュー**: PRで図解変更の意図・正確性確認

## 📋 図解作成チェックリスト

### 品質基準
- [ ] **1図1概念**: 複雑すぎず、焦点が明確
- [ ] **ラベル明示**: 矢印・関係性の意味が明確
- [ ] **色彩配慮**: カラーブラインドネス対応・コントラスト確保
- [ ] **レイアウト**: 読み順・視線の流れが自然

### 技術基準  
- [ ] **Mermaidシンタックス**: 構文エラーなし
- [ ] **VSCodeプレビュー**: 正常表示確認
- [ ] **GitHub表示**: ブラウザでの表示確認
- [ ] **レスポンシブ**: モバイル表示でも読みやすい

## 🚀 高度な図解テクニック

### サブグラフ活用
```mermaid
flowchart TB
    subgraph "Phase 2 Migration"
        direction TB
        A[components/ui/] --> B[components/forms/]
        B --> C[components/navigation/]
        C --> D[components/layout/]
    end
    
    subgraph "Quality Assurance"
        direction LR
        E[240 Tests] --> F[5-Stage Check]
        F --> G[Build Success]
    end
    
    D --> E
```

### ノート・コメント活用
```mermaid
graph LR
    A[API Request] --> B{Authentication}
    B -->|Valid| C[Process Request]
    B -->|Invalid| D[401 Error]
    
    Note right of B : JWT Token<br/>Validation
    Note right of C : Business Logic<br/>Processing
```

## 🔗 参考リソース

### Mermaid公式
- [Mermaid Live Editor](https://mermaid.live/) - ブラウザでリアルタイム編集
- [Mermaid Documentation](https://mermaid.js.org/) - 公式ドキュメント
- [Mermaid Cheat Sheet](https://jojozhuang.github.io/tutorial/mermaid-cheat-sheet/) - 記法一覧

### VSCode拡張
- [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
- [Mermaid Markdown Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting)