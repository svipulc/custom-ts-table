import {
  accessorFn,
  ColumnDef,
  GroupFn,
  Header,
  HeaderGroup,
  type createColumnHelper,
} from "../../types/tableTypes";
import { GetRowValue } from "../row/row";

// create column helper function
export function createColumnHelper<T>(): createColumnHelper<T> {
  return {
    accessor: (accessor, columns): accessorFn<T> => {
      return {
        id: columns.id,
        // cell: (row) =>
        //   columns.cell ? columns.cell(row) : GetRowValue(accessor, row),
        cell: (info) => {
          if (columns.cell) {
            // Custom cell rendering
            return columns.cell({
              getValue: () => GetRowValue(accessor, info.row),
              row: info.row,
              column: columns as ColumnDef<T>,
            });
          } else {
            // Default cell rendering
            return GetRowValue(accessor, info.row);
          }
        },
        header: columns.header,
        accessorKey: accessor,
        footer: columns.footer,
        sortable: columns.sortable ? columns.sortable : false,
      };
    },
    group: (group): GroupFn<T> => {
      return {
        isGroupHeader: true,
        id: group.id,
        header: group.header,
        columns: group.columns.map((column) => {
          return column;
        }),
      };
    },
  };
}

// Utility function to get the maximum depth of a column
export function createHeaderGroups<T>(
  columns: Array<accessorFn<T> | GroupFn<T>>
): HeaderGroup<T>[] {
  const headerGroups: HeaderGroup<T>[] = [];
  const maxDepth = getMaxDepth(columns as ColumnDef<T>[]);

  function processColumn(column: ColumnDef<T>, depth: number): Header<T> {
    const header: Header<T> = {
      id: column.id,
      depth,
      column: column,
      colSpan: 1,
      isGroupHeader: column.isGroupHeader,
      rowSpan: 1,
      header:
        typeof column.header === "function" ? column.header() : column.header,
      subHeaders: [],
      footer: column.footer ? column.footer() : undefined,
    };

    if (column.columns) {
      header.subHeaders = column.columns.map((subColumn) =>
        processColumn(subColumn, depth + 1)
      );
      header.colSpan = header.subHeaders.reduce(
        (sum, subHeader) => sum + subHeader.colSpan,
        0
      );
    } else {
      header.rowSpan = maxDepth - depth + 1;
    }

    return header;
  }

  const allHeaders = columns.map((column) =>
    processColumn(column as ColumnDef<T>, 0)
  );

  for (let depth = 0; depth <= maxDepth; depth++) {
    const headerGroup: HeaderGroup<T> = {
      id: `header-group-${depth}`,
      depth,
      headers: [],
    };

    const addHeaders = (headers: Header<T>[]) => {
      headers.forEach((header) => {
        if (header.depth === depth) {
          headerGroup.headers.push(header);
        }
        addHeaders(header.subHeaders);
      });
    };

    addHeaders(allHeaders);
    headerGroups.push(headerGroup);
  }

  return headerGroups;
}

// Utility function to get the maximum depth of a column
export function getMaxDepth<T>(columns: ColumnDef<T>[], depth = 0): number {
  let maxDepth = depth;
  columns.forEach((column) => {
    if (column.columns) {
      const subDepth = getMaxDepth(column.columns, depth + 1);
      maxDepth = Math.max(maxDepth, subDepth);
    }
  });
  return maxDepth;
}

// Utility function to get the maximum depth of a column
export function flattenColumns<T>(columns: ColumnDef<T>[]): ColumnDef<T>[] {
  return columns.reduce((acc, column) => {
    if (column.columns) {
      return [...acc, ...flattenColumns(column.columns)];
    }
    return [...acc, column];
  }, [] as ColumnDef<T>[]);
}
