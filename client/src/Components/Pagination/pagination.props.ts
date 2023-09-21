export interface PaginationProps {
  itemsCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  currentPage: number;
  divRef: React.RefObject<HTMLDivElement>;
}
