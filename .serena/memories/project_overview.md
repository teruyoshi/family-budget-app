# Family Budget App - プロジェクト概要

## プロジェクトの目的
家族向け家計管理のための現代的フルスタックWebアプリケーション

### 対象ユーザー・利用シナリオ
- **家族利用**: 夫婦・親子での共同家計管理
- **個人利用**: 一人暮らしの支出管理・節約意識向上
- **計画的消費**: 家計状況を踏まえたリスク回避型予算決定

## 技術スタック
- **フロントエンド**: React 19 + TypeScript + Vite + MUI v6 + React Router v7
- **バックエンド**: Go 1.21 + Gin + GORM + MySQL 8.0
- **インフラ**: Docker Compose + GitHub Actions + Firebase Hosting
- **品質保証**: Jest + ESLint + Prettier + 5段階品質チェック

## プロジェクト構造
```
family-budget-app/
├── frontend/                   # React フロントエンド
│   ├── src/
│   │   ├── components/        # コンポーネント (ui, forms, navigation, layout)
│   │   ├── features/          # 機能別 (balance, expenses, income, history)
│   │   ├── pages/            # ページコンポーネント
│   │   ├── hooks/            # カスタムフック
│   │   └── App.tsx           # メインアプリ
├── backend/                   # Go バックエンド
│   ├── cmd/server/           # メインサーバー
│   └── internal/             # APIハンドラー・モデル
├── compose.yml               # Docker環境設定
├── Makefile                  # 開発コマンド
└── CLAUDE.md                 # Claude専用指示
```

## アクセスURL
- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:8080
- **API健康状態**: http://localhost:8080/api/health
- **Storybook**: http://localhost:6006

## 開発状況
**Phase 2: Directory Structure Migration (85%完了)**
- 28コンポーネントの機能別分離完了
- テスト最適化完了（Issue #67, #71, #73）
- パフォーマンスチューニング完了（バンドル43%削減）
- 429テスト、34%実行時間短縮達成