import React from 'react';
import { Pagination } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const TablePagination = ({ tableInstance }) => {
  const {
    gotoPage,
    canPreviousPage,
    pageCount,
    previousPage,
    nextPage,
    canNextPage,
    state: { pageIndex },
  } = tableInstance;

  if (pageCount <= 1) {
    return <></>;
  }

  // calculate total pages

  let startPage = 1;
  let endPage = 10;
  if (pageCount <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = pageCount;
  } else if (pageCount > 10) {
    // more than 10 total pages so calculate start and end pages
    if (pageIndex <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (pageIndex + 5 >= pageCount) {
      startPage = pageCount - 9;
      endPage = pageCount;
    } else {
      startPage = pageIndex - 4;
      endPage = pageIndex + 5;
    }
  }

  // create an array of pages to ng-repeat in the pager control
  const currentPages = [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);

  return (
    <Pagination className="justify-content-center mb-0 mt-3">
      <Pagination.First className="shadow" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        <CsLineIcons icon="arrow-double-left" />
      </Pagination.First>
      <Pagination.Prev className="shadow" disabled={!canPreviousPage} onClick={() => previousPage()}>
        <CsLineIcons icon="chevron-left" />
      </Pagination.Prev>

      {currentPages.map((x, i) => (
        <Pagination.Item key={`pagination${x}`} className="shadow" active={pageIndex === x - 1} onClick={() => gotoPage(x - 1)}>
          {x}
        </Pagination.Item>
      ))}

      <Pagination.Next className="shadow" onClick={() => nextPage()} disabled={!canNextPage}>
        <CsLineIcons icon="chevron-right" />
      </Pagination.Next>
      <Pagination.Last className="shadow" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        <CsLineIcons icon="arrow-double-right" />
      </Pagination.Last>
    </Pagination>
  );
};
export default TablePagination;
