export type PaginationType = {
  total_pages: number,
  current_page: number,
  has_pre: boolean,
  has_next: boolean,
  category?: string,
}