interface TableRowProps extends React.ComponentProps<"div"> {}

function TableRow(props: TableRowProps) {
  return <tr className="table-row">{props.children}</tr>;
}

export default TableRow;
