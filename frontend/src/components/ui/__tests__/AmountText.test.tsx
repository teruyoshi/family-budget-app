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

  describe('variantプロパティ', () => {
    it('デフォルトでbody1バリアントを使用する', () => {
      render(<AmountText amount={1000} />)
      const element = screen.getByText('¥1,000')
      expect(element).toHaveClass('MuiTypography-body1')
    })

    it('指定されたvariantを適用する', () => {
      render(<AmountText amount={1000} variant="h4" />)
      const element = screen.getByText('¥1,000')
      expect(element).toHaveClass('MuiTypography-h4')
    })

    it('caption variantを適用する', () => {
      render(<AmountText amount={1000} variant="caption" />)
      const element = screen.getByText('¥1,000')
      expect(element).toHaveClass('MuiTypography-caption')
    })
  })

  describe('componentプロパティ', () => {
    it('componentが指定されていない場合はデフォルトの要素を使用する', () => {
      render(<AmountText amount={1000} />)
      // デフォルトのTypographyはp要素
      expect(screen.getByText('¥1,000').tagName).toBe('P')
    })

    it('指定されたcomponentを使用する', () => {
      render(<AmountText amount={1000} component="div" />)
      expect(screen.getByText('¥1,000').tagName).toBe('DIV')
    })

    it('p要素として表示する', () => {
      render(<AmountText amount={1000} component="p" />)
      expect(screen.getByText('¥1,000').tagName).toBe('P')
    })
  })

  describe('表示フォーマット', () => {
    it('表示用フォーマットを使用する', () => {
      render(<AmountText amount={1000} />)
      expect(screen.getByText('¥1,000')).toBeInTheDocument()
    })
  })

  describe('スタイリング', () => {
    it('sx propsを適用する', () => {
      render(
        <AmountText
          amount={1000}
          sx={{ color: 'red', fontSize: '20px' }}
          data-testid="styled-amount"
        />
      )
      const element = screen.getByTestId('styled-amount')
      expect(element).toHaveStyle('color: rgb(255, 0, 0)')
      expect(element).toHaveStyle('font-size: 20px')
    })

    it('複数のスタイルプロパティを適用する', () => {
      render(
        <AmountText
          amount={1000}
          sx={{
            fontWeight: 'bold',
            textAlign: 'right',
            backgroundColor: 'yellow',
          }}
          data-testid="multi-styled-amount"
        />
      )
      const element = screen.getByTestId('multi-styled-amount')
      expect(element).toHaveStyle('font-weight: 700')
      expect(element).toHaveStyle('text-align: right')
      expect(element).toHaveStyle('background-color: rgb(255, 255, 0)')
    })
  })

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

  describe('エッジケース', () => {
    it('非常に大きな数値を処理する', () => {
      render(<AmountText amount={999999999} />)
      expect(screen.getByText('¥999,999,999')).toBeInTheDocument()
    })

    it('非常に小さな負の数値を処理する', () => {
      render(<AmountText amount={-999999999} />)
      expect(screen.getByText('¥-999,999,999')).toBeInTheDocument()
    })

    it('小数点を含む数値を整数として処理する', () => {
      render(<AmountText amount={1500.75} />)
      expect(screen.getByText('¥1,500')).toBeInTheDocument()
    })
  })

  describe('異なるvariantとcomponentの組み合わせ', () => {
    it('h1 variantとdiv componentを組み合わせる', () => {
      render(
        <AmountText
          amount={50000}
          variant="h1"
          component="div"
          data-testid="h1-div-amount"
        />
      )
      const element = screen.getByTestId('h1-div-amount')
      expect(element).toHaveClass('MuiTypography-h1')
      expect(element.tagName).toBe('DIV')
    })

    it('caption variantとspan componentを組み合わせる', () => {
      render(
        <AmountText
          amount={1000}
          variant="caption"
          component="span"
          data-testid="caption-span-amount"
        />
      )
      const element = screen.getByTestId('caption-span-amount')
      expect(element).toHaveClass('MuiTypography-caption')
      expect(element.tagName).toBe('SPAN')
    })
  })
})
