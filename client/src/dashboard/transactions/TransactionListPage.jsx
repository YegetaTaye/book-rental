import { useToast } from "@/components/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import useSettleTransaction from "@/hooks/transactions/useSettleTransaction";
import useTransactions from "@/hooks/transactions/useTransactions";
import formatCurrency from "@/services/formatCurrency";
import formatDate from "@/services/formatDate";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function TransactionListPage() {
  const [isReturning, setIsReturning] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast, dismiss } = useToast();

  const params = useParams();
  const transactionId = parseInt(params.id, 10);

  const {
    data: transaction,
    isLoading,
    isError,
    error,
  } = useTransactions({ id: transactionId });

  const {
    mutate: retrunTransaction,
    isSuccess: isSuccessTransaction,
    isError: isErrorTransaction,
    error: errorOnTransaction,
    data: updatedTransaction,
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

  useEffect(() => {
    if (isErrorTransaction) {
      const toastId = toast({
        title: "Error",
        description:
          errorOnTransaction?.response?.data?.message ||
          errorOnTransaction.message,
        variant: "error",
      });
      setTimeout(() => dismiss(toastId.id), 3000);
    }
  }, [isErrorTransaction]);

  const handleReturn = async (e) => {
    e.preventDefault();
    setIsReturning(true);
    try {
      retrunTransaction(
        {
          transactionId,
          updatedData: { returnedDate: new Date().toISOString() },
        },
        { onSuccess: () => setOpen(true) }
      );
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
          <CardTitle>Transaction Details</CardTitle>
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
          {/* {transaction.status === "RETURNED" ? (
            <Button disabled={true} className="bg-red-600 hover:bg-red-700">
              Returned
            </Button>
          ) : ( */}
          <Button
            onClick={handleReturn}
            disabled={isReturning}
            className="bg-green-600 hover:bg-green-700"
          >
            Returned
          </Button>
          {/* )} */}
        </CardFooter>

        <TransactionAlertDialog
          data={updatedTransaction}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </Card>
    </div>
  );
}

export function TransactionAlertDialog({ data, isOpen, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transaction Details</AlertDialogTitle>
          <AlertDialogDescription>{data?.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">
            Rental Fee: {formatCurrency(data?.rentalFee)}
          </p>
          <p className="text-sm text-gray-500">
            Late Fee: {formatCurrency(data?.lateFee)}
          </p>
          <p className="text-sm font-semibold">
            Total Fee: {formatCurrency(data?.totalFee)}
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose}>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
