export class Pagination {
  page: number;
  take: number;
  skip: number;
  count: number;
  pages: number;

  constructor(count: number, page?: number | string, take?: number | string) {
    this.page = Number(page) || 1;
    this.take = Number(take) || 15;
    this.skip = (this.page - 1) * this.take;
    this.count = count;
    this.pages = Math.ceil(this.count / this.take);
  }
}
