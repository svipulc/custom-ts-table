interface TableCellProps extends React.ComponentProps<"div"> {}

function TableCell(props: TableCellProps) {
  return <td className="table-cell">{props.children}</td>;
}

export default TableCell;
