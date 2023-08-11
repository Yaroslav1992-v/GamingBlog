import React, { useRef } from "react";
import { PaginationProps } from "./pagination.props";
import _ from "lodash";

export const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}: PaginationProps) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pagRef = useRef<HTMLDivElement>(null);
  if (pageCount === 1) {
    return null;
  }
  const handleScroll = (num: number) => {
    console.log(pagRef.current);

    onPageChange(num);
    setTimeout(() => {
      pagRef.current?.scrollIntoView();
    }, 10);
  };
  const pages = _.range(1, pageCount + 1);
  return (
    <div ref={pagRef} className="pagination">
      <ul className="pagination__list">
        {pages.map((page) => {
          return (
            <li
              className={
                "pagination__item " +
                (page === currentPage ? " pagination__item-active" : "")
              }
              key={"page_" + page}
            >
              <button
                className="pagination__button"
                onClick={() => handleScroll(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
