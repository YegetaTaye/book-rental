import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";

const returnTransactionApi = new APIClient("transactions");

const useSettleTransaction = ({ type } = {}) => {
  const queryClient = useQueryClient();
  // console.log("type: ", type);

  //   const mutationFn =
  //     type === "cancel"
  //       ? ({ orderId, updatedData }) => cancelOrderApi.put(orderId, updatedData)
  //       : type === "accept"
  //       ? ({ orderId, updatedData }) => acceptOrderApi.put(orderId, updatedData)
  //       : null;

  return useMutation({
    mutationFn: ({ transactionId, updatedData }) =>
      returnTransactionApi.putt(transactionId, "return", updatedData),

    // Optimistically update the order cache
    onMutate: async ({ transactionId, updatedData }) => {
      await queryClient.cancelQueries(["transaction", transactionId]);

      const previousOrder = queryClient.getQueryData([
        "transaction",
        transactionId,
      ]);

      queryClient.setQueryData(
        ["transaction", transactionId],
        (oldTransaction) => ({
          ...oldTransaction,
          ...updatedData,
        })
      );

      return { previousOrder };
    },
    onError: (error, { transactionId }, context) => {
      if (context?.previousOrder) {
        queryClient.setQueryData(
          ["order", transactionId],
          context.previousOrder
        );
      }
    },
    onSettled: (data, error, { transactionId }) => {
      queryClient.invalidateQueries(["transaction", transactionId]);
    },
  });
};

export default useSettleTransaction;
