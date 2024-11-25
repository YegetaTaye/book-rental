import React from "react";
import UserDataTable from "./components/DataTable";

export default function TestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">User Data Table Demo</h1>
      <UserDataTable />
    </div>
  );
}
