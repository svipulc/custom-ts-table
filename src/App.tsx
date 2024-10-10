/** @delete this file app.tsx */

import { DataTable } from "./components/DataTable";
import { createColumnHelper } from "./core/columns";
import { employees } from "./data";
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
    header: "Name",
    footer: () => "Name",
    sortable: true,
  }),
  columnHelper.accessor("salary", {
    id: "3",
    header: "Salary",
    footer: () => "Salary",
    sortable: true,
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

function App() {
  return (
    <div
      className="container"
      style={{
        height: "100%",
        margin: "0 20px 0 20px",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Custom Table Component</h1>

      <section>
        <DataTable
          data={employees}
          columns={columns}
          globalFilter
          pagination
          columnsFilter={{
            salary: "",
            position: "",
          }}
          sorting
        />
      </section>
    </div>
  );
}

export default App;
