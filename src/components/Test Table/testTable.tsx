import { createColumnHelper } from "../../core/columns/columns";
import { useCreateCustomTable } from "../../core/table/table";

const employees: employees[] = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    department: "IT",
    salary: 80000,
    address: {
      city: "city1",
      country: "countery1",
      zipcode: "zipcode1",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Project Manager",
    department: "Operations",
    salary: 95000,
    address: {
      city: "city2",
      country: "countery2",
      zipcode: "zipcode1",
    },
  },
  {
    id: 3,
    name: "Emily Davis",
    position: "Data Analyst",
    department: "Marketing",
    salary: 70000,
    address: {
      city: "city3",
      country: "countery3",
      zipcode: "zipcode1",
    },
  },
  {
    id: 4,
    name: "Michael Brown",
    position: "UX Designer",
    department: "Design",
    salary: 85000,
    address: {
      city: "city4",
      country: "countery4",
      zipcode: "zipcode1",
    },
  },
  {
    id: 5,
    name: "Sarah Wilson",
    position: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
    address: {
      city: "city5",
      country: "countery5",
      zipcode: "zipcode1",
    },
  },
  {
    id: 6,
    name: "John Doe",
    position: "Software Engineer",
    department: "IT",
    salary: 80000,
    address: {
      city: "city1",
      country: "countery1",
      zipcode: "zipcode1",
    },
  },
  {
    id: 7,
    name: "Jane Smith",
    position: "Project Manager",
    department: "Operations",
    salary: 95000,
    address: {
      city: "city2",
      country: "countery2",
      zipcode: "zipcode1",
    },
  },
  {
    id: 8,
    name: "Emily Davis",
    position: "Data Analyst",
    department: "Marketing",
    salary: 70000,
    address: {
      city: "city3",
      country: "countery3",
      zipcode: "zipcode1",
    },
  },
  {
    id: 9,
    name: "Michael Brown",
    position: "UX Designer",
    department: "Design",
    salary: 85000,
    address: {
      city: "city4",
      country: "countery4",
      zipcode: "zipcode1",
    },
  },
  {
    id: 10,
    name: "Sarah Wilson",
    position: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
    address: {
      city: "city5",
      country: "countery5",
      zipcode: "zipcode1",
    },
  },
];
type employees = {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
  address: {
    city: string;
    country: string;
    zipcode: string;
  };
};

const columnHelper = createColumnHelper<employees>();

const columns = [
  columnHelper.accessor("id", {
    id: "1",
    header: "id",
    cell: (row) => row.id,
  }),
  columnHelper.accessor("name", {
    id: "2",
    header(header = "name") {
      return header;
    },
    cell: (row) => row.name,
  }),
  columnHelper.accessor("position", {
    id: "3",
    header(header = "position") {
      return header;
    },
    cell: (row) => row.position,
  }),
  columnHelper.accessor("department", {
    id: "4",
    header(header = "department") {
      return header;
    },
  }),
  columnHelper.accessor("salary", {
    id: "5",
    header: "salary",
    cell: (row) => row.salary,
  }),
  columnHelper.group({
    id: "6",
    header: "address",
    columns: [
      columnHelper.accessor("address.city", {
        id: "7",
        header: "address.city",
        // cell: (row) => row.address.city,
      }),
      columnHelper.accessor("address.country", {
        id: "8",
        header: "address.country",
        cell: (row) => row.address.country,
      }),
      columnHelper.accessor("address.zipcode", {
        id: "9",
        header: "address.zipcode",
        // cell: (row) => row.address.country,
      }),
      columnHelper.accessor("department", {
        id: "10",
        header: "address departjem",
        // cell: (row) => row.address.country,
      }),
      columnHelper.group({
        id: "11",
        header: "info",
        columns: [
          columnHelper.accessor("name", {
            id: "12",
            header: "info name",
          }),
        ],
      }),
    ],
  }),
];

export default function TestTable() {
  const table = useCreateCustomTable({ data: employees, columns });
  console.log(table.getHeaderGroup());
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          {table.getHeaderGroup().map((headerGroup) => (
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
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.getVisibleCells().map((cell, cellIndex) => (
                <td key={cellIndex}>{cell.getValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
