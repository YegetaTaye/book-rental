import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ManageBook() {
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
    <div>
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-4xl font-bold">All Books</h1>
        <p>Booky baby</p>
      </div>

      <div className="overflow-x-auto mx-auto p-12">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Book Title</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Publication Year</Table.HeadCell>
            <Table.HeadCell>Total Copies</Table.HeadCell>
            <Table.HeadCell>Available Copies</Table.HeadCell>
            <Table.HeadCell>Rental Fee</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          {books.map((book, index) => (
            <Table.Body key={book._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {book.title}
                </Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.publicationYear}</Table.Cell>
                <Table.Cell>{book.totalCopies}</Table.Cell>
                <Table.Cell>{book.availableCopies}</Table.Cell>
                <Table.Cell>{book.rentalFee}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    onClick={() => {handleDelete(book._id)}}
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
