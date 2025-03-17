export type ListSmartContractDto = {
  id: number;
  name: string;
  page: number;
  pageSize: number;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
};
