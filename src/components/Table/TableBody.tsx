interface TableBodyProps<T> extends React.ComponentProps<"div"> {
  data?: T[];
  //   columns: Column<T>[];
}

function TableBody<T>(props: TableBodyProps<T>) {
  return <tbody>{props.children}</tbody>;
}

export default TableBody;
