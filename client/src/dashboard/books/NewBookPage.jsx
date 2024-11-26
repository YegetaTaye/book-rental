"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { toast } from "@/components/ui/use-toast";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  bookCode: z.string().min(1, "Book code is required"),
  publicationYear: z.number().int().min(1000).max(new Date().getFullYear()),
  totalCopies: z.number().int().min(1, "Total copies must be at least 1"),
  availableCopies: z.number().int().min(0),
  rentalFee: z.number().min(0),
  lateFeePerDay: z.number().min(0),
});

const Add = async (data) => {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

export default function NewBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    bookCode: "",
    publicationYear: new Date().getFullYear(),
    totalCopies: 1,
    availableCopies: 1,
    rentalFee: 0,
    lateFeePerDay: 0,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const { isLoading, isError, error, isSuccess, refetch } = useQuery({
    queryKey: ["add-book"],
    queryFn: () => submitBookData(formData),
    enabled: false, // Don't run query on component mount
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      bookSchema.parse(formData);
      refetch(); // Trigger the signup query
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
          <CardDescription>Enter the details of the new book</CardDescription>
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
                    value={formData.title}
                    onChange={handleInputChange}
                    required
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
                    value={formData.author}
                    onChange={handleInputChange}
                    required
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
                    value={formData.bookCode}
                    onChange={handleInputChange}
                    required
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
                    value={formData.publicationYear}
                    onChange={handleInputChange}
                    required
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
                    value={formData.totalCopies}
                    onChange={handleInputChange}
                    required
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
                    value={formData.availableCopies}
                    onChange={handleInputChange}
                    required
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
                    Rental Fee
                  </label>
                  <Input
                    id="rentalFee"
                    name="rentalFee"
                    type="number"
                    value={formData.rentalFee}
                    onChange={handleInputChange}
                    required
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
                    Late Fee Per Day
                  </label>
                  <Input
                    id="lateFeePerDay"
                    name="lateFeePerDay"
                    type="number"
                    value={formData.lateFeePerDay}
                    onChange={handleInputChange}
                    required
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
          <CardFooter className="flex flex-col justify-start">
            <Button
              className="self-start px-8 py-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {isError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="default" className="mt-4">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  The new book has been added successfully!
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
