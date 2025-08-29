# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) 専用の開発ガイダンスです。

**最終更新**: 2025年8月24日（Phase 2: Directory Structure Migration 完了間近 - 85%完了）

## 📋 プロジェクト概要

家計簿管理フルスタックWebアプリケーション
- **フロントエンド**: React 19 + TypeScript + Vite + MUI v6 + React Router v7
- **バックエンド**: Go 1.21 + Gin + GORM + MySQL 8.0
- **インフラ**: Docker Compose

## 🎯 Claude作業指示

### 基本方針
- **作業ディレクトリ**: `~/workspace/family-budget-app`
- **コンテナベース**: Makefile使用でDockerコンテナ内実行
- **🎯 必須作業フロー**: **1タスク集中→完了→停止→指示待ち**
  - TodoWrite使用でタスク管理
  - **複数タスクの並行作業は絶対禁止**
  - 1つのタスクが完了するまで他に手を出さない
  - 完了後は必ず停止してユーザーの指示を待つ

### 必須コマンド（Makefile使用）

#### 開発・テスト
```bash
make test-frontend        # フロントエンドテスト（全テスト実行）
make test-file FILE=テストファイル名  # 特定のテストファイルのみ実行
make test-backend         # バックエンドテスト  
make lint-frontend        # ESLintチェック
make lint-fix-frontend    # ESLint自動修正
make format-frontend      # Prettierフォーマット
make npm-install          # 依存関係インストール
make test-coverage-open   # テストカバレッジをブラウザで表示
make quality-check-frontend # 統合品質チェック（Prettier+ESLint+TypeScript+Jest+Build）
make quality-check-file FILE=ファイル名  # 個別ファイル品質チェック
```

####### 効率的な単体テスト実行
```bash
# 特定のテストファイルのみ実行（開発時推奨）
make test-file FILE=usePageTransition.test.tsx
make test-file FILE=AmountInput.test.tsx
make test-file FILE=useMoney.test.ts
make test-file FILE=AppDrawer.test.tsx          # navigation
make test-file FILE=ControlledAmountInput.test.tsx # forms

# 複数のテストファイルを部分マッチで実行
make test-file FILE="Money"       # useMoney.test.ts, money.test.ts等
make test-file FILE="Navigation"  # navigation関連テスト
make test-file FILE="Controlled"  # フォーム関連テスト
```

#### ドキュメント・Storybook
```bash
make storybook-frontend           # Storybookサーバー起動（ポート6006）
make storybook-stop-frontend      # Storybookサーバー停止
```

#### コンテナ操作
```bash
make up                   # 全サービス起動
make dev                  # 開発環境（ログ表示）
make down                 # 全サービス停止
make frontend-shell       # フロントエンドコンテナ接続
make backend-shell        # バックエンドコンテナ接続
```

### 作業完了基準
- **テスト通過**: コミット前に `make test-frontend` で全テスト通過確認
- **単体テスト**: 開発中は `make test-file FILE=テストファイル名` で効率的テスト実行
- **品質チェック**: `make lint-frontend` でコード品質確認
- **AI自動ドキュメンテーション**: コンポーネント作成・修正時に TSDoc・用語集を自動更新
- **Claude署名**: GitHubコメント・コミットメッセージに `🤖 Generated with [Claude Code](https://claude.ai/code)` 署名


### 開発環境URL
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080  
- **phpMyAdmin**: http://localhost:8081 (root/root)
- **Storybook（統合ドキュメント）**: http://localhost:6006

