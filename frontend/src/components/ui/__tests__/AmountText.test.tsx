import { render, screen } from '@testing-library/react'
import AmountText from '../AmountText'

// useMoneyFormatフックのモック
jest.mock('@/hooks', () => ({
  useMoneyFormat: jest.fn((amount: number) => ({
    forDisplay: `¥${Math.floor(amount).toLocaleString()}`,
    forInput: `¥${Math.floor(amount).toLocaleString()}`,
  })),
}))

describe('AmountText', () => {
  describe('基本的な表示', () => {
    it('正の数値を正しくフォーマットして表示する', () => {
      render(<AmountText amount={15000} />)
      expect(screen.getByText('¥15,000')).toBeInTheDocument()
    })

    it('ゼロを正しく表示する', () => {
      render(<AmountText amount={0} />)
      expect(screen.getByText('¥0')).toBeInTheDocument()
    })

    it('負の数値を正しくフォーマットして表示する', () => {
      render(<AmountText amount={-5000} />)
      expect(screen.getByText('¥-5,000')).toBeInTheDocument()
    })

    it('大きな数値を正しくフォーマットして表示する', () => {
      render(<AmountText amount={1234567} />)
      expect(screen.getByText('¥1,234,567')).toBeInTheDocument()
    })
  })

  // variant機能テスト（MUI基本機能のため削除済み）

  // component機能テスト（MUI基本機能のため削除済み）

  // 表示フォーマットテスト（基本表示テストと重複のため削除済み）

  // sx propsスタイリングテスト（MUI基本機能のため削除済み）

  describe('実用的な使用例', () => {
    it('収入表示スタイルで表示する', () => {
      render(
        <AmountText
          amount={25000}
          variant="h5"
          sx={{ color: 'success.main', fontWeight: 'bold' }}
          data-testid="income-amount"
        />
      )
      const element = screen.getByTestId('income-amount')
      expect(element).toHaveClass('MuiTypography-h5')
      expect(screen.getByText('¥25,000')).toBeInTheDocument()
    })

    it('支出表示スタイルで表示する', () => {
      render(
        <AmountText
          amount={-15000}
          variant="body2"
          sx={{ color: 'error.main' }}
          data-testid="expense-amount"
        />
      )
      const element = screen.getByTestId('expense-amount')
      expect(element).toHaveClass('MuiTypography-body2')
      expect(screen.getByText('¥-15,000')).toBeInTheDocument()
    })

    it('残高表示スタイルで表示する', () => {
      render(
        <AmountText
          amount={100000}
          variant="h4"
          component="div"
          sx={{ textAlign: 'center', color: 'primary.main' }}
          data-testid="balance-amount"
        />
      )
      const element = screen.getByTestId('balance-amount')
      expect(element).toHaveClass('MuiTypography-h4')
      expect(element.tagName).toBe('DIV')
      expect(screen.getByText('¥100,000')).toBeInTheDocument()
    })
  })

  // エッジケーステスト（基本機能で十分カバーのため削除済み）

  // variant×component組み合わせテスト（MUI基本機能のため削除済み）
})
