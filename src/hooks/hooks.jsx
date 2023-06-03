import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem(key));
    return contacts?.length > 0 ? contacts : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
