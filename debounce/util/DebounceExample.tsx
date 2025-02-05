
import { useDebounce } from './debounce'; 
import React, { useState } from 'react';
const DebounceComponent: React.FC<{ callbackFn: jest.Mock, delay: number }> = ({ callbackFn, delay }) => {
  const [value, setValue] = useState('');
  const debouncedFunction = useDebounce(callbackFn, delay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedFunction(e.target.value);
  };

  return <input data-testid="debounce-input" value={value} onChange={handleChange} />;
};

export default DebounceComponent