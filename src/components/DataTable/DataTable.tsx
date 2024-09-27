import { useState } from "react";
import { accessorFn, DeepKeys } from "../../types/tableTypes";
import { useCreateCustomTable } from "../../core/table/table";
import TablePagination from "../Table/TablePagination";
import TableHeader from "../Table/TableHeader";

interface DataTableProps<T> extends React.ComponentProps<"div"> {
  data: T[];
  columns: accessorFn<T>[];
  pagination?: boolean;
  pageSize?: number;
  sorting?: boolean;
  pageIndex?: number;
  onPageChange?: boolean;
  globalFilter?: boolean;
}

function DataTable<T>({
  data,
  columns,
  pagination,
  pageSize,
  pageIndex,
  globalFilter,
  sorting,
  onPageChange,
  className,
  ...props
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(pageIndex || 1);
  const [pageSizes, setPageSizes] = useState(pageSize || 4);
  const [updateGlobalFilter, setUpdateGlobalFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: DeepKeys<T>;
    direction: "ascending" | "descending" | "none";
  } | null>(null);

  const requestSort = (key: DeepKeys<T>) => {
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

  const table = useCreateCustomTable({
    data: data,
    columns: columns,
    sorting: sortConfig,
    globalFilter: updateGlobalFilter,
    pagination: {
      page: currentPage,
      pageSize: pageSizes || 4,
    },
  });
  const headerGroups = table.getHeaderGroup();
  const rowModel = table.getRowModel();
  const footerGroups = table.getFooterGroup();
  const paginationInfo = table.getPaginationInfo();

  return (
    <div className={`dataTable-container ${className}`} {...props}>
      {globalFilter && (
        <div>
          <input
            type="text"
            value={updateGlobalFilter}
            onChange={(e) => setUpdateGlobalFilter(e.target.value)}
            placeholder="Search in all columns..."
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          />
        </div>
      )}

      <table className="dataTable">
        <TableHeader
          headerGroups={headerGroups}
          sortConfig={sortConfig}
          sorting={sorting}
          requestSort={requestSort}
        />
        <tbody className="dataTable-body">
          {rowModel.rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.render()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="dataTable-footer">
          {footerGroups.map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <td
                  key={footer.id}
                  colSpan={footer.colSpan}
                  rowSpan={footer.rowSpan}
                >
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

export default DataTable;
