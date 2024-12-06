import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import { orders, columns } from "@/dashboard/orders/OrderTableConfig";
import useOrders from "@/hooks/useOrders";

export default function Order() {
  const { data: orders, isLoading, isError } = useOrders();

  const mappedOrders = orders?.map((item) => ({
    id: item.id,
    status: item.status,
    orderDate: item.orderDate,
    fullName: item.user.fullName,
    title: item.book.title,
  }));

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Orders Data Table Demo</h1>
      <UserDataTable
        columns={columns}
        data={mappedOrders || []}
        filterBy={"rentalDate"}
      />
    </div>
  );
}
