import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import ControlledCustomDateSwitch from '../ControlledCustomDateSwitch'
import type { TransactionFormData } from '@/lib/validation/schemas'

// ストーリー用のフォームラッパー
function FormWrapper({
  defaultValue = false,
  label = '日付を指定する',
  showSubmitData = false,
}: {
  defaultValue?: boolean
  label?: string
  showSubmitData?: boolean
}) {
  const { control, handleSubmit, watch } = useForm<TransactionFormData>({
    defaultValues: {
      amount: 0,
      description: '',
      category: '',
      date: '',
      useCustomDate: defaultValue,
    },
  })

  const [submitData, setSubmitData] = useState<TransactionFormData | null>(null)
  const currentValue = watch('useCustomDate')

  const onSubmit = (data: TransactionFormData) => {
    console.log('フォーム送信データ:', data)
    if (showSubmitData) {
      setSubmitData(data)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <ControlledCustomDateSwitch<TransactionFormData, 'useCustomDate'>
        control={control}
        name="useCustomDate"
        label={label}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button type="submit" variant="contained" size="small">
          送信
        </Button>
        <Typography variant="body2" color="text.secondary">
          現在の値: {currentValue ? 'ON' : 'OFF'}
        </Typography>
      </Box>

      {showSubmitData && submitData && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            送信されたデータ:
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ fontSize: '0.8rem' }}
          >
            {JSON.stringify(submitData, null, 2)}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

const meta: Meta<typeof ControlledCustomDateSwitch> = {
  title: 'Components/Forms/ControlledCustomDateSwitch',
  component: ControlledCustomDateSwitch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'react-hook-form連携スイッチコンポーネント。フォーム内で使用されるブール値のスイッチ入力フィールドで、Controllerでラップしてバリデーション・フォーム状態を自動化。テンプレートリテラルを使用して任意のフォーム型と柔軟なフィールド名に対応。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    control: {
      description: 'react-hook-formのcontrolオブジェクト',
      control: false,
    },
    name: {
      description: 'フィールド名',
      control: 'text',
    },
    label: {
      description: 'スイッチのラベルテキスト',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof ControlledCustomDateSwitch>

/**
 * デフォルト状態（スイッチOFF）
 */
export const Default: Story = {
  render: () => <FormWrapper />,
}

/**
 * 初期値ON状態
 */
export const WithInitialOn: Story = {
  render: () => <FormWrapper defaultValue={true} />,
}

/**
 * カスタムラベル
 */
export const CustomLabel: Story = {
  render: () => <FormWrapper label="通知を有効にする" />,
}

/**
 * フォーム送信データの表示
 */
export const WithSubmitData: Story = {
  render: () => <FormWrapper defaultValue={true} showSubmitData />,
}

/**
 * 設定フォームでの使用例
 */
export const SettingsForm: Story = {
  render: () => {
    const { control, handleSubmit, watch } = useForm<{
      autoSave: boolean
      enableNotifications: boolean
      darkMode: boolean
    }>({
      defaultValues: {
        autoSave: true,
        enableNotifications: false,
        darkMode: false,
      },
    })

    const [autoSave, enableNotifications, darkMode] = watch([
      'autoSave',
      'enableNotifications',
      'darkMode',
    ])

    const onSubmit = (data: {
      autoSave: boolean
      enableNotifications: boolean
      darkMode: boolean
    }) => {
      console.log('設定データ:', data)
    }

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 400,
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              アプリケーション設定
            </Typography>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 1 }}
            >
              <ControlledCustomDateSwitch<
                {
                  autoSave: boolean
                  enableNotifications: boolean
                  darkMode: boolean
                },
                'autoSave'
              >
                control={control}
                name="autoSave"
                label="自動保存を有効にする"
              />

              <ControlledCustomDateSwitch<
                {
                  autoSave: boolean
                  enableNotifications: boolean
                  darkMode: boolean
                },
                'enableNotifications'
              >
                control={control}
                name="enableNotifications"
                label="通知を有効にする"
              />

              <ControlledCustomDateSwitch<
                {
                  autoSave: boolean
                  enableNotifications: boolean
                  darkMode: boolean
                },
                'darkMode'
              >
                control={control}
                name="darkMode"
                label="ダークモードを使用する"
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              現在の設定
            </Typography>
            <Typography variant="body2">
              自動保存: {autoSave ? 'ON' : 'OFF'}
            </Typography>
            <Typography variant="body2">
              通知: {enableNotifications ? 'ON' : 'OFF'}
            </Typography>
            <Typography variant="body2">
              ダークモード: {darkMode ? 'ON' : 'OFF'}
            </Typography>
          </Box>

          <Button type="submit" variant="contained">
            設定を保存
          </Button>
        </Box>
      </Box>
    )
  },
}

/**
 * 複数のスイッチフィールド
 */
