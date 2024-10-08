import { createColumnHelper } from "../core/columns";
import { useTable } from "../hook/useTable";
import { employees } from "../data";

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
    footer: () => "Name",
  }),
  columnHelper.accessor("salary", {
    id: "3",
    header: "Salary",
    footer: () => "Salary",
  }),
  columnHelper.accessor("department", {
    id: "4",
    header: "Department",
    footer: () => "Department",
  }),
  columnHelper.accessor("position", {
    id: "5",
    header: "Position",
    footer: () => "Position",
  }),
  columnHelper.group({
    id: "6",
    header: "Address",
    columns: [
      columnHelper.accessor("address.city", {
        id: "7",
        header: "City",
        footer: () => "City",
      }),
      columnHelper.accessor("address.country", {
        id: "8",
        header: "Country",
        footer: () => "Country",
      }),
      columnHelper.accessor("address.zipcode", {
        id: "9",
        header: "Zipcode",
        footer: () => "Zipcode",
      }),
    ],
  }),
];

const HeaderGroup = () => {
  // create table
  const table = useTable({
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
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan} rowSpan={header.rowSpan}>
                  {header.header}
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
              {footerGroup.headers.map(header => (
                <>
                  {header.colSpan <= 1 && (
                    <th key={header.id} colSpan={header.colSpan} rowSpan={header.rowSpan}>
                      {header.footer}
                    </th>
                  )}
                </>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default HeaderGroup;
