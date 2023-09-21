import React, { useRef } from "react";
import { PaginationProps } from "./pagination.props";
import _ from "lodash";

export const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  divRef,
}: PaginationProps) => {
  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) {
    return null;
  }

  const handleScroll = (num: number) => {
    onPageChange(num);
    setTimeout(() => {
      if (divRef.current) {
        const topOffset = divRef.current?.offsetTop - 150;
        divRef.current?.scrollIntoView({ behavior: "smooth" });
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }, 10);
  };
  const pages = _.range(1, pageCount + 1);
  return (
    <div className="pagination">
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
