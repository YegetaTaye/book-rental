import { columns, books } from "@/dashboard/books/BookTableConfig";
import UserDataTable from "@/dashboard/components/DataTable";
import useBooks from "@/hooks/books/useBooks";

export default function Books() {
  const { data, error, isLoading } = useBooks();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Books Data Table Demo</h1>
      <UserDataTable columns={columns} data={data || []} filterBy="title" />
    </div>
  );
}
