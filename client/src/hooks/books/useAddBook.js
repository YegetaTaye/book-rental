import bookService from "@/services/bookService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddBook = (onAdd, { type } = {}) => {
  const queryClient = useQueryClient();

  return type === "edit"
    ? useMutation({
        mutationFn: ({ id, data }) => bookService.put(id, data),

        onMutate: (newBook) => {
          const previousBooks = queryClient.getQueryData(["books"]) || [];

          // Optimistically update the cache
          queryClient.setQueryData(["books"], (books = []) =>
            books.map((book) =>
              book.id === newBook.id ? { ...book, ...newBook } : book
            )
          );

          return { previousBooks };
        },

        onSuccess: (savedBook, newBook) => {
          onAdd();
          queryClient.setQueryData(["books"], (books) =>
            books?.map((book) => (book === newBook ? savedBook : book))
          );

          // Refetch the books to ensure the cache is in sync with the server
          queryClient.invalidateQueries(["books", newBook.id]);
        },

        onError: (error, newBook, context) => {
          if (!context) return;
          console.log("error in hook: ", error);

          queryClient.setQueryData(["books"], context.previousBooks);
        },
      })
    : useMutation({
        mutationFn: bookService.post,

        onMutate: (newBook) => {
          console.log("new: ", newBook);
          const previousBooks = queryClient.getQueryData(["books"]) || [];

          queryClient.setQueryData(["books"], (books = []) => [
            newBook,
            ...books,
          ]);

          return { previousBooks };
        },

        onSuccess: (savedBook, newBook) => {
          console.log("Book added:", savedBook);
          onAdd();

          queryClient.setQueryData(["books"], (books) =>
            books?.map((book) => (book === newBook ? savedBook : book))
          );
        },

        onError: (error, newBook, context) => {
          if (!context) return;

          queryClient.setQueryData(["books"], context.previousBooks);
        },
      });
};

export default useAddBook;
