import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import { books, columns } from "@/dashboard/books/BookTableConfig";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/api";

export default function Books() {
  // const [books, setBooks] = useState([]);

  // const { data: books, error, isLoading } = useBooks();

  // const handleDelete = async (e) => {
  //   const deletedUser = await axios.delete(`http://localhost:3000/book/${e}`);
  //   // alert(deletedUser.data.msg);
  //   window.location.reload(true);
  // };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Books Data Table Demo</h1>
      <UserDataTable columns={columns} data={books} filterBy="title" />
    </div>
  );
}

const useBooks = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: () => axios.get(`${BASE_URL}/books`).then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
