export interface PagedApiResponse<T> {
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;

  data: T[];
}
