import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import ms from "ms";

const apiClient = new APIClient("/orders");

const useOrders = ({ id, params } = {}, options = {}) => {
  return useQuery({
    queryKey: id ? ["order", id] : params ? ["orders", params] : ["orders"],
    queryFn: () => (id ? apiClient.getById(id) : apiClient.getAll(params)),
    staleTime: ms("30s"),
    ...options,
  });
};

export default useOrders;
