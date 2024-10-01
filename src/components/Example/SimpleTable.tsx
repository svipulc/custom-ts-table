import { employees } from "../../data";
import { createColumnHelper } from "../../core/columns/columns";
import { useCreateCustomTable } from "../../core/table/table";

/**
 *
 * @Info
 * In this example we are creating a table of  1D array of object data
 *
 */

// create column helper
const columnHelper = createColumnHelper<employees>();

// create columns
const columns = [
  columnHelper.accessor("id", {
    id: "1",
    header: "ID",
    footer: () => "ID",
  }),
  columnHelper.accessor("name", {
    id: "2",
    header: () => <a href="">Name</a>,
  }),
  columnHelper.accessor("salary", {
    id: "3",
    header: "Salary",
  }),
  columnHelper.accessor("department", {
    id: "4",
    header: "Department",
  }),
  columnHelper.accessor("position", {
    id: "5",
    header: "Position",
  }),
];

const SimpleTable = () => {
  // create table
  const table = useCreateCustomTable({
    data: employees.slice(0, 5),
    columns: columns,
  });
  // get header group
  const headerGroups = table.getHeaderGroup();
  // get row model
  const rowModel = table.getRowModel();
  // get footer group
  const footerGroups = table.getFooterGroup();

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-body">
          {rowModel.rows.map((row) => (
            <tr key={row.id} className="table-row">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.render()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="table-footer">
          {footerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{header.footer}</th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default SimpleTable;
