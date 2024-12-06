import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import {
  transactions,
  columns,
} from "@/dashboard/transactions/TransactionTable.config";
import useTransactions from "@/hooks/useTransactions";

export default function Transactions() {
  const { data: transactions, isLoading, isError } = useTransactions();

  const mappedTransaction = transactions?.map((item) => ({
    id: item.id,
    fullName: item.user.fullName,
    title: item.book.title,
    status: item.status,
    rentalDate: item.rentalDate,
    dueDate: item.dueDate,
    returnedDate: item.returnedDate,
  }));

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Transactions Data Table Demo</h1>
      <UserDataTable
        columns={columns}
        data={mappedTransaction || []}
        filterBy={"fullName"}
      />
    </div>
  );
}
