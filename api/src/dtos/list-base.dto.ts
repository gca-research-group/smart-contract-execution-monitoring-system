export interface ListBaseDto {
  id: number;
  _id: string;
  page: number;
  pageSize: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}