## 📁 現在のアーキテクチャ

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/                  # 基本UIコンポーネント（10コンポーネント）
│   │   │   ├── AmountInput.tsx  # 金額入力（¥記号付きカンマ区切り、スタイル分離）
│   │   │   ├── AmountText.tsx   # 金額表示（フォーマット対応）
│   │   │   ├── AppTitle.tsx     # アプリタイトル
│   │   │   ├── Button.tsx       # MUI Button統合
│   │   │   ├── DatePicker.tsx   # 日付選択（MUI X）
│   │   │   ├── PageLoader.tsx   # ローディング表示
│   │   │   ├── TextInput.tsx    # テキスト入力
│   │   │   ├── TextLabel.tsx    # ラベル表示
│   │   │   ├── hooks/useAmountInput.ts # AmountInput専用フック
│   │   │   └── index.ts         # バレルエクスポート
│   │   ├── forms/               # フォーム関連コンポーネント（6コンポーネント）
│   │   │   ├── ControlledAmountInput.tsx    # react-hook-form連携金額入力
│   │   │   ├── ControlledCustomDateSwitch.tsx # 日付切替スイッチ（ジェネリック型）
│   │   │   ├── ControlledDatePicker.tsx     # 日付選択（react-hook-form連携）
│   │   │   ├── FormErrorMessage.tsx         # エラーメッセージ表示
│   │   │   ├── TransactionForm.tsx          # 取引フォーム（支出・収入）
│   │   │   └── index.ts         # バレルエクスポート
│   │   ├── provider/            # プロバイダーコンポーネント（2ファイル）
│   │   │   ├── DateLocalizationProvider.tsx
│   │   │   └── index.ts         # バレルエクスポート
│   │   ├── layout/              # レイアウトコンポーネント（新規作成）
│   │   │   ├── AppLayout.tsx    # メインレイアウト
│   │   │   └── index.ts         # バレルエクスポート
│   │   ├── navigation/          # ナビゲーションコンポーネント（10コンポーネント）
│   │   │   ├── AppBreadcrumbs.tsx   # パンくずナビ
│   │   │   ├── AppDrawer.tsx        # ドロワー本体
│   │   │   ├── AppDrawer.styles.ts  # ドロワースタイル分離
│   │   │   ├── AppDrawerContent.tsx # ドロワー内容
│   │   │   ├── AppDrawerHeader.tsx  # ドロワーヘッダー
│   │   │   ├── AppNavigation.tsx    # ナビゲーション統合
│   │   │   ├── AppTopBar.tsx        # トップバー
│   │   │   ├── NavigationMenu.tsx   # メニュー本体
│   │   │   ├── NavigationMenuItem.tsx # メニュー項目
│   │   │   └── index.ts         # バレルエクスポート
│   │   └── *_old/               # 旧ディレクトリ（削除予定）
│   ├── pages/                   # ページコンポーネント（React Router）
│   │   ├── DashboardPage.tsx    # ダッシュボード（ホーム）
│   │   ├── ExpensePage.tsx      # 支出管理ページ
│   │   ├── IncomePage.tsx       # 収入管理ページ
│   │   ├── HistoryPage.tsx      # 履歴表示ページ
│   │   ├── SettingsPage.tsx     # 設定ページ
│   │   ├── __tests__/           # ページテスト
│   │   └── index.ts             # バレルエクスポート
│   ├── routes/                  # ルーティング設定
│   │   └── routes.tsx           # useRoutes + コード分割対応
│   ├── features/
│   │   ├── balance/             # 残高表示機能
│   │   ├── expenses/            # 支出管理機能
│   │   ├── income/              # 収入管理機能
│   │   └── history/             # 履歴表示機能
│   ├── hooks/
│   │   ├── useBudgetManager.ts  # 統合家計簿管理フック
│   │   ├── useMoney.ts          # 金額状態管理
│   │   ├── useMoneyFormat.ts    # 金額フォーマット専用
│   │   └── __tests__/           # フックテスト
│   ├── lib/
│   │   ├── format/              # フォーマットライブラリ
│   │   │   ├── money.ts         # 金額フォーマット専用
│   │   │   └── __tests__/       # フォーマットテスト
│   │   ├── validation/          # バリデーション
│   │   │   └── schemas.ts       # Zodスキーマ定義
│   │   └── index.ts             # ライブラリ統合エクスポート
│   ├── types/                   # TypeScript型定義
│   │   ├── api.ts               # API関連型
│   │   ├── business.ts          # ビジネスロジック型
│   │   ├── common.ts            # 共通型
│   │   ├── components.ts        # コンポーネント型
│   │   ├── forms.ts             # フォーム型
│   │   ├── routing.ts           # ルーティング型
│   │   └── index.ts             # 型定義統合エクスポート
│   └── App.tsx                  # メインアプリ（useRoutes+BrowserRouter）
├── .storybook/                  # Storybook設定
├── docs/                       # TypeDoc生成ドキュメント
├── coverage/                   # テストカバレッジレポート
└── typedoc.json                # TypeDoc設定

