/** @common_types */

import { ReactNode } from "react";

// get nested keys of an object
export type DeepKeys<T> = T extends unknown[]
  ? never
  : T extends object
    ? {
        [K in keyof T]: K extends string
          ? T[K] extends object
            ? K | `${K}.${DeepKeys<T[K]>}`
            : K
          : never;
      }[keyof T]
    : never;

//string & auto complete type handler
export type HandleAutoComplete<T extends string> = T | Omit<string, T>;

/** @Columns_types */

/***** All the type related to @createColumnHelperFunction *****/

// group object structure
export interface GroupFn<T> extends accessorFn<T> {
  isGroupHeader?: boolean;
  columns: Array<accessorFn<T>>;
}

interface CellRenderingInfo<T> {
  // getValue: () => string | number | boolean | null | undefined;
  row: T;
  column: ColumnDef<T>;
}

// accessor function type
export type accessorFn<T> = {
  id: string | (() => string);
  cell?: (info: CellRenderingInfo<T>) => ReactNode;
  accessorKey?: DeepKeys<T>;
  header:
    | ((header?: HandleAutoComplete<DeepKeys<T>>) => ReactNode)
    | HandleAutoComplete<DeepKeys<T>>;
  footer?: () => ReactNode;
  sortable?: boolean;
};

//  crete column helper function return type
export type createColumnHelperFn<T> = {
  accessor: <TAccessorKeys extends DeepKeys<T>, TColumns extends accessorFn<T>>(
    accessor: TAccessorKeys,
    columns: TColumns
  ) => accessorFn<T>;
  group: (group: GroupFn<T>) => GroupFn<T>;
};

// table header group columnDef type
export type ColumnDef<T> = {
  id: string;
  header: string | (() => ReactNode);
  accessorKey?: DeepKeys<T>;
  columns?: ColumnDef<T>[];
  footer?: () => ReactNode;
  cell?: (info: {
    getValue: () => string | number | boolean | null | undefined;
    row: T;
  }) => React.ReactNode;
  sortable?: boolean;
  isGroupHeader?: boolean;
};

/// pagination info type
export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

// table header group type
export type HeaderGroup<T> = {
  id: string;
  depth: number;
  headers: Header<T>[];
};

// table header type
export type Header<T> = {
  id: string;
  depth: number;
  column: ColumnDef<T>;
  colSpan: number;
  rowSpan: number;
  header: React.ReactNode;
  isGroupHeader?: boolean;
  subHeaders: Header<T>[];
  footer?: React.ReactNode;
};

/** @Row_types */

// table cell type
export type Cell<T> = {
  id: string;
  column: {
    columnDef: ColumnDef<T>;
  };
  getValue: () => string | number | boolean | null | undefined;
  render: () => React.ReactNode;
};

// table row type
export type Row<T> = {
  id: string;
  getVisibleCells: () => Cell<T>[];
};

// table row model type
export type RowModel<T> = {
  rows: Row<T>[];
};

// filter criteria type
export type FilterCriteria<T> = {
  [K in DeepKeys<T>]?: string | number | boolean | FilterFunction;
};

// filter function type
export type FilterFunction = (value: unknown) => boolean;

/** @Table_types */

// table options type
export type TableOptions<T> = {
  data: T[];
  columns: Array<accessorFn<T> | GroupFn<T>> | myColumns[];
  sorting?: {
    key: DeepKeys<T>;
    direction: "ascending" | "descending" | "none";
  } | null;
  globalFilter?: string;
  columnFilter?: FilterCriteria<T> | undefined;
  pagination?: {
    page: number;
    pageSize: number;
  };
};

// table return type
export type Table<T> = {
  getHeaderGroup: () => HeaderGroup<T>[];
  getRowModel: () => RowModel<T>;
  getPaginationInfo: () => PaginationInfo | null;
  getFooterGroup: () => HeaderGroup<T>[];
};

export interface customColumns<T> extends Omit<ColumnDef<T>, "cell"> {
  cell?: (info: CellRenderingInfo<T>) => ReactNode;
}

export interface myColumns {
  id: string;
  header: string | (() => ReactNode);
  accessorKey?: string;
  columns?: myColumns[];
  footer?: () => ReactNode;
  sortable?: boolean;
  isGroupHeader?: boolean;
}
