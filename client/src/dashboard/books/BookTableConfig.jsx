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

// {
// id: "489e1d42",
//   title: "The Great Gatsby",
//   author: "F. Scott Fitzgerald",
//   bookCode: "BG123456",
//   totalCopies: 10,
//   availableCopies: 7,
// },

// export const data = [
//   { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "example@gmail.com",
//   },
//   {
//     id: "589e1d42",
//     amount: 150,
//     status: "success",
//     email: "another@example.com",
//   },
//   { id: "689e1d42", amount: 175, status: "failed", email: "test@example.com" },
// ];
export const books = [
  {
    id: "489e1d42",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    bookCode: "BG123456",
    publicationYear: 1925,
    totalCopies: 10,
    availableCopies: 7,
    rentalFee: 2,
    lateFeePerDay: 1,
  },
  {
    id: "489e1d43",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    bookCode: "BG234567",
    publicationYear: 1960,
    totalCopies: 5,
    availableCopies: 2,
    rentalFee: 2,
    lateFeePerDay: 2,
  },
  {
    id: "489e1d44",
    title: "1984",
    author: "George Orwell",
    bookCode: "BG345678",
    publicationYear: 1949,
    totalCopies: 8,
    availableCopies: 4,
    rentalFee: 2,
    lateFeePerDay: 3,
  },
  {
    id: "489e1d45",
    title: "አማርኛ",
    author: "Herman Melville",
    bookCode: "BG456789",
    publicationYear: 1851,
    totalCopies: 6,
    availableCopies: 1,
    rentalFee: 2,
    lateFeePerDay: 1,
  },
  {
    id: "489e1d46",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    bookCode: "BG567890",
    publicationYear: 1813,
    totalCopies: 12,
    availableCopies: 10,
    rentalFee: 2,
    lateFeePerDay: 2,
  },
];

export const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("author")}</div>
    ),
  },
  {
    accessorKey: "availableCopies",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Available
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("availableCopies")}</div>
    ),
  },
  {
    accessorKey: "totalCopies",
    header: "Total",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("totalCopies")}</div>
    ),
  },
  {
    accessorKey: "bookCode",
    header: "Code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("bookCode")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText(JSON.stringify(book))
              }
            >
              Copy book
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
