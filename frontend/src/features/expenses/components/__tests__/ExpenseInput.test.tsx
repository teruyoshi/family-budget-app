import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseInput from '../ExpenseInput';

describe('ExpenseInput', () => {
  test('正の整数の入力が許可される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <ExpenseInput
        value=""
        onChange={mockOnChange}
      />
    );
    
    const input = screen.getByPlaceholderText('支出金額を入力');
    fireEvent.change(input, { target: { value: '1000' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('1000');
  });

  test('小数点を含む数値の入力が許可される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <ExpenseInput
        value=""
        onChange={mockOnChange}
      />
    );
    
    const input = screen.getByPlaceholderText('支出金額を入力');
    fireEvent.change(input, { target: { value: '123.45' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('123.45');
  });

  test('不正な文字の入力が無視される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <ExpenseInput
        value="100"
        onChange={mockOnChange}
      />
    );
    
    const input = screen.getByDisplayValue('100');
    
    // 文字を入力しようとする（不正な値）
    fireEvent.change(input, { target: { value: '100abc' } });
    
    // 不正な値の場合、onChangeが呼ばれない（ExpenseInputの仕様）
    expect(mockOnChange).not.toHaveBeenCalledWith('100abc');
  });

  test('空文字の入力が許可される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <ExpenseInput
        value="100"
        onChange={mockOnChange}
      />
    );
    
    const input = screen.getByDisplayValue('100');
    fireEvent.change(input, { target: { value: '' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  test('カスタムプレースホルダーが表示される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <ExpenseInput
        value=""
        onChange={mockOnChange}
        placeholder="カスタム金額入力"
      />
    );
    
    const input = screen.getByPlaceholderText('カスタム金額入力');
    expect(input).toBeInTheDocument();
  });

  test('数値タイプが正しく設定される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <ExpenseInput
        value=""
        onChange={mockOnChange}
      />
    );
    
    const input = screen.getByPlaceholderText('支出金額を入力');
    expect(input).toHaveAttribute('type', 'number');
  });

  test('複数の小数点入力が制御される', () => {
    const mockOnChange = jest.fn();
    
    render(
      <ExpenseInput
        value="12.34"
        onChange={mockOnChange}
      />
    );
    
    const input = screen.getByDisplayValue('12.34');
    
    // 2つ目の小数点を入力しようとする
    fireEvent.change(input, { target: { value: '12.34.5' } });
    
    // 不正な形式の場合、onChangeが呼ばれない（ExpenseInputの仕様）
    expect(mockOnChange).not.toHaveBeenCalledWith('12.34.5');
  });
});