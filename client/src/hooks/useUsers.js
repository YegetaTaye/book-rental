import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import ms from "ms";

const apiClient = new APIClient("/users");

const useUsers = ({ id, params } = {}, options = {}) => {
  return useQuery({
    queryKey: id ? ["user", id] : params ? ["users", params] : ["users"],
    queryFn: () => (id ? apiClient.getById(id) : apiClient.getAll(params)),
    staleTime: ms("3m"),
    ...options,
  });
};

export default useUsers;
