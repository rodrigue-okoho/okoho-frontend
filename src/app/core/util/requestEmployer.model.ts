export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Search {
  query: string;
  city: string;
  category: string;
}

export interface SearchEmployerWithPagination extends Search, Pagination {}
