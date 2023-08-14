export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Search {
  query: string;
  location: string;
  category: string;
  type: string;
  experience: string;
  dateposted: string;
  salary: string;
}

export interface SearchJobWithPagination extends Search, Pagination {}
