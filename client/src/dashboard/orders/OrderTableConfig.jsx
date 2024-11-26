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

export const orders = [
  {
    id: "60d5f484f3a4d53c2c8b4561",
    userId: "60d5f484f3a4d53c2c8b4567", // Random ObjectId string
    bookId: "60d5f484f3a4d53c2c8b4568", // Random ObjectId string
    orderDate: "2023-01-01T10:00:00.000Z",
  },
  {
    id: "60d5f484f3a4d53c2c8b4562",
    userId: "60d5f484f3a4d53c2c8b4569", // Random ObjectId string
    bookId: "60d5f484f3a4d53c2c8b456a", // Random ObjectId string
    orderDate: "2023-02-02T11:00:00.000Z",
  },
  {
    id: "60d5f484f3a4d53c2c8b4563",
    userId: "60d5f484f3a4d53c2c8b456b", // Random ObjectId string
    bookId: "60d5f484f3a4d53c2c8b456c", // Random ObjectId string
    orderDate: "2023-03-03T12:00:00.000Z",
  },
  {
    id: "60d5f484f3a4d53c2c8b4564",
    userId: "60d5f484f3a4d53c2c8b456d", // Random ObjectId string
    bookId: "60d5f484f3a4d53c2c8b456e", // Random ObjectId string
    orderDate: "2023-03-04T13:00:00.000Z",
  },
  {
    id: "60d5f484f3a4d53c2c8b4569",
    userId: "60d5f484f3a4d53c2c8b456f", // Random ObjectId string
    bookId: "60d5f484f3a4d53c2c8b4570", // Random ObjectId string
    orderDate: "2023-04-05T14:00:00.000Z",
  },
];

export const columns = [
  {
    accessorKey: "id",
    header: "Order Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "userId",
    header: "User Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userId")}</div>
    ),
  },
  {
    accessorKey: "bookId",
    header: "Book Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("bookId")}</div>
    ),
  },

  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("orderDate")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

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
                navigator.clipboard.writeText(JSON.stringify(order))
              }
            >
              Copy order
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
