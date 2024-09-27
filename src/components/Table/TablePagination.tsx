import { useEffect } from "react";

interface tablePaginationProps {
  currentPage: number | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number | undefined;
  totalItems: number | undefined;
  pageSize: number | undefined;
  onPageChange?: (page: number) => void;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

function TablePagination({
  setCurrentPage,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  setPageSize,
  onPageChange,
  ...props
}: tablePaginationProps) {
  useEffect(() => {
    if (currentPage) setCurrentPage(currentPage);
  }, [pageSize]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...props}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="lato-bold"
          style={{
            backgroundColor: "lightblue",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            width: "100px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="lato-bold"
          style={{
            backgroundColor: "lightblue",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            width: "100px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
          onClick={() => {
            if (totalPages)
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>Total entries: {}</div>
      <div
        style={{
          marginTop: "10px",
          alignItems: "center",
          display: "flex",
          gap: "10px",
        }}
      >
        <label htmlFor="">Show</label>
        <select
          name="show"
          id="show"
          onChange={(e) => {
            console.log(e.target.value);
            setPageSize(Number(e.target.value));
          }}
          style={{
            backgroundColor: "lightblue",
            padding: "5px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            width: "100px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
        </select>
      </div>
    </div>
  );
}

export default TablePagination;
