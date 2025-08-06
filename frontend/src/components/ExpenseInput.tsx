import { useState } from 'react';
import TextInput from './common/TextInput';

interface ExpenseInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function ExpenseInput({ value, onChange, placeholder = '支出金額を入力' }: ExpenseInputProps) {
  const handleChange = (inputValue: string) => {
    // 数値のみ許可（小数点を含む）
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <TextInput
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default ExpenseInput;