"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ReloadIcon } from "@radix-ui/react-icons";
import { Trash, Pencil } from "lucide-react";

const initialData = {
  id: "dhf3hrofe",
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  bookCode: "BG123456",
  publicationYear: 1925,
  totalCopies: 10,
  availableCopies: 7,
  rentalFee: 2,
  lateFeePerDay: 1,
};

export default function BookEditPage() {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsEditing(false);
    // In a real app, you would update the backend here
    console.log("Data submitted:", data);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    // In a real app, you would delete from the backend here
    console.log("Data deleted:", data);
    setData(initialData);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
          <CardDescription>Viewing book data for ID: {data.id}</CardDescription>
        </CardHeader>
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
                  value={data.title}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
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
                  value={data.author}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
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
                  value={data.bookCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
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
                  value={data.publicationYear}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
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
                  value={data.totalCopies}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
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
                  value={data.availableCopies}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
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
                  value={data.rentalFee}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
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
                  value={data.lateFeePerDay}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isEditing ? (
            <Button
              className="flex justify-center items-center"
              onClick={handleEdit}
            >
              <Pencil />
              Edit
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  {" "}
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting...{" "}
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
                {" "}
                Delete
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this book record and remove it from our database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Deleting...{" "}
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
