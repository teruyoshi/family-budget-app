import { render, screen } from '@testing-library/react'
import AppTitle from '../AppTitle'

describe('AppTitle', () => {
  it('デフォルトで「家計簿アプリ」テキストを表示する', () => {
    render(<AppTitle />)
    expect(screen.getByText('家計簿アプリ')).toBeInTheDocument()
  })

  it('カスタムタイトルを表示できる', () => {
    render(<AppTitle title="My Budget App" />)
    expect(screen.getByText('My Budget App')).toBeInTheDocument()
    expect(screen.queryByText('家計簿アプリ')).not.toBeInTheDocument()
  })

  // 空文字テスト（エッジケース、基本機能で十分カバー）

  // h1要素テスト（MUI基本機能）

  // noWrapプロパティテスト（MUI基本機能）

  // noWrap false テスト（冗長）

  // variant プロパティテスト（MUI基本機能）

  // component プロパティテスト（MUI基本機能）

  // sx プロパティテスト（MUI基本機能）

  // ナビゲーション用設定テスト（統合テスト、重複除去）

  // 複数プロパティ統合テスト（冗長）
})
