import { render, screen, fireEvent, act } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { Box } from '@mui/material'
import ControlledCustomDateSwitch from '../ControlledCustomDateSwitch'
import type { TransactionFormData } from '@/lib/validation/schemas'

// テスト用のフォームラッパーコンポーネント
function TestFormWrapper({
  defaultValues = {},
  onSubmit = jest.fn(),
}: {
  defaultValues?: Partial<TransactionFormData>
  onSubmit?: (data: TransactionFormData) => void
}) {
  const { control, handleSubmit } = useForm<TransactionFormData>({
    defaultValues: {
      amount: 0,
      date: '',
      useCustomDate: false,
      ...defaultValues,
    },
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <ControlledCustomDateSwitch
        control={control}
        name="useCustomDate"
        label="日付を指定する"
      />
      <button type="submit">Submit</button>
    </Box>
  )
}

describe('ControlledCustomDateSwitch', () => {
  it('デフォルトラベルが表示される', () => {
    render(<TestFormWrapper />)
    expect(screen.getByText('日付を指定する')).toBeInTheDocument()
  })

  it('スイッチが初期状態でオフになっている', () => {
    render(<TestFormWrapper />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).not.toBeChecked()
  })

  it('初期値がtrueの場合、スイッチがオンになっている', () => {
    render(<TestFormWrapper defaultValues={{ useCustomDate: true }} />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeChecked()
  })

  it('スイッチをクリックして状態を変更できる', () => {
    render(<TestFormWrapper />)
    const switchElement = screen.getByRole('switch')

    expect(switchElement).not.toBeChecked()

    fireEvent.click(switchElement)
    expect(switchElement).toBeChecked()

    fireEvent.click(switchElement)
    expect(switchElement).not.toBeChecked()
  })

  it('フォーム送信時に正しい値が渡される（false）', async () => {
    const mockSubmit = jest.fn()
    render(<TestFormWrapper onSubmit={mockSubmit} />)

    const submitButton = screen.getByText('Submit')

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        useCustomDate: false,
      }),
      expect.anything() // React Hook Formのイベント引数
    )
  })

  it('フォーム送信時に正しい値が渡される（true）', async () => {
    const mockSubmit = jest.fn()
    render(<TestFormWrapper onSubmit={mockSubmit} />)

    const switchElement = screen.getByRole('switch')
    const submitButton = screen.getByText('Submit')

    await act(async () => {
      fireEvent.click(switchElement)
    })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        useCustomDate: true,
      }),
      expect.anything() // React Hook Formのイベント引数
    )
  })

  it('カスタムラベルが正しく表示される', () => {
    function CustomLabelWrapper() {
      const { control } = useForm<{ enableNotifications: boolean }>({
        defaultValues: { enableNotifications: false },
      })

      return (
        <ControlledCustomDateSwitch<
          { enableNotifications: boolean },
          'enableNotifications'
        >
          control={control}
          name="enableNotifications"
          label="通知を有効にする"
        />
      )
    }

    render(<CustomLabelWrapper />)
    expect(screen.getByText('通知を有効にする')).toBeInTheDocument()
  })

  it('複数のスイッチフィールドが独立して動作する', () => {
    function MultiSwitchWrapper() {
      const { control } = useForm<{
        autoSave: boolean
        enableNotifications: boolean
      }>({
        defaultValues: { autoSave: false, enableNotifications: false },
      })

      return (
        <Box>
          <ControlledCustomDateSwitch<
            { autoSave: boolean; enableNotifications: boolean },
            'autoSave'
          >
            control={control}
            name="autoSave"
            label="自動保存"
          />
          <ControlledCustomDateSwitch<
            { autoSave: boolean; enableNotifications: boolean },
            'enableNotifications'
          >
            control={control}
            name="enableNotifications"
            label="通知を有効にする"
          />
        </Box>
      )
    }

    render(<MultiSwitchWrapper />)

    const autoSaveSwitch = screen.getByLabelText('自動保存')
    const notificationsSwitch = screen.getByLabelText('通知を有効にする')

    expect(autoSaveSwitch).not.toBeChecked()
    expect(notificationsSwitch).not.toBeChecked()

    fireEvent.click(autoSaveSwitch)

    expect(autoSaveSwitch).toBeChecked()
    expect(notificationsSwitch).not.toBeChecked()

    fireEvent.click(notificationsSwitch)

    expect(autoSaveSwitch).toBeChecked()
    expect(notificationsSwitch).toBeChecked()
  })
})
