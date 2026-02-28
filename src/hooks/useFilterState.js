import { useState, useCallback } from 'react';

export function useFilterState() {
  const [roleFilter, setRoleFilter] = useState('');
  const [searchText, setSearchText] = useState('');

  const reset = useCallback(() => {
    setRoleFilter('');
    setSearchText('');
  }, []);

  return {
    roleFilter,
    setRoleFilter,
    searchText,
    setSearchText,
    reset
  };
}
