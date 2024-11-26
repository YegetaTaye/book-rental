import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import { users, columns } from "@/dashboard/users/UsersTableConfig";

export default function AdminsList() {
  // const [users, setusers] = useState([]);

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
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admins Data Table Demo</h1>
      <UserDataTable
        columns={columns}
        data={users}
        filterBy={"email"}
        identifier={"admin"}
      />
    </div>
  );
}
