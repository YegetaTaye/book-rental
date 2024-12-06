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

export const users = [
  {
    _id: "60d5f484f3a4d53c2c8b4568",
    email: "user1@example.com",
    password: "password123",
    fullName: "John Doe",
    phone: "123-456-7890",
    idNumber: "ID123456789",
    blockNumber: "BlockA1",
  },
  {
    _id: "60d5f484f3a4d53c2c8b4567",
    email: "user2@example.com",
    password: "password456",
    fullName: "Jane Smith",
    phone: "234-567-8901",
    idNumber: "ID987654321",
    blockNumber: "BlockB2",
  },
  {
    _id: "60d5f484f3a4d53c2c8b4566",
    email: "user3@example.com",
    password: "password789",
    fullName: "Alice Johnson",
    phone: "345-678-9012",
    idNumber: "ID456789123",
    blockNumber: "BlockC3",
  },
  {
    _id: "60d5f484f3a4d53c2c8b4565",
    email: "user4@example.com",
    password: "password101",
    fullName: "Bob Brown",
    phone: "456-789-0123",
    idNumber: "ID321654987",
    blockNumber: "BlockD4",
  },
  {
    _id: "60d5f484f3a4d53c2c8b4564",
    email: "user5@example.com",
    password: "password202",
    fullName: "Charlie White",
    phone: "567-890-1234",
    idNumber: "ID654321789",
    blockNumber: "BlockE5",
  },
];

export const columns = [
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "idNumber",
    header: "ID Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("idNumber")}</div>
    ),
  },
  {
    accessorKey: "blockNumber",
    header: "Block Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("blockNumber")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("phone")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
                navigator.clipboard.writeText(JSON.stringify(user))
              }
            >
              Copy User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
