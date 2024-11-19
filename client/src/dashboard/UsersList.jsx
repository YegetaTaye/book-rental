import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await axios.get("http://localhost:3000/user");
        setusers(usersData.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e) => {
    console.log(e);
    const deletedUser = await axios.delete(`http://localhost:3000/user/${e}`);
    // alert(deletedUser.data.msg);
    window.location.reload(true);
  };

  return (
    <div className="mx-auto mb-32">
      <div className="flex flex-col items-center justify-center my-12">
        <h1 className="text-4xl font-bold">All Users</h1>
        <p>Dashy baby</p>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable className="mb-16">
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {users.map((user, index) => (
            <Table.Body key={user._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.firstName + " " + user.lastName}
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                <Table.Cell>
                  <a
                    onClick={() => {
                      handleDelete(user._id);
                    }}
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
