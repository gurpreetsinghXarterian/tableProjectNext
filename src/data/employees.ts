import { Employee } from "@/types/Employee";
import { GridColDef } from '@mui/x-data-grid';

export const employees: Employee[] = [
  { id: 1, name: "John Doe", age: 28, city: "New York", salary: 50000 },
  { id: 2, name: "Jane Smith", age: 34, city: "Los Angeles", salary: 60000 },
  { id: 3, name: "Mark Johnson", age: 40, city: "Chicago", salary: 70000 },
  { id: 4, name: "Emily Davis", age: 25, city: "San Francisco", salary: 55000 },
  { id: 5, name: "Michael Brown", age: 30, city: "Miami", salary: 65000 },
  { id: 6, name: "Sarah Wilson", age: 27, city: "Boston", salary: 58000 },
  { id: 7, name: "David Lee", age: 35, city: "Seattle", salary: 72000 },
];

export const columns = [
  { id: "select", label: "", minWidth: 50 , align: "center" as "center" },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "age", label: "Age", minWidth: 100 },
  { id: "city", label: "City", minWidth: 150 },
  {
    id: "salary",
    label: "Salary ($)",
    minWidth: 170,
    align: "right" as "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "actions", label: "Actions", minWidth: 50, align: "center" as "center" },
];


export const dataGridColumns: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 70, flex: 0.5 },
  { field: "firstName", headerName: "First name", minWidth: 130, flex: 1 },
  { field: "lastName", headerName: "Last name", minWidth: 130, flex: 1 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    minWidth: 90,
    flex: 0.5,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    minWidth: 160,
    flex: 1.5,
    headerAlign: "right",
    align: "right" as "right",
    valueGetter: (params,row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];


export const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];