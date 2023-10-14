import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

export type BaseControllerInputProps<T extends FieldValues, Props = NonNullable<unknown>> = {
  control: Control<T>;
  name: FieldPath<T>;
  regExp?: RegExp;
  disabled?: boolean;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
} & Props;
