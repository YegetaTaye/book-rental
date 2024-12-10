import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "@/services/apiClient";

const acceptOrderApi = new APIClient("orders/accept");
const cancelOrderApi = new APIClient("orders/cancel");

const useUpdateOrder = ({ type } = {}) => {
  const queryClient = useQueryClient();
  console.log("type: ", type);

  const mutationFn =
    type === "cancel"
      ? ({ orderId, updatedData }) => cancelOrderApi.put(orderId, updatedData)
      : type === "accept"
      ? ({ orderId, updatedData }) => acceptOrderApi.put(orderId, updatedData)
      : null;

  return useMutation({
    mutationFn: mutationFn,
    // Optimistically update the order cache
    onMutate: async ({ orderId, updatedData }) => {
      await queryClient.cancelQueries(["order", orderId]);

      const previousOrder = queryClient.getQueryData(["order", orderId]);

      queryClient.setQueryData(["order", orderId], (oldOrder) => ({
        ...oldOrder,
        ...updatedData,
      }));

      return { previousOrder };
    },
    onError: (error, { orderId }, context) => {
      if (context?.previousOrder) {
        queryClient.setQueryData(["order", orderId], context.previousOrder);
      }
    },
    onSettled: (data, error, { orderId }) => {
      queryClient.invalidateQueries(["order", orderId]);
    },
  });
};

export default useUpdateOrder;
