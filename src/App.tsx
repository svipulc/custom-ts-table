import DataTable from "./components/DataTable/DataTable";
import FilterTable from "./components/Example/FilterTable";
import HeaderGroup from "./components/Example/HeaderGroup";
import SimpleTable from "./components/Example/SimpleTable";
import SortHeaderTable from "./components/Example/SortHeaderTable";
import GlobalFilterTable from "./components/Example/GlobalFilterTable";
import { createColumnHelper } from "./core/columns/columns";
import { employees } from "./data";
import TestTable from "./components/Test Table/testTable";
import DynamicTable from "./components/Test Table/DynamicTable";

function App() {
  return (
    <div
      className="container"
      style={{
        height: "100%",
        margin: "0 20px 0 20px",
      }}
    >
      <h1>Custom Table Component</h1>

      <section>
        <h3>Simple Table</h3>
        <div>
          <SimpleTable />
        </div>

        <h3>Header Group</h3>
        <div>
          <HeaderGroup />
        </div>

        <h3>Sort Header Group</h3>
        <div>
          <SortHeaderTable />
        </div>

        <h3>Filter Table</h3>
        <div>
          <FilterTable />
        </div>

        <h3>Global filter</h3>
        <div>
          <GlobalFilterTable />
        </div>

        <h3>Custom Table Component</h3>
        <DataTable
          data={employees}
          columns={columns}
          globalFilter
          pagination
          columnsFilter={{}}
        />

        {/* <h3>Testing table</h3>
        <TestTable /> */}

        <h3>Dynamic Table</h3>
        <DynamicTable />
      </section>
    </div>
  );
}

export default App;

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
