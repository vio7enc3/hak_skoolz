import React, { useState } from 'react';
import { UseFiltersProps, UseFiltersReturn } from './types';

export function useFilters<T extends object>(props: UseFiltersProps<T>): UseFiltersReturn<T> {
  const { initialFilterParams } = props;
  const [filterParams, setFilterParams] = useState<T>(
    Object.entries(initialFilterParams).reduce((acc, [key, value]) => {
      if (!value) return acc;
      return { ...acc, [key]: value };
    }, {}) as T
  );

  const onChangeFilterParams = (params: Partial<T>) => {
    setFilterParams((prev) => {
      const newParams = Object.entries({ ...prev, ...params }).reduce((acc, [key, value]) => {
        if (!value) return acc;
        return { ...acc, [key]: value };
      }, {}) as T;

      return newParams;
    });
  };

  return {
    onChangeFilterParams,
    filterParams,
  };
}
