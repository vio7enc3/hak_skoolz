export type DefaultResponse<T extends {} = {}> = {
  data: T;
  success: boolean;
};

export type ResponseWithPagination<T extends {} = {}> = {
  data: T[];
  success: boolean;
  totalPages: number;
};

export type RequestWithPagination<T extends {}> = {
  page?: number;
  pageSize?: number;
} & T;

export type Option<T = string> = {
  value: T;
  label: string;
}
