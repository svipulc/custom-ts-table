import { DeepKeys, HeaderGroup } from "../../types/tableTypes";

interface TableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
  sortConfig?: {
    key: DeepKeys<T>;
    direction: "ascending" | "descending" | "none";
  } | null;
  sorting?: boolean;
  requestSort: (key: DeepKeys<T>) => void;
}

function TableHeader<T>({
  headerGroups,
  sortConfig,
  sorting,
  requestSort,
  ...props
}: TableHeaderProps<T>) {
  if (sorting) {
    return (
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
                  requestSort(column.column.accessorKey as DeepKeys<T>)
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
    );
  }

  return (
    <thead className="dataTable-header">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              rowSpan={header.rowSpan}
            >
              {header.header}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export default TableHeader;