```

## 🔧 現在の設定情報
- **プロジェクト名**: FamilyBudgetApp (v0.4.1)
- **テスト状況**: 240テスト、25テストスイート全通過（継続的に保持）
- **コンポーネント総数**: 28コンポーネント（ui: 10, forms: 6, navigation: 10, layout: 2）
- **TypeScriptファイル**: 141ファイル（components, pages, hooks, lib, types配下）
- **主要機能**: React Router SPA、ページベース構造、コード分割、404対応
- **ルーティング**: useRoutes、React.lazy、Suspense完全対応
- **アーキテクチャ**: pages/routes/layout/navigation 完全分離、型安全なルート管理
- **品質対策**: 5段階品質チェック（Prettier+ESLint+TypeScript+Jest+Build）
- **Storybook最適化**: preview.ts最適化によりビルド時間短縮、統合ドキュメント完備

## 🤖 ドキュメンテーション方針

- **簡潔性重視**: 必要最小限の情報のみ記載
- **TSDoc**: @example中心の実用的なドキュメント
- **管理負荷軽減**: 複雑なドキュメントは作成しない

## 🎨 コード規約
- **TypeScript**: strict mode、簡潔なTSDoc
- **React 19**: ref as prop パターン、forwardRef不使用
- **MUI**: sx props、slotProps活用、コンポーネント優先
- **パス**: `@/`エイリアス使用
- **エクスポート**: バレルエクスポート（index.ts）
- **テスト**: 単体テスト重視、Storybook連携

## 🔗 関連リソース
- **用語集**: [docs-src/glossary.md](frontend/docs-src/glossary.md) - v1.2.0（自動更新運用中）
- **ADR**: [docs-src/adr/](frontend/docs-src/adr/) - 技術判断記録（自動生成対応）
- **品質ガイド**: [docs-src/quality/](frontend/docs-src/quality/) - アクセシビリティ・パフォーマンス
- **PRテンプレート**: [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md) - 品質チェックリスト

## 📈 完了済み機能（v0.4.1 Phase 2対応）

### 🔧 コア機能
- ✅ **React Router**: useRoutes + コード分割 + 404対応
- ✅ **ページ構成**: 5ページ + レイアウト + テスト完備
- ✅ **型安全**: AppRoute型 + 7つの型定義による厳密管理

### 🎨 UIコンポーネント（28コンポーネント）
- ✅ **UI基本**: AmountInput, AmountText, AppTitle, Button, DatePicker, PageLoader, TextInput, TextLabel（10コンポーネント）
- ✅ **フォーム**: ControlledAmountInput, ControlledCustomDateSwitch, ControlledDatePicker, FormErrorMessage, TransactionForm（6コンポーネント）
- ✅ **ナビゲーション**: AppBreadcrumbs, AppDrawer, AppNavigation, AppTopBar, NavigationMenu等（10コンポーネント）
- ✅ **レイアウト**: AppLayout + 統合エクスポート（2ファイル）
- ✅ **プロバイダー**: DateLocalizationProvider分離（2ファイル）

### 🛠 開発・品質保証
- ✅ **開発環境**: テスト・品質チェック・CI/CD・Firebase Hosting完備
- ✅ **品質チェック**: 5段階統合チェック（Prettier+ESLint+TypeScript+Jest+Build）
- ✅ **テスト継続**: 240テスト、25テストスイート全通過維持
- ✅ **ドキュメント**: Storybook統合ドキュメント + TypeDoc自動生成
- ✅ **React 19対応**: ref as prop パターン適用
- ✅ **Storybook最適化**: preview.ts最適化によりビルド性能向上

## 🚀 Phase 2: Directory Structure Migration（完了間近 - 85%完了）

### ✅ 完了済み（85%）
- ✅ **types/**: 共通型定義の移行完了（7型定義ファイル）
- ✅ **components/ui/**: 基本UIコンポーネント移行完了（10コンポーネント + 専用フック）
- ✅ **components/forms/**: フォーム関連コンポーネント移行完了（6コンポーネント + ジェネリック型対応）
- ✅ **components/provider/**: プロバイダー分離完了（2ファイル）
- ✅ **components/layout/**: レイアウトコンポーネント移行完了（2ファイル）
- ✅ **components/navigation/**: ナビゲーションコンポーネント移行完了（10コンポーネント）
- ✅ **lib/**: ライブラリ統合（format + validation + 統合エクスポート）
- ✅ **品質保証**: 5段階チェック（Prettier+ESLint+TypeScript+Jest+Build）導入
- ✅ **テスト・ドキュメント**: 240テスト + 包括的Storybookドキュメント完備
- ✅ **Storybook最適化**: preview.ts最適化、ビルド性能向上
- ✅ **インポートパス修正**: 全ファイルの@/components/* パス修正完了
- ✅ **クリーンアップ**: 23ファイル削除、重複排除完了

### 🔄 残り作業（15%）
- 🔄 **旧ディレクトリ削除**: common_old, layout_old, navigation_old 最終削除
- 🔄 **features/配下**: components_old ディレクトリの統合と削除
- 🔄 **最終検証**: 全テスト通過とビルド確認

### 📊 Phase 2 成果
- **コンポーネント分離**: 28コンポーネントを機能別に完全分離
- **型安全性向上**: 7つの型定義ファイルによる厳密な型管理
- **保守性向上**: バレルエクスポートによる統一されたインポート
- **テスト継続**: 移行中も240テスト全通過を維持
- **ドキュメント最新化**: Storybookドキュメント + 包括的型ドキュメント