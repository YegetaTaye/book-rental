// userTableConfig.js
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const transactions = [
  {
    id: "60d5f484f3a4d53c2c8b4564",
    fullName: "John Doe", // User's name
    title: "The Great Gatsby", // Book title
    rentalDate: "2023-01-01T10:00:00Z",
    dueDate: 7, // due in 7 days
    returnedDate: "2023-01-05T10:00:00Z", // returned before due date
    lateFee: 0, // no late fee
  },
  {
    id: "60d5f484f3a4d53c2c8b4565",
    fullName: "Jane Smith", // User's name
    title: "To Kill a Mockingbird", // Book title
    rentalDate: "2023-01-02T11:00:00Z",
    dueDate: 14, // due in 14 days
    returnedDate: "2023-01-15T11:00:00Z", // returned after due date
    lateFee: 5, // late fee applied
  },
  {
    id: "60d5f484f3a4d53c2c8b4566",
    fullName: "Alice Johnson", // User's name
    title: "1984", // Book title
    rentalDate: "2023-01-03T12:00:00Z",
    dueDate: 10, // due in 10 days
    returnedDate: null, // not yet returned
    lateFee: null, // no late fee applicable
  },
  {
    id: "60d5f484f3a4d53c2c8b4567",
    fullName: "Bob Brown", // User's name
    title: "Pride and Prejudice", // Book title
    rentalDate: "2023-01-04T13:00:00Z",
    dueDate: 5, // due in 5 days
    returnedDate: "2023-01-06T13:00:00Z", // returned after due date
    lateFee: 2, // late fee applied
  },
  {
    id: "60d5f484f3a4d53c2c8b4568",
    fullName: "Charlie Davis", // User's name
    title: "Moby Dick", // Book title
    rentalDate: "2023-01-05T14:00:00Z",
    dueDate: 3, // due in 3 days
    returnedDate: "2023-01-08T14:00:00Z", // returned after due date
    lateFee: 3, // late fee applied
  },
];
export const columns = [
  {
    accessorKey: "id",
    header: "Transaction Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "fullName",
    header: "Borrower Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Book Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "rentalDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rented Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("rentalDate")}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment IDS
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
