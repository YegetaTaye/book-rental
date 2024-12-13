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
import useTransactions from "@/hooks/transactions/useTransactions";
import useSettleTransaction from "@/hooks/transactions/useSettleTransaction";
import { useToast } from "@/components/hooks/use-toast";

export default function TransactionListPage() {
  const [isReturning, setIsReturning] = useState(false);

  const { toast, dismiss } = useToast();

  const params = useParams();
  const transactionId = parseInt(params.id, 10);
  console.log("Order ID", transactionId);

  const {
    data: transaction,
    isLoading,
    isError,
    error,
  } = useTransactions({ id: transactionId });
  console.log("transaction: ", transaction);

  const {
    mutate: retrunTransaction,
    isSuccess: isSuccessTransaction,
    isError: isErrorTransaction,
    error: errorOnTransaction,
  } = useSettleTransaction();

  useEffect(() => {
    if (isSuccessTransaction) {
      const toastId = toast({
        title: "Success",
        description: "Transaction updated successfully",
        variant: "success",
      });
      setTimeout(() => dismiss(toastId.id), 3000);
    }
  }, [isSuccessTransaction]);

  const handleReturn = async (e) => {
    e.preventDefault();
    setIsReturning(true);
    try {
      retrunTransaction({
        transactionId,
        updatedData: { returnedDate: new Date().toISOString() },
      });
    } catch (error) {
      console.error(error);
    }
    setIsReturning(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>{error?.response?.data?.message || error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Order Transaction</CardTitle>
          <CardDescription>
            Viewing details for transaction ID: {transaction.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">User Name</h3>
                <Link
                  to={`/dashboard/users/${transaction.user.id}`}
                  className="mt-1 text-sm text-blue-600 hover:underline"
                >
                  {transaction.user.fullName}
                </Link>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Book Title
                </h3>
                <Link
                  to={`/dashboard/books/${transaction.book.id}`}
                  className="mt-1 text-sm text-blue-600 hover:underline"
                >
                  {transaction.book.title}
                </Link>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 pt-4">
                    Status
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {transaction.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Transaction Date
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(transaction.rentalDate)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(transaction.dueDate)}
                </p>
              </div>

              {transaction.status === "RETURNED" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Returned Date
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(transaction.returnedDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex space-x-4 mt-4">
          {transaction.status === "RETURNED" ? (
            <Button disabled={true} className="bg-red-600 hover:bg-red-700">
              Returned
            </Button>
          ) : (
            <Button
              onClick={handleReturn}
              disabled={isReturning}
              className="bg-green-600 hover:bg-green-700"
            >
              Returned
            </Button>
          )}
        </CardFooter>

        {isErrorTransaction && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            {errorOnTransaction?.response?.data?.message ||
              errorOnTransaction.message}
          </div>
        )}

        {isSuccessTransaction && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
            Order updated successfully
          </div>
        )}
      </Card>
    </div>
  );
}
