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
import { Badge } from "@/components/ui/badge";

export const orders = [
  {
    id: "60d5f484f3a4d53c2c8b4561",
    fullName: "60d5f484f3a4d53c2c8b4567", // Random ObjectId string
    title: "60d5f484f3a4d53c2c8b4568",
    status: "Pending", // Random ObjectId string
    orderDate: "2023-01-01T10:00:00.000Z",
  },
  {
    id: "60d5f484f3a4d53c2c8b4562",
    fullName: "60d5f484f3a4d53c2c8b4569", // Random ObjectId string
    title: "60d5f484f3a4d53c2c8b456a",
    status: "Pending", // Random ObjectId string
    orderDate: "2023-02-02T11:00:00.000Z",
  },
  {
    id: "60d5f484f3a4d53c2c8b4563",
    fullName: "60d5f484f3a4d53c2c8b456b", // Random ObjectId string
    title: "60d5f484f3a4d53c2c8b456c",
    status: "Pending", // Random ObjectId string
    orderDate: "2023-03-03T12:00:00.000Z",
  },
  {
    id: "60d5f484f3a4d53c2c8b4564",
    fullName: "60d5f484f3a4d53c2c8b456d", // Random ObjectId string
    title: "60d5f484f3a4d53c2c8b456e",
    status: "Pending", // Random ObjectId string
    orderDate: "2023-03-04T13:00:00.000Z",
  },
  {
    id: "60d5f484f3a4d53c2c8b4569",
    fullName: "60d5f484f3a4d53c2c8b456f", // Random ObjectId string
    title: "60d5f484f3a4d53c2c8b4570",
    status: "Pending", // Random ObjectId string
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
    accessorKey: "fullName",
    header: "User Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Book title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Badge
          className={`capitalize ${
            status.toLowerCase() === "accepted"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : status.toLowerCase() === "cancelled"
              ? "bg-red-100 text-red-800 hover:bg-red-100"
              : status.toLowerCase() === "pending"
              ? "bg-yellow-200 text-yellow-600 hover:bg-yellow-100"
              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
          }`}
        >
          {status}
        </Badge>
      );
    },
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
