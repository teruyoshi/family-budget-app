import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../TextInput';

describe('TextInput', () => {
  test('基本的なプロパティで正しく描画される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <TextInput
        type="text"
        placeholder="テスト用プレースホルダー"
        value=""
        onChange={mockOnChange}
      />
    );
    
    const input = screen.getByPlaceholderText('テスト用プレースホルダー');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  test('値の変更が正しく処理される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <TextInput
        value=""
        onChange={mockOnChange}
        placeholder="入力してください"
      />
    );
    
    const input = screen.getByPlaceholderText('入力してください');
    fireEvent.change(input, { target: { value: 'テスト入力' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('テスト入力');
  });

  test('必須フィールドが正しく設定される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <TextInput
        value=""
        onChange={mockOnChange}
        required
        placeholder="必須フィールド"
      />
    );
    
    const input = screen.getByPlaceholderText('必須フィールド');
    expect(input).toBeRequired();
  });

  test('数値タイプの入力フィールドが正しく設定される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <TextInput
        type="number"
        value="123"
        onChange={mockOnChange}
        placeholder="数値を入力"
      />
    );
    
    const input = screen.getByPlaceholderText('数値を入力');
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveValue(123);
  });

  test('バリアント設定が正しく適用される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <TextInput
        value=""
        onChange={mockOnChange}
        variant="filled"
        placeholder="バリアントテスト"
      />
    );
    
    const input = screen.getByPlaceholderText('バリアントテスト');
    expect(input).toBeInTheDocument();
    // MUIコンポーネントの詳細な属性確認は統合テストで実施
  });
});