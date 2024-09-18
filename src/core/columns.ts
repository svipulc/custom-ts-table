import { ReactNode, useMemo } from "react";
import { DeepKeys, HandleAutoComplete } from "./general";

/**   @Version 1.2.0  ***********************************************/

//  crete column helper function return type
type createColumnHelper<T> = {
  accessor: <TAccessorKeys extends DeepKeys<T>, TColumns extends accessorFn<T>>(
    accessor: TAccessorKeys,
    columns: TColumns
  ) => accessorFn<T>;
  group: (group: GroupFn<T>) => GroupFn<T>;
};

// group object structure
interface GroupFn<T> extends accessorFn<T> {
  columns: Array<accessorFn<T>>;
}

// accessor function type
export type accessorFn<T> = {
  id: string | (() => string);
  cell?: (row: T) => ReactNode;
  accessorKey?: keyof T;
  header?:
    | ((header?: HandleAutoComplete<DeepKeys<T>>) => ReactNode)
    | HandleAutoComplete<DeepKeys<T>>;
  footer?: () => ReactNode;
  sortable?: boolean;
};

// create column helper function
export function createColumnHelper<T>(): createColumnHelper<T> {
  return {
    accessor: (accessor, columns): accessorFn<T> => {
      return {
        id: columns.id,
        cell: (row) =>
          columns.cell
            ? columns.cell(row)
            : (GetRowValue(accessor, row as object) as ReactNode),
        header: columns.header,
        accessorKey: accessor as keyof T,
        footer: columns.footer,
        sortable: columns.sortable ? columns.sortable : false,
      };
    },
    group: (group): GroupFn<T> => {
      return {
        id: group.id,
        header: group.header,
        columns: group.columns.map((column) => {
          return column;
        }),
      };
    },
  };
}

// table options type
type TableOptions<T> = {
  data: T[];
  columns: Array<accessorFn<T> | GroupFn<T>>;
  sorting?: { key: keyof T; direction: "ascending" | "descending" } | null;
};

// table return type
type Table<T> = {
  getHeaderGroup: () => HeaderGroup<T>[];
  getRowModel: () => RowModel<T>;
};

function flattenColumns<T>(columns: ColumnDef<T>[]): ColumnDef<T>[] {
  return columns.reduce((acc, column) => {
    if (column.columns) {
      return [...acc, ...flattenColumns(column.columns)];
    }
    return [...acc, column];
  }, [] as ColumnDef<T>[]);
}

// create table function
export function useCreateCustomTable<T>(Options: TableOptions<T>): Table<T> {
  const flatColumns = flattenColumns(Options.columns as ColumnDef<T>[]);

  // Function to sort data based on key and direction
  const sortData = (
    data: T[],
    key: keyof T,
    direction: "ascending" | "descending"
  ) => {
    return data.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedData = useMemo(() => {
    if (Options.sorting) {
      return sortData(
        [...Options.data],
        Options.sorting.key,
        Options.sorting.direction
      );
    }
    return Options.data;
  }, [Options.data, Options.sorting]);

  return {
    getHeaderGroup: () => {
      return createHeaderGroups(Options.columns);
    },
    getRowModel: () => {
      return {
        rows: sortedData.map(
          (rowData, index1): Row<T> => ({
            id: `${index1}`,
            getVisibleCells: (): Cell<T>[] =>
              flatColumns.map(
                (column, index2): Cell<T> => ({
                  id: `${index1}_${index2}`,
                  column: {
                    columnDef: column as ColumnDef<T>,
                  },
                  getContext: () => ({
                    getValue: () =>
                      GetRowValue(
                        column.accessorKey as string,
                        rowData as object
                      ) as ReactNode,
                  }),
                })
              ),
          })
        ),
      };
    },
  };
}

type Cell<T> = {
  id: string;
  column: {
    columnDef: ColumnDef<T>;
  };
  getContext: () => {
    getValue: () => ReactNode;
  };
};

type Row<T> = {
  id: string;
  getVisibleCells: () => Cell<T>[];
};

type RowModel<T> = {
  rows: Row<T>[];
};

export type ColumnDef<T> = {
  id: string;
  header: string | (() => ReactNode);
  accessorKey?: keyof T;
  columns?: ColumnDef<T>[];
  footer?: () => ReactNode;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
};

type HeaderGroup<T> = {
  id: string;
  depth: number;
  headers: Header<T>[];
};

type Header<T> = {
  id: string;
  depth: number;
  column: ColumnDef<T>;
  colSpan: number;
  rowSpan: number;
  header: React.ReactNode;
  subHeaders: Header<T>[];
};

// Utility function to get leaf columns
export function getLeafColumns<T>(columns: ColumnDef<T>[]): ColumnDef<T>[] {
  return columns.flatMap((column) =>
    column.columns ? getLeafColumns(column.columns) : [column]
  );
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
      rowSpan: 1,
      header:
        typeof column.header === "function" ? column.header() : column.header,
      subHeaders: [],
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

function getMaxDepth<T>(columns: ColumnDef<T>[], depth = 0): number {
  let maxDepth = depth;
  columns.forEach((column) => {
    if (column.columns) {
      const subDepth = getMaxDepth(column.columns, depth + 1);
      maxDepth = Math.max(maxDepth, subDepth);
    }
  });
  return maxDepth;
}

type GetRowValueFn<T> = {};

export function GetRowValue<
  TPath extends string,
  TRow extends { [key: string]: any }
>(Path: TPath, row: TRow) {
  const PathArray = Path.split(".");
  return PathArray.reduce((accumulator, key) => {
    // Check if the key exists in the current accumulator
    if (accumulator && key in accumulator) {
      return accumulator[key]; // Move to the next level
    }
  }, row); // Start with the original object
}
