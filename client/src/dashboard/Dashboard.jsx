import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [order, setOrder] = useState(0);
  const [transaction, setTransaction] = useState(0);
  const [book, setBook] = useState(0);
  const [user, setUser] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResult = await axios.get(
          "http://localhost:3000/order/count"
        );
        setOrder(orderResult.data.count);
        const transactionResult = await axios.get(
          "http://localhost:3000/transaction/count"
        );
        setTransaction(transactionResult.data.count);
        const bookResult = await axios.get("http://localhost:3000/book/count");
        setBook(bookResult.data.count);
        const userResult = await axios.get("http://localhost:3000/user/count");
        setUser(userResult.data.count);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="px-32 py-8">
        <div className="flex flex-col items-center justify-center my-12">
          <h1 className="text-4xl font-bold">Dashbord </h1>
          <p>Dashy baby</p>
        </div>
        <div className="md:flex gap-8 justify-center">
          <div className="w-48 h-32 bg-green-200 rounded-3xl mb-6">
            <h1 className=" p-4 text-gray-900">Orders</h1>
            <div className="p-6 sm:mb-2 font-bold h-16 w-16 bg-red-200 rounded-full mx-auto flex items-center">
              <p className="text-center">{order}</p>
            </div>
          </div>
          <div className="w-48 h-32 bg-green-200 rounded-full mb-6">
            <h1 className=" p-4 text-center text-gray-900">Transactions</h1>
            <div className="p-6 sm:mb-2 font-bold h-16 w-16 bg-red-200 rounded-full mx-auto flex items-center">
              <p className="text-center">{transaction}</p>
            </div>
          </div>
          <div className="w-48 h-32 bg-green-200 rounded-3xl mb-6">
            <h1 className=" p-4 text-gray-900">Books</h1>
            <div className="p-6 sm:mb-2 font-bold h-16 w-16 bg-red-200 rounded-full mx-auto flex items-center">
              <p className="text-center">{book}</p>
            </div>
          </div>
          <div className="w-48 h-32 bg-green-200 rounded-full mb-6">
            <h1 className=" p-4 text-center text-gray-900">Users</h1>
            <div className="p-6 sm:mb-2 font-bold h-16 w-16 bg-red-200 rounded-full mx-auto flex items-center">
              <p className="text-center">{user}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
