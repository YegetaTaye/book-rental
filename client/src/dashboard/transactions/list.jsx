import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import {
  transactions,
  columns,
} from "@/dashboard/transactions/TransactionTable.config";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await axios.get("http://localhost:3000/order");
        setOrders(orderData.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    const fetchUserAndBook = async () => {
      try {
        const userData = await axios.get("http://localhost:3000/user");
        const bookData = await axios.get("http://localhost:3000/book");
        setUsers(userData.data.data);
        setBooks(bookData.data.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchUserAndBook();
  }, []);

  console.log(orders);
  console.log(users);
  console.log(books);
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Transactions Data Table Demo</h1>
      <UserDataTable
        columns={columns}
        data={transactions}
        filterBy={"fullName"}
      />
    </div>
  );
}
