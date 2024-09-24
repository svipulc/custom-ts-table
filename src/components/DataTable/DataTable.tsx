// import Table from "../Table/Table";
// import TableBody from "../Table/TableBody";
// import TableCell from "../Table/TableCell";
// import TableHeader from "../Table/TableHeader";
// import TableRow from "../Table/TableRow";

import { ReactNode } from "react";
import { accessorFn } from "../../core/columns/columns";

interface DataTableProps<T> extends React.ComponentProps<"div"> {
  data?: T[];
  columns?: accessorFn<T>[] | T extends {
    header: string | ReactNode;
    accessorKey: keyof T;
  }
    ? T[]
    : never;
  pagination?: boolean;
  pageSize?: number;
  pageIndex?: number;
  onPageChange?: boolean;
}

function DataTable<T>(props: DataTableProps<T>) {
  return <div className="dataTable-container">{props.children}</div>;
}

export default DataTable;
