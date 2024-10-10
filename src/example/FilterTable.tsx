import React, { useEffect, useState } from "react";
import { createColumnHelper } from "../core/columns";
import { useTable } from "../hook/useTable";
import { employees } from "../data";
import { DeepKeys } from "../types";

// create column helper
const columnHelper = createColumnHelper<employees>();

// create columns
const columns = [
  columnHelper.accessor("id", {
    id: "1",
    header: "ID",
    footer: () => "ID",
  }),
  columnHelper.accessor("name", {
    id: "2",
    header: () => <a href="">Name</a>,
  }),
  columnHelper.accessor("salary", {
    id: "3",
    header: "Salary",
    sortable: true,
    cell(info) {
      if (info.row.salary > 70000) {
        return (
          <div style={{ backgroundColor: "lightgreen", color: "black" }}>{info.row.salary} 💰</div>
        );
      }
      return <div>{info.row.salary}</div>;
    },
  }),
  columnHelper.accessor("department", {
    id: "4",
    header: "Department",
  }),
  columnHelper.accessor("position", {
    id: "5",
    header: "Position",
    cell(info) {
      if (info.row.position === "Software Engineer") {
        return <div>{info.row.position} 🤓</div>;
      }
      return <div>{info.row.position}</div>;
    },
  }),
];

export const FilterTable = () => {
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
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };

  // create table
  const table = useTable({
    data: employees,
    columns: columns,
    sorting: sortConfig,
    columnFilter: {
      name: value => {
        return value.includes(filters.toLocaleLowerCase());
      },
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
  const currentPage1 = table.getPaginationInfo()?.currentPage!;

  useEffect(() => {
    setCurrentPage(currentPage1);
  }, [currentPage1]);
  return (
    <div className="table-container" style={{ marginBottom: "100px" }}>
      <div className="table-search-container">
        <label htmlFor="" style={{ marginRight: "20px", fontSize: "20px" }}>
          Filter Name
        </label>
        <input
          placeholder="Search name columns..."
          type="text"
          name="search"
          id="search"
          onChange={e => setFilters(e.target.value)}
        />
      </div>
      <table className="table">
        <thead className="table-header">
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  colSpan={column.colSpan}
                  rowSpan={column.rowSpan}
                  key={column.id}
                  onClick={() =>
                    column.column.sortable &&
                    requestSort(column.column.accessorKey as DeepKeys<employees>)
                  }
                  style={{
                    cursor: column.column.sortable && column.isGroupHeader ? "pointer" : "default",
                  }}
                >
                  {column.header}
                  {sortConfig?.key === column.column.accessorKey && !column.isGroupHeader
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
          {rowModel.rows.map(row => (
            <tr key={row.id} className="table-row">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{cell.render()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="table-footer">
          {footerGroups.map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{header.footer}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="table-pagination">
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="table-pagination-button"
          >
            &rsaquo;
          </button>
        </div>
        <div>Total entries: {table.getPaginationInfo()?.totalItems}</div>
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
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </div>
  );
};
