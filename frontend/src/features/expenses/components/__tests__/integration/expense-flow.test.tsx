import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ExpenseForm from '../../ExpenseForm';

describe('Expense Flow Integration', () => {
  // Test helper function to setup ExpenseForm test environment
  const setupExpenseForm = () => {
    const mockOnSubmit = jest.fn();
    
    render(<ExpenseForm onSubmit={mockOnSubmit} />);
    const input = screen.getByPlaceholderText('支出金額を入力');
    const submitButton = screen.getByRole('button', { name: '支出を登録' });
    
    return {
      mockOnSubmit,
      input,
      submitButton
    };
  };
  test('支出登録の完全なフローが正常に動作する', async () => {
    // Arrange
    const { mockOnSubmit, input, submitButton } = setupExpenseForm();
    const testAmount = 1500;

    // Act
    fireEvent.change(input, { target: { value: testAmount.toString() } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(testAmount);
    });
    
    await waitFor(() => {
      const updatedInput = screen.getByPlaceholderText('支出金額を入力');
      expect(updatedInput.value === '' || updatedInput.value === '0').toBe(true);
    }, { timeout: 3000 });
  });

  test('無効な入力での送信が防止される', async () => {
    // Arrange
    const { mockOnSubmit, input, submitButton } = setupExpenseForm();

    // Act - 空の状態で送信
    fireEvent.click(submitButton);

    // Assert
    expect(mockOnSubmit).not.toHaveBeenCalled();

    // Act - 0を入力して送信
    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(submitButton);

    // Assert
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('小数点を含む金額の登録が正常に動作する', async () => {
    // Arrange
    const { mockOnSubmit, input, submitButton } = setupExpenseForm();
    const testAmount = 123.45;

    // Act
    fireEvent.change(input, { target: { value: testAmount.toString() } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(testAmount);
    });
  });

  test('連続する支出登録が正常に動作する', async () => {
    // Arrange
    const { mockOnSubmit, input, submitButton } = setupExpenseForm();
    const firstAmount = 1000;
    const secondAmount = 2500;

    // Act - 1回目の登録
    fireEvent.change(input, { target: { value: firstAmount.toString() } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(firstAmount);
    });

    // Act - 2回目の登録
    fireEvent.change(input, { target: { value: secondAmount.toString() } });
    fireEvent.click(submitButton);

    // Assert
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(secondAmount);
    });
    
    expect(mockOnSubmit).toHaveBeenCalledTimes(2);
  });
});