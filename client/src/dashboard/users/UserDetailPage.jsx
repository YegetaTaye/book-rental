import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import formatDate from "@/services/formatDate";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserDetailsPage() {
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  const params = useParams();
  const orderId = parseInt(params.id, 10);

  //   const { data, isLoading, isError, error } = useBooks({ id: orderId });

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await acceptOrder(orderId);
    } catch (error) {
      console.error(error);
    }
    setIsAccepting(false);
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await rejectOrder(orderId);
    } catch (error) {
      console.error(error);
    }
    setIsRejecting(false);
  };

  // Sample data
  const user = {
    id: "8",
    email: "user1@example.com",
    password: "password123",
    fullName: "John Doe",
    phone: "123-456-7890",
    idNumber: "ID123456789",
    blockNumber: "BlockA1",
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>
            Viewing details for user ID: {user.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">User Name</h3>
                {user.fullName}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                {user.email}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">ID Number</h3>
                <p className="mt-1 text-sm text-gray-900">{user.idNumber}</p>
              </div>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter className="flex space-x-4 mt-4">
          <Button className="bg-green-500 hover:bg-green-600">Accept</Button>
          <Button variant="destructive">Reject</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}
