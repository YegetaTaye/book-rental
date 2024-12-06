import { useQuery } from "@tanstack/react-query";
import bookService from "@/services/bookService";
import ms from "ms";

const useBooks = ({ id, params } = {}, options = {}) => {
  return useQuery({
    queryKey: id ? ["book", id] : params ? ["books", params] : ["books"],
    queryFn: () => (id ? bookService.getById(id) : bookService.getAll(params)),
    staleTime: ms("3m"),
    ...options,
  });
};

export default useBooks;
