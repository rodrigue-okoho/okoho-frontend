export interface Pagination {
  page: number;
  size: number;
  sort: string[];
}

export interface Search {
  query: string;
  keyword: string;
  location: string;
  category: string;
  experience: string;
  dateposted: string;
  education: string;
}

export interface SearchCandidatWithPagination extends Search, Pagination {}
