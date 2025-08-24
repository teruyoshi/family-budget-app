# 品質規約・方針

プロジェクト品質保証のための規約・ガイドライン

## 📋 品質規約一覧

### TypeScript
- `typescript.md` - TypeScript開発規約・型安全性方針

### テスト・パフォーマンス
- `test-optimization.md` - テスト最適化・パフォーマンス改善
- `performance.md` - アプリケーションパフォーマンス方針

### アクセシビリティ
- `accessibility.md` - アクセシビリティ基準・チェック方法

## 🎯 品質方針

### 基本原則
- **型安全性**: TypeScript strict mode完全対応
- **テスト品質**: 100%テスト通過維持
- **パフォーマンス**: ユーザー体験最優先
- **アクセシビリティ**: WCAG 2.1準拠

### 品質チェック体系
1. **静的解析**: Prettier + ESLint + TypeScript
2. **動的テスト**: Jest + React Testing Library
3. **ビルド検証**: Vite production build
4. **継続的監視**: GitHub Actions + Firebase Hosting

## 📊 品質メトリクス

### 現在の品質状況
- **テスト**: 240テスト、25スイート全通過
- **カバレッジ**: 高カバレッジ維持
- **TypeScript**: strict mode、0エラー
- **バンドルサイズ**: 最適化済み

### 品質維持のためのツール
- **5段階品質チェック**: `make quality-check-frontend`
- **個別ファイルチェック**: `make quality-check-file FILE=ファイル名`
- **継続的監視**: CI/CDパイプライン