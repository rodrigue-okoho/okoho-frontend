export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Search {
  query: string;
  city: string;
  category: string;
  founded: string;
  compagny_size: string;
}

export interface SearchEmployerWithPagination extends Search, Pagination {}
