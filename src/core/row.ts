// utility folder

import { Cell, ColumnDef, DeepKeys, FilterCriteria, FilterFunction, Row, RowModel } from "../types";

// function to get the value of a path in an object
export function GetRowValue<T>(path: DeepKeys<T>, rowObj: T) {
  const pathArray = path.split(".");
  let value = rowObj;
  for (const key of pathArray) {
    if (value && value.hasOwnProperty.call(value, key)) {
      value = value[key as keyof typeof value] as T;
    } else {
      return undefined;
    }
  }
  return value as string | number | boolean | null | undefined;
}

// Create row model function
export function createRowModel<T>(processedData: T[], flatColumns: ColumnDef<T>[]): RowModel<T> {
  return {
    rows: processedData.map(
      (rowData, index1): Row<T> => ({
        id: `${index1}`,
        getVisibleCells: (): Cell<T>[] =>
          flatColumns.map((column, index2): Cell<T> => {
            const getValue = () => GetRowValue(column.accessorKey as DeepKeys<T>, rowData);
            return {
              id: `${index1}_${index2}`,
              column: {
                columnDef: column,
              },
              getValue,
              render: () => {
                if (column.cell) {
                  return column.cell({ getValue, row: rowData });
                }
                return getValue();
              },
            };
          }),
      })
    ),
  };
}

// sort data function
export const sortData = <T>(
  data: T[],
  key: DeepKeys<T>,
  direction: "ascending" | "descending" | "none"
) => {
  if (direction === "none") {
    return data;
  }

  return data.sort((a, b) => {
    const aValue = GetRowValue(key, a);
    const bValue = GetRowValue(key, b);
    if (aValue === undefined || bValue === undefined || aValue === null || bValue === null) {
      return 0;
    }
    if (aValue < bValue) {
      return direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
};

// Apply global filters function
function applyGlobalFilter<T>(data: T[], globalFilter: string, columns: ColumnDef<T>[]): T[] {
  const lowercasedFilter = globalFilter.toLowerCase().trim();

  function checkValue(value: unknown): boolean {
    if (value == null) return false;

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return String(value).toLowerCase().includes(lowercasedFilter);
    }

    if (typeof value === "object") {
      return Object.values(value).some(checkValue);
    }

    return false;
  }

  function checkColumn(column: ColumnDef<T>, item: T): boolean {
    if (column.isGroupHeader && column.columns) {
      return column.columns.some(subColumn => checkColumn(subColumn, item));
    }

    if (column.accessorKey) {
      const value = GetRowValue(column.accessorKey as DeepKeys<T>, item);
      return checkValue(value);
    }

    return false;
  }

  return data.filter(item => columns.some(column => checkColumn(column, item)));
}

// column filter data function
function applyColumnFilters<T>(data: T[], columnFilters: FilterCriteria<T>): T[] {
  return data.filter(item => {
    return Object.entries(columnFilters).every(([key, value]) => {
      const itemValue = GetRowValue(key as DeepKeys<T>, item);

      if (typeof value === "function") {
        return (value as FilterFunction)(
          typeof itemValue === "string" ? itemValue.toLowerCase() : itemValue
        );
      }

      const stringValue = String(value).toLowerCase();

      if (typeof itemValue === "object" && itemValue !== null) {
        // Handle nested objects
        return Object.values(itemValue).some(nestedValue =>
          String(nestedValue).toLowerCase().includes(stringValue)
        );
      }

      // Handle primitive values
      return String(itemValue).toLowerCase().includes(stringValue);
    });
  });
}

// apply filters function
export function applyFilters<T>(
  data: T[],
  globalFilter: string | undefined,
  columnFilters: FilterCriteria<T> | undefined,
  columns: ColumnDef<T>[]
): T[] {
  let result = data;
  if (globalFilter) {
    result = applyGlobalFilter(result, globalFilter, columns);
  }

  if (columnFilters) {
    result = applyColumnFilters(result, columnFilters);
  }
  return result;
}
