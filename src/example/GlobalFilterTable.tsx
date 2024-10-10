import React, { useState, useEffect } from "react";
import { createColumnHelper } from "../core/columns";
import { useTable } from "../hook/useTable";
import { employees } from "../data";
import { DeepKeys } from "../types";

type Filters = Partial<Record<DeepKeys<employees>, string>>;

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
    footer: () => "Name",
  }),
  columnHelper.accessor("salary", {
    id: "3",
    header: "Salary",
    footer: () => "Salary",
  }),
  columnHelper.accessor("department", {
    id: "4",
    header: "Department",
    footer: () => "Department",
  }),
  columnHelper.accessor("position", {
    id: "5",
    header: "Position",
    footer: () => "Position",
  }),
  columnHelper.group({
    id: "6",
    header: "Address",
    columns: [
      columnHelper.accessor("address.city", {
        id: "7",
        header: "City",
        footer: () => "City",
      }),
      columnHelper.accessor("address.country", {
        id: "8",
        header: "Country",
        footer: () => "Country",
      }),
      columnHelper.accessor("address.zipcode", {
        id: "9",
        header: "Zipcode",
        footer: () => "Zipcode",
      }),
    ],
  }),
];

export const GlobalFilterTable: React.FC = () => {
  const [sorting, setSorting] = useState<{
    key: DeepKeys<employees>;
    direction: "ascending" | "descending" | "none";
  } | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const requestSort = (key: DeepKeys<employees>) => {
    let direction: "ascending" | "descending" | "none" = "ascending";
    if (sorting && sorting.key === key && sorting.direction === "ascending") {
      direction = "descending";
    }
    if (sorting && sorting.key === key && sorting.direction === "descending") {
      direction = "none";
    }
    setSorting({ key, direction });
  };

  const table = useTable({
    data: employees,
    columns: columns,
    sorting: sorting,
    globalFilter: globalFilter,
    columnFilter: {
      // department: value => {
      //   return value === "it";
      // },
      // salary: value => {
      //   return value > 70000;
      // },
    },
    // columnFilter: filters,
    pagination: {
      page: currentPage,
      pageSize: pageSize,
    },
  });

  const headerGroups = table.getHeaderGroup();
  const rows = table.getRowModel();
  const totalPages = table.getPaginationInfo()?.totalPages!;
  const currentPage1 = table.getPaginationInfo()?.currentPage!;

  useEffect(() => {
    setCurrentPage(currentPage1);
  }, [currentPage1]);

  return (
    <div>
      <div className="table-search-container">
        <input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <input
          placeholder="Search name columns..."
          value={filters.name}
          onChange={e => setFilters({ ...filters, name: e.target.value })}
          className="max-w-sm"
        />
        <input
          placeholder="Search salary columns..."
          value={filters.salary}
          onChange={e => setFilters({ ...filters, salary: e.target.value })}
          className="max-w-sm"
        />
        <input
          placeholder="Search city columns..."
          onChange={e => setFilters({ ...filters, "address.city": e.target.value })}
          className="max-w-sm"
        />
      </div>
      <div className="table-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
                      cursor:
                        column.column.sortable && column.isGroupHeader ? "pointer" : "default",
                    }}
                  >
                    {column.header}
                    {sorting?.key === column.column.accessorKey && !column.isGroupHeader
                      ? sorting?.direction === "ascending"
                        ? "🔼"
                        : sorting?.direction === "descending"
                          ? "🔽"
                          : null
                      : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.rows.map(row => (
              <tr key={row.id} className="table-row">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {cell.render()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-pagination">
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="table---pagination-button"
          >
            &lsaquo;
          </button>
          <span style={{ margin: "0 10px" }}>
            {currentPage1} of {totalPages}
          </span>
          <button
            className="table---pagination-button"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
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
