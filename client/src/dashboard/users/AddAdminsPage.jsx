import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import useAddBook from "@/hooks/books/useAddBook";
import { useAddAdmins } from "@/hooks/useAuth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { z } from "zod";
import { bookSchema } from "@/validations";

export default function AddAdminsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    password: "",
    blockNumber: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const {
    mutate: addAdmin,
    isSuccess,
    isError,
    error,
  } = useAddAdmins(() => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      idNumber: "",
      password: "",
      blockNumber: "",
    });
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
      setIsSubmitting(true);
      addBook(formData, { onSettled: () => setIsSubmitting(false) });
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof z.ZodError) {
        setValidationErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Add New Admin</CardTitle>
          <CardDescription>
            Enter the information of the new admin
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fullname
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.name}
                    required
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  {validationErrors.fullName && (
                    <p className="text-sm text-red-500">
                      {validationErrors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    required
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-red-500">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="phone"
                    value={formData.phone}
                    required
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  {validationErrors.phone && (
                    <p className="text-sm text-red-500">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="idNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID Number
                  </label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    type="idNumber"
                    value={formData.idNumber}
                    required
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  {validationErrors.idNumber && (
                    <p className="text-sm text-red-500">
                      {validationErrors.idNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="blockNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Block Number
                  </label>
                  <Input
                    id="blockNumber"
                    type="blockNumber"
                    name="blockNumber"
                    value={formData.blockNumber}
                    required
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  {validationErrors.blockNumber && (
                    <p className="text-sm text-red-500">
                      {validationErrors.blockNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    required
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                  {validationErrors.password && (
                    <p className="text-sm text-red-500">
                      {validationErrors.password}
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
                  The admin has been added successfully!
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
