interface TableProps<T> extends React.ComponentProps<"div"> {}

export default function Table<T>(props: TableProps<T>) {
  return <table className="table-container">{props.children}</table>;
}
