import React from "react";
import { usePagination, DOTS } from "./usePagination";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  const itemList =
    "rounded-lg h-8 w-8 bg-dark-widget text-white px-0 py-2 mx-auto my-4 flex tracking-wide text-sm min-w-min";
  const row = "relative inline-block w-2 h-2 border-t-2 border-r-2";
  const left = "";
  return (
    <ul
      class={"flex flex-row list-none"}
      // className={classnames('pagination-container', { [className]: className })}
    >
      {/* Left navigation arrow */}
      <li
        // className={classnames('pagination-item', {
        //   disabled: currentPage === 1
        // })}
        class={[itemList]}
        onClick={onPrevious}
      >
        <div
          // className="arrow left"
          class={[row + " "]}
        />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
            // className="pagination-item dots"
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            class={[itemList, " flex align-middle items-center"]}
            // className={classnames('pagination-item', {
            //   selected: pageNumber === currentPage
            // })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        // className={classnames('pagination-item', {
        //   disabled: currentPage === lastPage
        // })}
        class={[itemList]}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export { Pagination };
