import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import { orders, columns } from "@/dashboard/orders/OrderTableConfig";

export default function Order() {
  // const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await axios.get("http://localhost:3000/order");
        // setOrders(orderData.data.data);
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

  const handleDelete = async (e) => {
    const deletedUser = await axios.delete(`http://localhost:3000/order/${e}`);
    // alert(deletedUser.data.msg);
    window.location.reload(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Orders Data Table Demo</h1>
      <UserDataTable columns={columns} data={orders} filterBy={"rentalDate"} />
    </div>
  );
}
