import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

import useAddBook from "@/hooks/books/useAddBook";
import useBooks from "@/hooks/books/useBooks";
import bookService from "@/services/bookService";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bookSchema } from "@/validations";

export default function BookEditPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({});

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const params = useParams();
  const bookId = parseInt(params.id, 10);

  const {
    data: book,
    isLoading,
    isError: isErrorOnFetch,
    error: fetchError,
  } = useBooks({ id: bookId });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const {
    mutate: editBook,
    isSuccess,
    isError,
    error,
  } = useAddBook(
    () => {
      setFormData({});
    },
    {
      type: "edit",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: [
        "publicationYear",
        "totalCopies",
        "availableCopies",
        "rentalFee",
        "lateFeePerDay",
      ].includes(name)
        ? parseInt(value, 10)
        : value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    try {
      bookSchema.parse(formData);
      setIsSubmitting(true);
      const { id, createdAt, updatedAt, ...dataWithoutId } = formData;

      editBook(
        { id: parseInt(formData.id), data: dataWithoutId },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof z.ZodError) {
        setValidationErrors(error.flatten().fieldErrors);
      }
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    await bookService.delete(formData.id);
    queryClient.removeQueries(["book", formData.id]);

    setIsDeleting(false);
    navigate("/dashboard/books");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isErrorOnFetch)
    return (
      <div>{fetchError?.response?.data?.message || fetchError.message}</div>
    );

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
          <CardDescription>Viewing book data for ID: {bookId}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  {validationErrors.title && (
                    <p className="text-sm text-red-500">
                      {validationErrors.title}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Author
                  </label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  {validationErrors.author && (
                    <p className="text-sm text-red-500">
                      {validationErrors.author}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="bookCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Book Code
                  </label>
                  <Input
                    id="bookCode"
                    name="bookCode"
                    value={formData.bookCode || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  {validationErrors.bookCode && (
                    <p className="text-sm text-red-500">
                      {validationErrors.bookCode}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="publicationYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Publication Year
                  </label>
                  <Input
                    id="publicationYear"
                    name="publicationYear"
                    type="number"
                    value={formData.publicationYear || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  {validationErrors.publicationYear && (
                    <p className="text-sm text-red-500">
                      {validationErrors.publicationYear}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="totalCopies"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Copies
                  </label>
                  <Input
                    id="totalCopies"
                    name="totalCopies"
                    type="number"
                    value={formData.totalCopies || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  {validationErrors.totalCopies && (
                    <p className="text-sm text-red-500">
                      {validationErrors.totalCopies}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="availableCopies"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Available Copies
                  </label>
                  <Input
                    id="availableCopies"
                    name="availableCopies"
                    type="number"
                    value={formData.availableCopies || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  {validationErrors.availableCopies && (
                    <p className="text-sm text-red-500">
                      {validationErrors.availableCopies}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="rentalFee"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rental Fee ($)
                  </label>
                  <Input
                    id="rentalFee"
                    name="rentalFee"
                    type="number"
                    value={formData.rentalFee || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  {validationErrors.rentalFee && (
                    <p className="text-sm text-red-500">
                      {validationErrors.rentalFee}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lateFeePerDay"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Late Fee Per Day ($)
                  </label>
                  <Input
                    id="lateFeePerDay"
                    name="lateFeePerDay"
                    type="number"
                    value={formData.lateFeePerDay || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  {validationErrors.lateFeePerDay && (
                    <p className="text-sm text-red-500">
                      {validationErrors.lateFeePerDay}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <div className="w-full flex justify-between">
              {!isEditing ? (
                <Button
                  type="button"
                  className="flex justify-center items-center"
                  onClick={handleEdit}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="flex justify-center items-center"
                    variant="destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this book record and remove it from our database.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            {isError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error?.response?.data?.message || error.message}
                </AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="success" className="mt-4 text-green-600">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  The book has been updated successfully!
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
