import { forwardRef } from 'react';
import { TextField, SxProps, Theme } from '@mui/material';

interface TextInputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps<Theme>;
  required?: boolean;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  sx,
  required = false,
  fullWidth = true,
  variant = 'outlined'
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      inputRef={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required={required}
      fullWidth={fullWidth}
      variant={variant}
      sx={sx}
    />
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;