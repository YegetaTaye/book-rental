import axios from "axios";
import { useEffect, useState } from "react";
import UserDataTable from "@/dashboard/components/DataTable";
import { users, columns } from "@/dashboard/users/UsersTableConfig";
import useUsers from "@/hooks/useUsers";

export default function AdminsList() {
  const {
    data: admins,
    isLoading,
    isError,
  } = useUsers({ params: { isAdmin: true } });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Admins Data Table Demo</h1>
      <UserDataTable
        columns={columns}
        data={admins || []}
        filterBy={"email"}
        identifier={"admin"}
      />
    </div>
  );
}