export const MultipleFields: Story = {
  render: () => {
    const { control, handleSubmit, watch } = useForm<{
      feature1: boolean
      feature2: boolean
      feature3: boolean
    }>({
      defaultValues: {
        feature1: true,
        feature2: false,
        feature3: true,
      },
    })

    const [feature1, feature2, feature3] = watch([
      'feature1',
      'feature2',
      'feature3',
    ])

    const onSubmit = (data: {
      feature1: boolean
      feature2: boolean
      feature3: boolean
    }) => {
      console.log('機能設定データ:', data)
    }

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            機能設定
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <ControlledCustomDateSwitch<
              { feature1: boolean; feature2: boolean; feature3: boolean },
              'feature1'
            >
              control={control}
              name="feature1"
              label="高度な分析機能"
            />

            <ControlledCustomDateSwitch<
              { feature1: boolean; feature2: boolean; feature3: boolean },
              'feature2'
            >
              control={control}
              name="feature2"
              label="エクスポート機能"
            />

            <ControlledCustomDateSwitch<
              { feature1: boolean; feature2: boolean; feature3: boolean },
              'feature3'
            >
              control={control}
              name="feature3"
              label="リアルタイム同期"
            />
          </Box>

          <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
            <Typography variant="body2" color="info.contrastText">
              有効な機能数:{' '}
              {[feature1, feature2, feature3].filter(Boolean).length} / 3
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="info.contrastText">
                • 高度な分析機能: {feature1 ? '有効' : '無効'}
              </Typography>
              <Typography variant="body2" color="info.contrastText">
                • エクスポート機能: {feature2 ? '有効' : '無効'}
              </Typography>
              <Typography variant="body2" color="info.contrastText">
                • リアルタイム同期: {feature3 ? '有効' : '無効'}
              </Typography>
            </Box>
          </Box>

          <Button type="submit" variant="contained">
            設定を適用
          </Button>
        </Box>
      </Box>
    )
  },
}

/**
 * インタラクティブテスト（スイッチの変化を確認）
 */
export const InteractiveTest: Story = {
  render: () => {
    const { control, handleSubmit, watch, setValue } =
      useForm<TransactionFormData>({
        defaultValues: {
          amount: 0,
          description: '',
          category: '',
          date: '',
          useCustomDate: false,
        },
      })

    const currentValue = watch('useCustomDate')

    const onSubmit = (data: TransactionFormData) => {
      alert(`スイッチの状態: ${data.useCustomDate ? 'ON' : 'OFF'}`)
    }

    const toggleSwitch = () => {
      setValue('useCustomDate', !currentValue)
    }

    const setOn = () => {
      setValue('useCustomDate', true)
    }

    const setOff = () => {
      setValue('useCustomDate', false)
    }

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <ControlledCustomDateSwitch<TransactionFormData, 'useCustomDate'>
          control={control}
          name="useCustomDate"
          label="カスタム機能を有効にする"
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            プリセット操作:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant="outlined" size="small" onClick={toggleSwitch}>
              切り替え
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={setOn}
              color="success"
            >
              ON
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={setOff}
              color="error"
            >
              OFF
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button type="submit" variant="contained">
            送信
          </Button>
          <Typography variant="body1">
            現在の状態: <strong>{currentValue ? 'ON' : 'OFF'}</strong>
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
            p: 1,
            bgcolor: currentValue ? 'success.light' : 'grey.100',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">スイッチの詳細情報:</Typography>
          <Typography variant="body2">
            • 状態: {currentValue ? '有効' : '無効'}
          </Typography>
          <Typography variant="body2">• 値: {String(currentValue)}</Typography>
          <Typography variant="body2">• 型: {typeof currentValue}</Typography>
        </Box>
      </Box>
    )
  },
}

/**
 * ネストしたフォーム構造での使用
 */
export const NestedForm: Story = {
  render: () => {
    const { control, handleSubmit, watch } = useForm<{
      user: {
        preferences: {
          emailNotifications: boolean
          smsNotifications: boolean
        }
      }
    }>({
      defaultValues: {
        user: {
          preferences: {
            emailNotifications: true,
            smsNotifications: false,
          },
        },
      },
    })

    const preferences = watch('user.preferences')

    const onSubmit = (data: {
      user: {
        preferences: { emailNotifications: boolean; smsNotifications: boolean }
      }
    }) => {
      console.log('ネストしたフォームデータ:', data)
    }

    return (
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          ユーザー設定
        </Typography>

        <Box sx={{ ml: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            通知設定
          </Typography>

          <ControlledCustomDateSwitch<
            {
              user: {
                preferences: {
                  emailNotifications: boolean
                  smsNotifications: boolean
                }
              }
            },
            'user.preferences.emailNotifications'
          >
            control={control}
            name="user.preferences.emailNotifications"
            label="Eメール通知"
          />

          <ControlledCustomDateSwitch<
            {
              user: {
                preferences: {
                  emailNotifications: boolean
                  smsNotifications: boolean
                }
              }
            },
            'user.preferences.smsNotifications'
          >
            control={control}
            name="user.preferences.smsNotifications"
            label="SMS通知"
          />
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            現在の通知設定:
          </Typography>
          <Typography variant="body2">
            Eメール: {preferences?.emailNotifications ? 'ON' : 'OFF'}
          </Typography>
          <Typography variant="body2">
            SMS: {preferences?.smsNotifications ? 'ON' : 'OFF'}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            設定を保存
          </Button>
        </Box>
      </Box>
    )
  },
}
