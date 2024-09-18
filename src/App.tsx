import { ReactNode, useState } from "react";
import DataTable from "./components/DataTable/DataTable";
import { User } from "./core/general";
import { createColumnHelper, useCreateCustomTable } from "./core/columns";
import TestTable from "./components/Test Table/testTable";

const columnHelper = createColumnHelper<User>();

const columnGroup = columnHelper.group({
  id: () => "address",
  header: () => {
    return <div>Address</div>;
  },
  columns: [
    columnHelper.accessor("address.city", {
      id: () => "address.city",
      header: "",
      cell: (row) => {
        return row.address.city;
      },
      footer: () => "City",
    }),
    columnHelper.accessor("address.country", {
      id: () => "address.country",
      header: () => "Street",
      cell: (row) => {
        return row.address.country;
      },
      footer: () => "Street",
    }),
    columnHelper.accessor("address.postalCode", {
      id: () => "address.postalCode",
      header: () => "PostalCode",
      cell: (row) => {
        return row.address.postalCode;
      },
      footer: () => "PostalCode",
    }),
  ],
});

const columns = [
  columnHelper.group({
    id: () => "Group",
    header: () => <p style={{ textAlign: "center" }}>Group</p>,
    columns: [
      columnHelper.accessor("id", {
        id: () => "id",
        header: "ID",
        footer: () => "ID",
      }),
      columnHelper.accessor("name", {
        id: () => "name2",
        header: "NAME",
        sortable: true,
      }),
    ],
  }),
  columnHelper.group({
    id: () => "address",
    header: () => <p>Address</p>,
    columns: [
      columnHelper.accessor("address.city", {
        id: () => "address.city",
        header: "ADDRESS.CITY",
        cell: (row) => {
          return row.address.city;
        },
        footer: () => "City",
      }),
      columnHelper.group({
        id: () => "address.country",
        header: () => <p>second group</p>,
        columns: [
          columnHelper.accessor("address.country", {
            id: () => "country",
            header: () => <p>second City</p>,
          }),
          columnHelper.accessor("address.postalCode", {
            id: () => "postalCode",
            header: () => <p>second Postal code</p>,
          }),
        ],
      }),
    ],
  }),
  columnHelper.accessor("id", {
    id: () => "id",
    header: "ID",
    // cell: (row) => row.id,
    // footer: () => "Id",
  }),
  columnHelper.accessor("name", {
    id: () => "name",
    header: () => "Name",
    // footer: () => "Name",
  }),
  columnHelper.accessor("email", {
    id: () => "email",
    header: () => "Email",
    cell(row) {
      return row.email;
    },
    // footer: () => "Email",
  }),
  columnHelper.accessor("phone", {
    id: () => "phone",
    header: () => "Phone",
    // footer: () => "Phone",
  }),
  columnHelper.accessor("address.city", {
    id: () => "address.city",
    header: () => "City",
    cell(row) {
      return <button>{row.address.city}</button>;
    },
    // footer: () => "City",
  }),
  columnHelper.accessor("Extract.Level1.Level2.Level3", {
    id() {
      return "2";
    },
    header: () => "Level 3",
    cell(row) {
      return row.Extract.Level1.Level2.Level3;
    },
    // footer: () => "Level 3",
  }),
];

type address = {
  id: number;
  address: {
    city: string;
    country: string;
    postalCode: string;
  };
};
const addressData = [
  {
    id: 1,
    address: { city: "New York", country: "USA", postalCode: "10001" },
  },
  {
    id: 2,
    address: { city: "London", country: "UK", postalCode: "SW1A 1AA" },
  },
];

const data: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: {
      city: "New York",
      country: "USA",
      postalCode: "10001",
    },
    avatar: "https://example.com/avatar.jpg",
    Extract: {
      Level1: {
        Level2: {
          Level3: "Hello level 3 1",
        },
      },
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    address: {
      city: "London",
      country: "UK",
      postalCode: "SW1A 1AA",
    },
    avatar: "https://example.com/avatar.jpg",
    Extract: {
      Level1: {
        Level2: {
          Level3: "Hello level 3 2",
        },
      },
    },
  },
];

function App() {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "ascending" | "descending";
  } | null>(null);

  const requestSort = (key: keyof User) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const table = useCreateCustomTable({
    data: data,
    columns: columns,
    sorting: sortConfig,
  });

  return (
    <>
      <DataTable<User>>
        <div className="table-container">
          <table className="table">
            <thead>
              {/* {table.getHeaderGroup().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      rowSpan={header.rowSpan}
                    >
                      {typeof header.column.header != "function"
                        ? header.column.header
                        : header.column.header()}
                    </th>
                  ))}
                </tr>
              ))} */}
              {table.getHeaderGroup().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      colSpan={column.colSpan}
                      rowSpan={column.rowSpan}
                      key={column.id}
                      onClick={() =>
                        column.column.sortable &&
                        requestSort(column.column.accessorKey as keyof User)
                      }
                      style={{
                        cursor: column.column.sortable ? "pointer" : "default",
                      }}
                    >
                      {column.header}
                      {sortConfig?.key === column.column.accessorKey
                        ? sortConfig?.direction === "ascending"
                          ? " 🔼"
                          : " 🔽"
                        : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell.getContext().getValue()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {/* <tr>
                {table.getHeaderGroup().map((column) => (
                  <>
                    {column.headers.map((header) => (
                      <td key={header.id}>
                        {header.column.footer && header.column.footer()}
                      </td>
                    ))}
                  </>
                ))}
              </tr> */}
            </tfoot>
          </table>
        </div>
      </DataTable>
      <TestTable />
    </>
  );
}

export default App;
