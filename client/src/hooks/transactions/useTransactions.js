import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/apiClient";
import ms from "ms";

const apiClient = new APIClient("/transactions");

const useTransactions = ({ id, params } = {}, options = {}) => {
  return useQuery({
    queryKey: id
      ? ["transaction", id]
      : params
      ? ["transactions", params]
      : ["transactions"],
    queryFn: () => (id ? apiClient.getById(id) : apiClient.getAll(params)),
    staleTime: ms("3m"),
    ...options,
  });
};

export default useTransactions;
