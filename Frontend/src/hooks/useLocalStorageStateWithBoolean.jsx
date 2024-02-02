import { useState } from 'react';

export const useLocalStorageState = (itemKey, path, defaultValue) => {
  const key = path + '/' + itemKey
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      if (storedValue === 'true' || storedValue === 'false') {
        return storedValue === 'true';
      }
      return JSON.parse(storedValue);
    }
    return defaultValue;
  });

  const setLocalStorageState = (newValue) => {
    setState(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [state, setLocalStorageState];
}

export const deleteLocalStorageItemsStartingWith = (prefix) => {
  // Get all keys from local storage
  const keys = Object.keys(localStorage);

  // Filter keys that start with the specified prefix
  keys.forEach(key => {
    if (key.startsWith(prefix)) {
      // Remove item from local storage
      localStorage.removeItem(key);
    }
  });
};