# フロントエンド用 Dockerfile (開発環境)
FROM node:22-alpine

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# ポートを公開
EXPOSE 5173

# 開発サーバーを起動 (Viteの設定でポート5173、ホスト0.0.0.0に変更)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]