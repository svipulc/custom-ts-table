// all the data use for example of table

/*  1  */
// employees data type
export type employees = {
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

// employees data
export const employees: employees[] = [
  {
    id: 1,
    name: "Alice Johnson",
    position: "Software Engineer",
    department: "IT",
    salary: 75000,
    address: {
      city: "New York",
      country: "USA",
      zipcode: "10001",
    },
  },
  {
    id: 2,
    name: "Bob Smith",
    position: "Product Manager",
    department: "Marketing",
    salary: 85000,
    address: {
      city: "San Francisco",
      country: "USA",
      zipcode: "94105",
    },
  },
  {
    id: 3,
    name: "Charlie Brown",
    position: "Data Analyst",
    department: "Finance",
    salary: 65000,
    address: {
      city: "Chicago",
      country: "USA",
      zipcode: "60601",
    },
  },
  {
    id: 4,
    name: "Diana Prince",
    position: "UX Designer",
    department: "Design",
    salary: 72000,
    address: {
      city: "Los Angeles",
      country: "USA",
      zipcode: "90001",
    },
  },
  {
    id: 5,
    name: "Ethan Hunt",
    position: "Systems Administrator",
    department: "IT",
    salary: 70000,
    address: {
      city: "Seattle",
      country: "USA",
      zipcode: "98101",
    },
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    position: "Marketing Specialist",
    department: "Marketing",
    salary: 60000,
    address: {
      city: "Miami",
      country: "USA",
      zipcode: "33101",
    },
  },
  {
    id: 7,
    name: "George Clooney",
    position: "Sales Executive",
    department: "Sales",
    salary: 80000,
    address: {
      city: "Dallas",
      country: "USA",
      zipcode: "75201",
    },
  },
  {
    id: 8,
    name: "Hannah Arendt",
    position: "Content Writer",
    department: "Editorial",
    salary: 55000,
    address: {
      city: "Austin",
      country: "USA",
      zipcode: "73301",
    },
  },
  {
    id: 9,
    name: "Ian Malcolm",
    position: "Project Coordinator",
    department: "Operations",
    salary: 62000,
    address: {
      city: "Boston",
      country: "USA",
      zipcode: "02101",
    },
  },
  {
    id: 10,
    name: "Jane Doe",
    position: "HR Manager",
    department: "Human Resources",
    salary: 78000,
    address: {
      city: "Philadelphia",
      country: "USA",
      zipcode: "19101",
    },
  },
  {
    id: 11,
    name: "Kevin Spacey",
    position: "Software Tester",
    department: "IT",
    salary: 65000,
    address: {
      city: "San Diego",
      country: "USA",
      zipcode: "92101",
    },
  },
  {
    id: 12,
    name: "Laura Croft",
    position: "Graphic Designer",
    department: "Design",
    salary: 70000,
    address: {
      city: "Denver",
      country: "USA",
      zipcode: "80201",
    },
  },
  {
    id: 13,
    name: "Michael Scott",
    position: "Branch Manager",
    department: "Sales",
    salary: 95000,
    address: {
      city: "Phoenix",
      country: "USA",
      zipcode: "85001",
    },
  },
  {
    id: 14,
    name: "Nina Simone",
    position: "Research Scientist",
    department: "Research",
    salary: 90000,
    address: {
      city: "Portland",
      country: "USA",
      zipcode: "97201",
    },
  },
  {
    id: 15,
    name: "Oliver Twist",
    position: "Financial Analyst",
    department: "Finance",
    salary: 75000,
    address: {
      city: "Atlanta",
      country: "USA",
      zipcode: "30301",
    },
  },
];

/*  2  */
//user data type
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
    country: string;
    postalCode: string;
  };
  avatar: string;
  Extract: {
    Level1: {
      Level2: {
        Level3: string;
      };
    };
  };
}
