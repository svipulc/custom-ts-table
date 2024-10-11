# 🚀 Custom Table

[![npm version](https://img.shields.io/npm/v/@svipulc/custom-ts-table.svg?style=flat-square)](https://www.npmjs.com/package/@svipulc/custom-ts-table)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17%2B-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)

> Unleash the power of flexible, type-safe tables in your React applications! 🎉

## Table of Contents

- [🌟 Features](#-features)
- [📦 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [📖 API Reference](#-api-reference)
- [🎭 Advanced Features](#-advanced-features)
- [📊 DataTable Component](#-datatable-component)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [🐛 Bug Reports](#-bug-reports)
- [🔮 Future Plans](#-future-plans)

## 🌟 Features

- 🔒 **Type-safe**: Leverage TypeScript for compile-time checks
- 🧩 **Modular**: Use the hook or the ready-made component
- 🔍 **Powerful filtering**: Global and column-specific filtering
- 🔢 **Pagination**: Built-in support for paginated data
- 🔀 **Sorting**: Easy-to-use sorting capabilities
- 👥 **Grouped columns**: Organize your data logically
- 🎨 **Custom rendering**: Flexible cell and header rendering
- 🚀 **Performance optimized**: Efficient even with large datasets

## 📦 Installation

```bash
npm install @svipulc/custom-ts-table
# or
yarn add @svipulc/custom-ts-table
```

## 🚀 Quick Start

Here's a basic example of how to use the `useTable` hook:

```typescript
import { useTable, createColumnHelper } from '@svipulc/custom-ts-table';

interface Employee {
  id: string;
  name: string;
  salary: number;
  department: string;
}

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Employee ID',
    footer: 'Total Employees',
  }),
  columnHelper.accessor('name', {
    header: 'Full Name',
  }),
  columnHelper.accessor('salary', {
    header: 'Salary',
    cell: (info) => `$${info.getValue().toLocaleString()}`,
  }),
  columnHelper.accessor('department', {
    header: 'Department',
  }),
];

const MyAwesomeTable = () => {
  const table = useTable({
    data: employees,
    columns: columns,
  });

  const { getHeaderGroups, getRowModel, getFooterGroups } = table;

  return (
    <table>
      <thead>
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{header.isPlaceholder ? null : header.renderHeader()}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{cell.renderCell()}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <td key={header.id}>{header.isPlaceholder ? null : header.renderFooter()}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

```

## 📖 API Reference

### useTable Hook

The main hook that creates and manages the table instance.

```typescript
const table = useTable<T>(options: TableOptions<T>)
```

### Options

```typescript
interface TableOptions<T> {
  data: T[];
  columns: Column<T>[];
  sorting?: {
    key: DeepKeys<T>;
    direction: "ascending" | "descending" | "none";
  } | null;
  globalFilter?: string;
  columnFilter?: Record<string, (value: any) => boolean>;
  pagination?: {
    page: number;
    pageSize: number;
  };
}
```

#### Returns

The hook returns a table instance with the following methods:

| Method                | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `getHeaderGroups()`   | Returns header groups including grouped columns                   |
| `getRowModel()`       | Returns the current row model with pagination applied             |
| `getFooterGroups()`   | Returns footer groups                                             |
| `getPaginationInfo()` | Returns pagination details including total pages and current page |

### Column Helper

The `createColumnHelper` utility provides a type-safe way to define columns:

```typescript
const columnHelper = createColumnHelper<T>();

// Create an accessor column
columnHelper.accessor(key, {
  id?: string;
  header?: string | (() => React.ReactNode);
  footer?: string | (() => React.ReactNode);
  cell?: (info: CellContext<T>) => React.ReactNode;
});
```

## 🎯 Advanced Features

### Sorting

```typescript
const [sortConfig, setSortConfig] = useState<{
  key: DeepKeys<DataType>;
  direction: "ascending" | "descending" | "none";
} | null>(null);

const table = useTable({
  // ... other options
  sorting: sortConfig,
});
```

### Filtering

```typescript
// Global filtering
const [globalFilter, setGlobalFilter] = useState("");

// Column-specific filtering
const columnFilters = {
  price: (value: number) => value < 100,
  stock: (value: number) => value > 0,
};

const table = useTable({
  // ... other options
  globalFilter: globalFilter,
  columnFilter: columnFilters,
});
```

### Pagination

```typescript
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);

const table = useTable({
  // ... other options
  pagination: {
    page: currentPage,
    pageSize: pageSize,
  },
});

// Access pagination info
const { totalPages, currentPage, totalItems } = table.getPaginationInfo();
```

### Grouped Columns

```typescript
const columns = [
  // ... regular columns
  columnHelper.group({
    id: "dimensions",
    header: "Dimensions",
    columns: [
      columnHelper.accessor("width", {
        header: "Width",
      }),
      columnHelper.accessor("height", {
        header: "Height",
      }),
    ],
  }),
];
```

### Custom Cell Rendering

```typescript
columnHelper.accessor('stock', {
  cell: info => {
    if (info.getValue() <= 10) {
      return <span style={{ color: 'red' }}>{info.getValue()}</span>;
    }
    return info.getValue();
  },
});
```

## 📊 DataTable Component

For a quick and easy table setup, you can use the `DataTable` component:

```typescript
import { DataTable } from '@svipulc/custom-ts-table';
import { createColumnHelper } from '@svipulc/custom-ts-table/core/columns';

interface User {
  id: number;
  name: string;
  email: string;
}

const Example = () => {
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
    }),
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('email', {
      header: 'Email',
    }),
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      pagination={true}
      pageSize={10}
      sorting={true}
      globalFilter={true}
      columnsFilter={{
        name: '',
        email: '',
      }}
    />
  );
};
```

### DataTable Props

```typescript
interface DataTableProps<T> {
  // Required props
  data: T[]; // Data to display
  columns: Column<T>[]; // Column definitions

  // Optional props
  pagination?: boolean; // Enable/disable pagination
  pageSize?: number; // Items per page
  sorting?: boolean; // Enable/disable sorting
  pageIndex?: number; // Initial page index
  globalFilter?: boolean; // Enable/disable global search
  columnsFilter?: FilterCriteria<T>; // Column-specific filters
  className?: string; // Additional CSS classes
}
```

## 🤝 Contributing

We welcome contributions to Custom Table! If you have suggestions for improvements or encounter any issues, please feel free to open an issue or submit a pull request on our GitHub repository.

## 📝 License

Custom Table is MIT licensed. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by TanStack Table
- Built with TypeScript and React

## 🐛 Bug Reports

If you encounter any bugs or issues, please report them on our [GitHub Issues](https://github.com/svipulc/custom-ts-table/issues) page.

## 🔮 Future Plans

We're constantly working to improve Custom Table. Here are some features we're planning to add in the future:

- Column resizing
- Row selection
- Expandable rows
- CSV/Excel export

Stay tuned for updates!

---

Made with ❤️ by vipul chandravadiya
