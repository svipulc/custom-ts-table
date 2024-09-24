import { useMemo, useState } from "react";
import { createColumnHelper } from "../../core/columns/columns";
import { useCreateCustomTable } from "../../core/table/table";
import { employees } from "../../data";
import { DeepKeys } from "../../types/tableTypes";

// create column helper
const columnHelper = createColumnHelper<employees>();

// create columns
const columns = [
  columnHelper.accessor("id", {
    id: "1",
    header: "ID",
  }),
  columnHelper.accessor("name", {
    id: "2",
    header: () => <a href="">Name</a>,
  }),
  columnHelper.accessor("salary", {
    id: "3",
    header: "Salary",
    sortable: true,
  }),
  columnHelper.accessor("department", {
    id: "4",
    header: "Department",
  }),
  columnHelper.accessor("position", {
    id: "5",
    header: "Position",
  }),
];

const FilterTable = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: DeepKeys<employees>;
    direction: "ascending" | "descending" | "none";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [filters, setFilters] = useState("");
  // update state of sort base on user action
  const requestSort = (key: DeepKeys<employees>) => {
    let direction: "ascending" | "descending" | "none" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };

  // create table
  const table = useCreateCustomTable({
    data: employees,
    columns: columns,
    sorting: sortConfig,
    filterCriteria: {
      name: (value) => value.includes(filters.toLocaleLowerCase()),
    },
    pagination: {
      page: currentPage,
      pageSize: pageSize,
    },
  });
  // get header group
  const headerGroups = table.getHeaderGroup();
  // get row model
  const rowModel = table.getRowModel();
  // get footer group
  const footerGroups = table.getFooterGroup();

  const totalPages = table.getPaginationInfo()?.totalPages!;
  return (
    <div className="table-container">
      <div>
        <label htmlFor="" style={{ marginRight: "20px", fontSize: "20px" }}>
          Filter Name
        </label>
        <input
          type="text"
          name="search"
          id="search"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid lightblue",
            fontSize: "16px",
          }}
          onChange={(e) => setFilters(e.target.value)}
        />
      </div>
      <table className="table">
        <thead className="table-header">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  colSpan={column.colSpan}
                  rowSpan={column.rowSpan}
                  key={column.id}
                  onClick={() =>
                    column.column.sortable &&
                    requestSort(
                      column.column.accessorKey as DeepKeys<employees>
                    )
                  }
                  style={{
                    cursor:
                      column.column.sortable && column.isGroupHeader
                        ? "pointer"
                        : "default",
                  }}
                >
                  {column.header}
                  {sortConfig?.key === column.column.accessorKey &&
                  !column.isGroupHeader
                    ? sortConfig?.direction === "ascending"
                      ? "🔼"
                      : sortConfig?.direction === "descending"
                      ? "🔽"
                      : null
                    : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-body">
          {rowModel.rows.map((row) => (
            <tr key={row.id} className="table-row">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.getValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="table-footer">
          {footerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.footer}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div style={{ marginTop: "10px" }}>
          Total entries: {table.getPaginationInfo()?.totalItems}
        </div>
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
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterTable;
