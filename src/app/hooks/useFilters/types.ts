export interface UseFiltersProps<T extends object> {
  initialFilterParams: T;
}

export interface UseFiltersReturn<T extends object> {
  filterParams: T;
  onChangeFilterParams: (params: Partial<T>) => void;
}
