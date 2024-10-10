import { useEffect, useState } from "react";
import { accessorFn, DeepKeys, FilterCriteria } from "../types";
import { useTable } from "../hook/useTable";
import { TablePagination } from "./TablePagination";
import { TableHeader } from "./TableHeader";

interface DataTableProps<T> extends React.ComponentProps<"div"> {
  data: T[];
  columns: accessorFn<T>[];
  pagination?: boolean;
  pageSize?: number;
  sorting?: boolean;
  pageIndex?: number;
  // onPageChange?: boolean;
  globalFilter?: boolean;
  columnsFilter?: FilterCriteria<T>;
}

export function DataTable<T>({
  data,
  columns,
  pagination,
  pageSize,
  pageIndex,
  globalFilter,
  sorting,
  // onPageChange,
  className,
  columnsFilter,
  ...props
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(pageIndex || 1);
  const [pageSizes, setPageSizes] = useState(pageSize || 4);
  const [updateGlobalFilter, setUpdateGlobalFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: DeepKeys<T>;
    direction: "ascending" | "descending" | "none";
  } | null>(null);
  const [filters, setFilters] = useState<FilterCriteria<T>>(columnsFilter || {});
  const requestSort = (key: DeepKeys<T>) => {
    let direction: "ascending" | "descending" | "none" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };
  const table = useTable({
    data: data,
    columns: columns,
    sorting: sortConfig,
    globalFilter: updateGlobalFilter,
    columnFilter: filters,
    pagination: {
      page: currentPage,
      pageSize: pageSizes || 4,
    },
  });
  const headerGroups = table.getHeaderGroup();
  const rowModel = table.getRowModel();
  const footerGroups = table.getFooterGroup();
  const paginationInfo = table.getPaginationInfo();
  useEffect(() => {
    setFilters(columnsFilter || {});
  }, [columnsFilter]);

  useEffect(() => {
    if (updateGlobalFilter) {
      setCurrentPage(pageIndex || 1);
    }
  }, [pageIndex, updateGlobalFilter]);

  return (
    <div className={`table-container ${className}`} {...props}>
      <div className="table-search-container">
        {globalFilter && (
          <div>
            <input
              type="text"
              value={updateGlobalFilter}
              onChange={e => setUpdateGlobalFilter(e.target.value)}
              placeholder="Search in all columns..."
            />
          </div>
        )}

        {columnsFilter && (
          <div className="table-filter-container">
            {Object.keys(columnsFilter).map(key => (
              <div key={key}>
                {/* <label htmlFor={key}>{key}:</label> */}
                <input
                  type="text"
                  id={key}
                  placeholder={`Filter by ${key}`}
                  // value={filters[key as keyof typeof filters]}
                  onChange={e =>
                    setFilters({
                      ...filters,
                      [key]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <table className="table">
        <TableHeader
          headerGroups={headerGroups}
          sortConfig={sortConfig}
          sorting={sorting}
          requestSort={requestSort}
        />
        <tbody className="table-body">
          {rowModel.rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{cell.render()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="table-footer">
          {footerGroups.map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(footer => (
                <td key={footer.id} colSpan={footer.colSpan} rowSpan={footer.rowSpan}>
                  {footer.isGroupHeader ? footer.header : null}
                  {footer.footer}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      {pagination && (
        <TablePagination
          currentPage={paginationInfo?.currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={paginationInfo?.totalPages}
          totalItems={paginationInfo?.totalItems}
          pageSize={pageSizes}
          setPageSize={setPageSizes}
        />
      )}
    </div>
  );
}
