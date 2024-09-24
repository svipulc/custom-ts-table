import { ReactNode } from "react";
import {
  Cell,
  ColumnDef,
  DeepKeys,
  FilterCriteria,
  FilterFunction,
  Row,
  RowModel,
} from "../../types/tableTypes";

// function to get the value of a path in an object
export function GetRowValue<T>(path: DeepKeys<T>, rowObj: T) {
  const pathArray = path.split(".");
  let value = rowObj;
  for (const key of pathArray) {
    if (value && value.hasOwnProperty(key)) {
      value = value[key as keyof typeof value] as T;
    } else {
      return undefined;
    }
  }
  return value as ReactNode;
}

// create row model function
export function createRowModel<T>(
  processedData: T[],
  flatColumns: ColumnDef<T>[]
): RowModel<T> {
  return {
    rows: processedData.map(
      (rowData, index1): Row<T> => ({
        id: `${index1}`,
        getVisibleCells: (): Cell<T>[] =>
          flatColumns.map(
            (column, index2): Cell<T> => ({
              id: `${index1}_${index2}`,
              column: {
                columnDef: column,
              },
              getValue: () =>
                GetRowValue(column.accessorKey as DeepKeys<T>, rowData),
            })
          ),
      })
    ),
  };
}

// function to filter data based on filter criteria
export const filterData = <T>(data: T[], filterCriteria: FilterCriteria<T>) => {
  return data.filter((item) => {
    return Object.entries(filterCriteria).every(([key, value]) => {
      const itemValue = GetRowValue(key as DeepKeys<T>, item);

      // if (typeof value === "function") {
      //   return (value as FilterFunction)(itemValue);
      // }
      if (typeof value === "function") {
        return (value as FilterFunction)(
          typeof itemValue === "string" ? itemValue.toLowerCase() : itemValue
        );
      }

      const stringValue = String(value).toLowerCase();

      if (typeof itemValue === "object" && itemValue !== null) {
        // Handle nested objects
        return Object.values(itemValue).some((nestedValue) =>
          String(nestedValue).toLowerCase().includes(stringValue)
        );
      }

      // Handle primitive values
      return String(itemValue).toLowerCase().includes(stringValue);
    });
  });
};

//
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
    if (
      aValue === undefined ||
      bValue === undefined ||
      aValue === null ||
      bValue === null
    ) {
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
