import { useState } from 'react';

export function useFormInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const bind = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
  };

  const reset = () => setValue(initialValue);

  return { value, setValue, bind, reset };
}
