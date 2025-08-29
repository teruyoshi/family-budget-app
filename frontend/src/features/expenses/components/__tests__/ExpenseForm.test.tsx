import { render, screen, fireEvent } from '@testing-library/react'
import { DateLocalizationProvider } from '@/components/provider'
import ExpenseForm from '../ExpenseForm'

const setup = (props = {}) => {
  return render(
    <DateLocalizationProvider>
      <ExpenseForm {...props} />
    </DateLocalizationProvider>
  )
}

describe('ExpenseForm', () => {
  // 支出入力表示テスト（表示確認系、冗長）

  // 支出登録ボタン表示テスト（表示確認系、冗長）

  // 日付トグル表示テスト（表示確認系、冗長）

  test('トグルスイッチを有効にすると日付ピッカーが表示される', () => {
    setup()

    // 最初は日付ピッカーが非表示
    expect(
      screen.queryByRole('group', { name: '支出日付' })
    ).not.toBeInTheDocument()

    // トグルスイッチをクリック
    const dateToggle = screen.getByRole('switch', { name: '日付を指定する' })
    fireEvent.click(dateToggle)

    // 日付ピッカーが表示される
    expect(screen.getByRole('group', { name: '支出日付' })).toBeInTheDocument()
  })
})
