export interface Response<T> {
  total: number;
  hasMore: boolean;
  data: T;
  page: number;
  pages: number;
}
