import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import { data, columns } from "@/dashboard/books/BookTableConfig";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await axios.get("http://localhost:3000/book");
        setBooks(bookData.data.data);
        // console.log(bookData.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchBook();
  }, []);

  const handleDelete = async (e) => {
    const deletedUser = await axios.delete(`http://localhost:3000/book/${e}`);
    // alert(deletedUser.data.msg);
    window.location.reload(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Books Data Table Demo</h1>
      <UserDataTable data={data} columns={columns} filterBy="email" />
    </div>
  );
}
