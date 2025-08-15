/**
 * ページ読み込み中表示コンポーネント
 *
 * React.lazy による遅延ロード時のSuspense fallbackとして使用されます。
 */
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    fontSize: '1.2rem',
    color: '#666'
  }}>
    読み込み中...
  </div>
)

export default PageLoader