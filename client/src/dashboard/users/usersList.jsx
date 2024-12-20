import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import { users, columns } from "@/dashboard/users/UsersTableConfig";
import useUsers from "@/hooks/users/useUsers";

export default function UsersList() {
  const { data: users, isLoading, isError } = useUsers();

  const handleDelete = async (e) => {
    const deletedUser = await axios.delete(`http://localhost:3000/user/${e}`);
    window.location.reload(true);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Users Data Table Demo</h1>
      <UserDataTable
        columns={columns}
        data={users || []}
        filterBy={"email"}
        identifier={"user"}
      />
    </div>
  );
}
