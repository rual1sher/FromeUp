import { Pagination } from './pagination';

export class ApiResponse {
  data: any;
  meta?: Pagination;

  constructor(data: any, pagination?: Pagination) {
    this.data = data;
    this.meta = pagination || null;
  }
}
