import { useMemo } from "react";
import { createHeaderGroups, flattenColumns } from "../columns/columns";
import { createRowModel, filterData, sortData } from "../row/row";
import { ColumnDef, Table, TableOptions } from "../../types/tableTypes";

// create table function  --- remove
export function useCreateCustomTable<T>(Options: TableOptions<T>): Table<T> {
  const flatColumns = flattenColumns(Options.columns as ColumnDef<T>[]);

  // Apply sorting, filtering, and pagination
  const processedData = useMemo(() => {
    let result = [...Options.data];

    // Apply filtering
    if (Options.filterCriteria) {
      result = filterData(result, Options.filterCriteria);
    }

    // Apply sorting
    if (Options.sorting) {
      result = sortData(result, Options.sorting.key, Options.sorting.direction);
    }

    // Apply pagination
    if (Options.pagination) {
      const { page, pageSize } = Options.pagination;
      const startIndex = (page - 1) * pageSize;
      result = result.slice(startIndex, startIndex + pageSize);
    }

    return result;
  }, [
    Options.data,
    Options.sorting,
    Options.filterCriteria,
    Options.pagination,
  ]);

  return {
    getHeaderGroup: () => {
      return createHeaderGroups(Options.columns);
    },
    getRowModel: () => {
      return createRowModel(processedData, flatColumns);
    },
    getPaginationInfo: () => {
      if (Options.pagination) {
        const totalItems = Options.filterCriteria
          ? filterData(Options.data, Options.filterCriteria).length
          : Options.data.length;
        const totalPages = Math.ceil(totalItems / Options.pagination.pageSize);
        return {
          currentPage: Options.pagination.page,
          totalPages,
          pageSize: Options.pagination.pageSize,
          totalItems,
        };
      }
      return null;
    },
    getFooterGroup: () => {
      return createHeaderGroups(Options.columns);
    },
  };
}
