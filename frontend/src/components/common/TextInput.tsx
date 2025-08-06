import { forwardRef } from 'react';

interface TextInputProps {
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required={required}
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;