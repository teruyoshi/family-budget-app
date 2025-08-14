# フロントエンド用 Dockerfile (開発環境)
FROM node:22-alpine

# セキュリティ: 非rootユーザーを使用
USER node

# 作業ディレクトリを設定（nodeユーザーのホーム配下）
WORKDIR /home/node/app

# パッケージファイルをコピー（所有者をnodeに設定）
COPY --chown=node:node package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー（所有者をnodeに設定）
COPY --chown=node:node . .

# ポートを公開
EXPOSE 5173
EXPOSE 3001
EXPOSE 6006

# 開発サーバーを起動 (Viteの設定でポート5173、ホスト0.0.0.0に変更)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]