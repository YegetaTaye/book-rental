import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

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

  // useEffect(() => {
  //   const fetchUserAndBook = async () => {
  //     try {
  //       const userPromises = orders.map(async (order) => {
  //         const userData = await axios.get(
  //           `http://localhost:3000/user/${order.userId}`
  //         );
  //         console.log(userData.data.data);
  //         return userData.data.data;
  //       });
  //       const allUsers = await Promise.all(userPromises);
  //       setUsers(allUsers);

  //       const bookPromises = orders.map(async (order) => {
  //         const bookData = await axios.get(
  //           `http://localhost:3000/book/${order.bookId}`
  //         );
  //         console.log(bookData.data.data);
  //         return bookData.data.data;
  //       });
  //       const allBooks = await Promise.all(bookPromises);
  //       setBooks(allBooks);
  //     } catch (err) {
  //       console.log(err.response.data);
  //     }
  //   };
  //   fetchUserAndBook();
  // }, []);

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
    <div className="mx-auto mb-32">
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-4xl font-bold">All Orders</h1>
        <p>Dashy baby</p>
      </div>

      <div className="overflow-x-auto mx-auto p-12">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>Book Title</Table.HeadCell>
            <Table.HeadCell>Order Time</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {orders.map((order) => (
            <Table.Body key={order._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {users.find((user) => user._id === order.userId)?.firstName}
                </Table.Cell>
                <Table.Cell>
                  {books.find((book) => book._id === order.bookId)?.title}
                </Table.Cell>
                <Table.Cell>{order.orderDate}</Table.Cell>
                <Table.Cell>
                  <a
                    onClick={() => {handleDelete(order._id)}}
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Delete
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
}
