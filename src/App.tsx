import FilterTable from "./components/Example/FilterTable";
import HeaderGroup from "./components/Example/HeaderGroup";
import SimpleTable from "./components/Example/SimpleTable";
import SortHeaderTable from "./components/Example/SortHeaderTable";

function App() {
  return (
    <div
      className="container"
      style={{
        width: "100%",
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
        <div style={{ height: "100vh" }}>
          <FilterTable />
        </div>
      </section>
    </div>
  );
}

export default App;
