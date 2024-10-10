import React, { useEffect, useState } from "react";
import { createColumnHelper } from "../core/columns";
import { useTable } from "../hook/useTable";
import { DeepKeys } from "../types";

export interface ResponseData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
}

const columnHelper = createColumnHelper<ResponseData>();
const columns = [
  columnHelper.accessor("id", {
    id: "1",
    header: "ID",
    footer: () => "ID",
  }),
  columnHelper.accessor("title", {
    id: "2",
    header: () => <a href="">Title</a>,
    footer: () => "Title",
  }),
  columnHelper.accessor("description", {
    id: "3",
    header: "Description",
    footer: () => "Description",
  }),
  columnHelper.accessor("category", {
    id: "4",
    header: "Category",
    footer: () => "Category",
  }),
  columnHelper.accessor("price", {
    id: "5",
    header: "Price",
    footer: () => "Price",
    sortable: true,
  }),
  columnHelper.accessor("discountPercentage", {
    id: "6",
    header: "Discount Percentage",
    footer: () => "Discount Percentage",
  }),
  columnHelper.group({
    id: "7",
    header: "Rating",
    columns: [
      columnHelper.accessor("rating", {
        id: "8",
        header: "Rating",
        footer: () => "Rating",
      }),
      columnHelper.accessor("stock", {
        id: "9",
        header: "Stock",
        footer: () => "Stock",
        cell: info => {
          if (info.row.stock <= 10) return <span style={{ color: "red" }}>{info.row.stock}</span>;
          return info.row.stock;
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "10",
    header: "Dimentsion",
    columns: [
      columnHelper.accessor("dimensions.width", {
        id: "11",
        header: "Width",
      }),
      columnHelper.accessor("dimensions.height", {
        id: "12",
        header: "Height",
      }),
      columnHelper.accessor("dimensions.depth", {
        id: "13",
        header: "Depth",
      }),
    ],
  }),
];

export const DynamicTable = () => {
  const [ReData, setReData] = useState<ResponseData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");
  //   const [filters, setFilters] = useState<Filters>({});
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: DeepKeys<ResponseData>;
    direction: "ascending" | "descending" | "none";
  } | null>(null);

  const requestSort = (key: DeepKeys<ResponseData>) => {
    let direction: "ascending" | "descending" | "none" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "none";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=0&skip`)
      .then(response => response.json())
      .then(data => setReData(data.products));
  }, []);

  const table = useTable({
    data: ReData,
    columns: columns,
    sorting: sortConfig,
    globalFilter: globalFilter,
    columnFilter: {
      // stock: (value) => value < 10,
      // price: (value) => value < 20,
      // "dimensions.width": (value) => value <= 20,
      // tags: (value) => {
      //   for (let x in value) return value[x] == "fruits";
      //   return false;
      // },
    },
    pagination: {
      page: currentPage,
      pageSize: pageSize,
    },
  });

  // get header group
  const headerGroups = table.getHeaderGroup();
  // get row model
  const rowModel = table.getRowModel();
  // get footer group
  const footerGroups = table.getFooterGroup();

  const totalPages = table.getPaginationInfo()?.totalPages!;
  const currentPage1 = table.getPaginationInfo()?.currentPage!;

  return (
    <div className="table-container">
      <div className="table-search-container">
        <input
          type="text"
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <table className="table">
        <thead className="table-header">
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  colSpan={column.colSpan}
                  rowSpan={column.rowSpan}
                  key={column.id}
                  onClick={() =>
                    column.column.sortable &&
                    requestSort(column.column.accessorKey as DeepKeys<ResponseData>)
                  }
                  style={{
                    cursor: column.column.sortable && column.isGroupHeader ? "pointer" : "default",
                  }}
                >
                  {column.header}
                  {sortConfig?.key === column.column.accessorKey && !column.isGroupHeader
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
        <tbody className="table-body">
          {rowModel.rows.map(row => (
            <tr key={row.id} className="table-row">
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
      <div className="table-pagination">
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="lato-bold"
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            {currentPage1} of {totalPages}
          </span>
          <button
            className="lato-bold"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div>Total entries: {table.getPaginationInfo()?.totalItems}</div>
        <div>
          <button onClick={() => setPageSize(4)}>change pagesize 4</button>
        </div>
      </div>
    </div>
  );
};
