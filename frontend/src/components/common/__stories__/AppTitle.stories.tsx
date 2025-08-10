import { Meta, StoryObj } from '@storybook/react'
import AppTitle from '../AppTitle'

const meta: Meta<typeof AppTitle> = {
  component: AppTitle,
  title: 'components/common/AppTitle',
  tags: ['autodocs'], // これでDocsページが自動生成
}
export default meta

export const Default: StoryObj<typeof AppTitle> = {
  args: {},
}
