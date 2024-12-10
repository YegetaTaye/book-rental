import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import useOrders from "@/hooks/useOrders";
import useUpdateOrder from "@/hooks/orderSettle";
import { useToast } from "@/components/hooks/use-toast";
import { DatePickerWithPresets } from "@/components/ui/date-picker";

export default function OrderDetailsPage() {
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { toast, dismiss } = useToast();

  const params = useParams();
  const orderId = parseInt(params.id, 10);
  console.log("Order ID", orderId);

  const { data: order, isLoading, isError, error } = useOrders({ id: orderId });

  const {
    mutate: acceptOrder,
    isSuccess: isSuccessOnAccept,
    isError: isErrorOnAccept,
    error: errorOnAccept,
  } = useUpdateOrder({ type: "accept" });

  const {
    mutate: cancelOrder,
    isSuccess: isSuccessOnCancel,
    isError: isErrorOnCancel,
    error: errorOnCancel,
  } = useUpdateOrder({ type: "cancel" });

  useEffect(() => {
    if (isErrorOnAccept || isErrorOnCancel) {
      const toastId = toast({
        title: "Uh oh! Something went wrong.",
        description:
          (isErrorOnAccept &&
            (errorOnAccept?.response?.data?.code == 500
              ? isErrorOnAccept?.message
              : errorOnAccept?.response?.data?.message ||
                isErrorOnAccept?.message)) ||
          (isErrorOnCancel &&
            (errorOnCancel?.response?.data?.message ||
              isErrorOnCancel?.message)),
      });
      setTimeout(() => dismiss(toastId.id), 3000);
    }
  }, [isErrorOnAccept, isErrorOnCancel]);

  useEffect(() => {
    if (isSuccessOnAccept || isSuccessOnCancel) {
      const toastId = toast({
        title: "Success",
        description: "Order updated successfully",
        variant: "success",
      });
      setTimeout(() => dismiss(toastId.id), 3000);
    }
  }, [isSuccessOnAccept, isSuccessOnCancel]);

  const handleAccept = (e) => {
    e.preventDefault();
    setIsDatePickerOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAccepting(true);
    try {
      acceptOrder({
        orderId,
        updatedData: {
          status: "ACCEPTED",
          dueDate: dueDate.toISOString(),
        },
      });
    } catch (error) {
      setIsAccepting(false);
      console.error(error);
    }
    setIsAccepting(false);
    setIsDatePickerOpen(false);
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      cancelOrder({ orderId, updatedData: { status: "CANCELLED" } });
    } catch (error) {
      setIsRejecting(false);
      console.error(error);
    }
    setIsRejecting(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>{error?.response?.data?.message || error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
          <CardDescription>
            Viewing details for order ID: {order.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">User Name</h3>
                <Link
                  to={`/dashboard/users/${order.user.id}`}
                  className="mt-1 text-sm text-blue-600 hover:underline"
                >
                  {order.user.fullName}
                </Link>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Book Title
                </h3>
                <Link
                  to={`/dashboard/books/${order.book.id}`}
                  className="mt-1 text-sm text-blue-600 hover:underline"
                >
                  {order.book.title}
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1 text-sm text-gray-900">{order.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Order Date
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(order.orderDate)}
                </p>
              </div>
            </div>
          </div>
          {isDatePickerOpen && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Select Due Date
              </h3>
              <DatePickerWithPresets date={dueDate} setDate={setDueDate} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex space-x-4 mt-4">
          {!isDatePickerOpen ? (
            <Button
              onClick={handleAccept}
              disabled={isAccepting || order.status === "ACCEPTED"}
              className="bg-green-500 hover:bg-green-600"
            >
              Accept
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isAccepting || !dueDate}
              className="bg-green-500 hover:bg-green-600"
            >
              Submit
            </Button>
          )}
          <Button
            onClick={handleReject}
            disabled={
              isRejecting ||
              order.status === "CANCELLED" ||
              order.status === "ACCEPTED"
            }
            variant="destructive"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
