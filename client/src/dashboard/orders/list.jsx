import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import { orders, columns } from "@/dashboard/orders/OrderTableConfig";
import useOrders from "@/hooks/useOrders";
import formatDate from "@/services/formatDate";

export default function Order() {
  const { data: orders, isLoading, isError } = useOrders();

  const mappedOrders = orders?.map((order) => ({
    id: order.id,
    status: order.status,
    orderDate: formatDate(order.orderDate),
    fullName: order.user.fullName,
    userId: order.user.id,
    title: order.book.title,
    bookId: order.book.id,
  }));

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Orders Data Table Demo</h1>
      <UserDataTable
        columns={columns}
        data={mappedOrders || []}
        filterBy={"status"}
      />
    </div>
  );
}
