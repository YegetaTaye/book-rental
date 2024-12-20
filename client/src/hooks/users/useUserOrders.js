import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import ms from "ms";

const apiClient = new APIClient("/users");

const useUserOrders = ({ id } = {}, options = {}) => {
  return useQuery({
    queryKey: ["users", id, "orders"],
    queryFn: () => apiClient.getUserOrders(id),
    staleTime: ms("3m"),
    ...options,
  });
};

export default useUserOrders;
