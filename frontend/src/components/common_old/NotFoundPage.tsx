/**
 * 404エラーページコンポーネント
 *
 * 存在しないルートにアクセスした際に表示されるフォールバックページです。
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
