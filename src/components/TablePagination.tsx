import { useEffect } from "react";

interface tablePaginationProps {
  currentPage: number | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number | undefined;
  totalItems: number | undefined;
  pageSize: number | undefined;
  // onPageChange?: (page: number) => void;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export function TablePagination({
  setCurrentPage,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  setPageSize,
  // onPageChange,
  ...props
}: tablePaginationProps) {
  useEffect(() => {
    if (currentPage) setCurrentPage(currentPage);
  }, [pageSize, currentPage, setCurrentPage]);
  return (
    <div className="table-pagination" {...props}>
      <div>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="table-pagination-button"
        >
          &lsaquo;
        </button>
        <span style={{ margin: "0 10px" }}>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => {
            if (totalPages) setCurrentPage(prev => Math.min(prev + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
          className="table-pagination-button"
        >
          &rsaquo;
        </button>
      </div>
      <div>Total entries: {totalItems}</div>
      <div>
        <label htmlFor="">Show</label>
        <select
          name="show"
          id="show"
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
          className="table-pagination-select"
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
        </select>
      </div>
    </div>
  );
}
