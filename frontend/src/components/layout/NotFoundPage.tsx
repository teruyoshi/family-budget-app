/**
 * 404エラーページコンポーネント
 *
 * 存在しないルートにアクセスした際に表示されるフォールバックページです。
 * シンプルで分かりやすいデザインで、ユーザーをダッシュボードに誘導します。
 *
 * @remarks
 * **主な機能:**
 * - 404エラーメッセージの表示
 * - ダッシュボードへの戻りリンク
 * - シンプルで直感的なUI
 * - センター配置レイアウト
 * - アクセシビリティ対応
 *
 * **使用場面:**
 * - React Routerの404フォールバック
 * - 存在しないページへのアクセス
 * - ブロークンリンクの処理
 * - エラーページテンプレート
 *
 * **デザイン特徴:**
 * - センター配置のシンプルなレイアウト
 * - 統一されたカラースキーム
 * - 適切なスペーシング
 * - レスポンシブ対応
 *
 * @example
 * ```tsx
 * // 基本的な使用例
 * <NotFoundPage />
 * ```
 *
 * @example
 * ```tsx
 * // React Routerでのフォールバック使用例
 * <Routes>
 *   <Route path="/" element={<Home />} />
 *   <Route path="/dashboard" element={<Dashboard />} />
 *   <Route path="*" element={<NotFoundPage />} />
 * </Routes>
 * ```
 *
 * @example
 * ```tsx
 * // カスタムコンテナ内での使用例
 * <Container>
 *   <NotFoundPage />
 * </Container>
 * ```
 */
const NotFoundPage = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <h1>404 - ページが見つかりません</h1>
    <p>お探しのページは存在しません。</p>
    <a href="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
      ダッシュボードに戻る
    </a>
  </div>
)

export default NotFoundPage