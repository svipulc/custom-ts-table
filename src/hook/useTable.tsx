import { useMemo } from "react";
import { createHeaderGroups, flattenColumns } from "../core/columns";
import { createRowModel, sortData } from "../core/row";
import { ColumnDef, Table, TableOptions } from "../types";
import { applyFilters } from "../core/row";

// create table
export function useTable<T>(Options: TableOptions<T>): Table<T> {
  const flatColumns = flattenColumns(Options.columns as ColumnDef<T>[]);
  // Apply sorting, filtering, and pagination
  const processedData = useMemo(() => {
    let result = [...Options.data];

    // Apply filtering
    if (Options.columnFilter || Options.globalFilter) {
      result = applyFilters(result, Options.globalFilter, Options.columnFilter, flatColumns);
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
    Options.pagination,
    Options.globalFilter,
    Options.columnFilter,
    flatColumns,
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
        const totalItems =
          Options.columnFilter || Options.globalFilter
            ? applyFilters(
                Options.data,
                Options.globalFilter,
                Options.columnFilter,
                Options.columns as ColumnDef<T>[]
              ).length
            : Options.data.length;
        const totalPages = Math.ceil(totalItems / Options.pagination.pageSize);

        // Ensure currentPage is within the valid range
        let currentPage = Math.min(Math.max(1, Options.pagination.page), totalPages);

        // Update currentPage if necessary
        if (currentPage > totalPages) {
          currentPage = totalPages;
        }

        return {
          currentPage,
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
