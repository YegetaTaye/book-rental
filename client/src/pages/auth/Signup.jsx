import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSignup } from "@/hooks/useAuth";
import { signupSchema } from "@/validations";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    password: "",
    blockNumber: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: signup, error, isSuccess, isError } = useSignup();

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
      signupSchema.parse(formData);
      setIsSubmitting(true);
      signup(formData, { onSettled: () => setIsSubmitting(false) });
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof z.ZodError) {
        setValidationErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Solomon Dawit "
                  value={formData.name}
                  required
                  onChange={handleInputChange}
                />
                {validationErrors.fullName && (
                  <p className="text-sm text-red-500">
                    {validationErrors.fullName}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="solomon@example.com"
                  value={formData.email}
                  required
                  onChange={handleInputChange}
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="phone"
                  placeholder="0911223344"
                  value={formData.phone}
                  required
                  onChange={handleInputChange}
                />
                {validationErrors.phone && (
                  <p className="text-sm text-red-500">
                    {validationErrors.phone}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  name="idNumber"
                  type="idNumber"
                  placeholder="ETS1234/13"
                  value={formData.idNumber}
                  required
                  onChange={handleInputChange}
                />
                {validationErrors.idNumber && (
                  <p className="text-sm text-red-500">
                    {validationErrors.idNumber}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id_number">Block Number</Label>
                <Input
                  id="blockNumber"
                  type="blockNumber"
                  name="blockNumber"
                  placeholder="17"
                  value={formData.blockNumber}
                  required
                  onChange={handleInputChange}
                />
                {validationErrors.blockNumber && (
                  <p className="text-sm text-red-500">
                    {validationErrors.blockNumber}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  placeholder=""
                  required
                  onChange={handleInputChange}
                />
                {validationErrors.password && (
                  <p className="text-sm text-red-500">
                    {validationErrors.password}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Sign up"
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
              <Alert variant="default" className="mt-4">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your account has been created successfully!
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
