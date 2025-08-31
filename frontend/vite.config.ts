import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // バンドルサイズ分析レポート生成
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: process.env.NODE_ENV === 'production' ? '/family-budget-app/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      external: (id) => {
        // __stories__ ディレクトリのファイルをビルドから除外
        return id.includes('__stories__')
      },
      output: {
        manualChunks: {
          // Reactとその関連ライブラリを分離
          'react-vendor': ['react', 'react-dom'],
          // MUIコアライブラリを分離
          'mui-core': ['@mui/material'],
          // MUIアイコンを分離
          'mui-icons': ['@mui/icons-material'],
          // MUI日付ピッカーを分離
          'mui-date-pickers': ['@mui/x-date-pickers'],
          // Emotionライブラリを分離
          'emotion-vendor': ['@emotion/react', '@emotion/styled'],
          // フォーム関連ライブラリを分離
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // ルーティング関連を分離
          'router-vendor': ['react-router-dom'],
          // 日付ライブラリを分離
          'date-vendor': ['dayjs'],
        },
      },
    },
  },
})
