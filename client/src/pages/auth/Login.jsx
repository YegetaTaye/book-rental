"use client";

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
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const loginApi = async (credentials) => {
  // This is a mock API call. Replace with your actual API endpoint.
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  if (
    credentials.email === "user@example.com" &&
    credentials.password === "password123"
  ) {
    return { success: true, message: "Login successful" };
  }
  throw new Error("Invalid credentials");
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: () => loginApi({ email, password }),
    enabled: false, // Don't run query on component mount
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      loginSchema.parse({ email, password });
      refetch(); // Trigger the login query
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.flatten().fieldErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder=""
                  required
                  onChange={(e) => setPassword(e.target.value)}
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
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
            {isError && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            <div className="flex justify-between w-full pt-3">
              <p>Don't you have an account?</p>
              <Link to="/signup" className="font-semibold">
                Sign Up.
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
