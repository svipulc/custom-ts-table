interface TableHeaderProps extends React.ComponentProps<"div"> {}

function TableHeader(props: TableHeaderProps) {
  return <th className="table-header">{props.children}</th>;
}

export default TableHeader;
