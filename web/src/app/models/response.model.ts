export type FindAllResponse<T> = {
  data: T[];
  hasMore: boolean;
  total: number;
};
