export interface ListBaseDto {
  id: number;
  page: number;
  pageSize: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}
