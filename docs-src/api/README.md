# API Documentation

API仕様・生成クライアント管理

## 📋 構成

### OpenAPI仕様
- `openapi.yaml` - API仕様定義
- `client/` - 生成クライアントコード
- `docs/` - API参考ドキュメント

### 生成ツール
- `generate-client.sh` - クライアント生成スクリプト
- `validate-spec.sh` - 仕様検証スクリプト

## 🔧 使用方法

### API仕様の更新
```bash
# 仕様ファイル編集
vi docs-src/api/openapi.yaml

# 検証実行
./docs-src/api/validate-spec.sh

# クライアント再生成
./docs-src/api/generate-client.sh
```

### 開発時の参照先
- **API仕様**: `docs-src/api/openapi.yaml`
- **型定義**: `frontend/src/types/api.ts`
- **クライアント**: 生成後の`api/client/`配下

## 🎯 方針

- **OpenAPI First**: 仕様駆動開発
- **自動生成**: 手動コード最小化
- **型安全**: TypeScript完全対応
- **ドキュメント同期**: 仕様とドキュメントの自動同期