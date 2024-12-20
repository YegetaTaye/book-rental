// useLogin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import APIClient from "@/services/apiClient";
import useStore from "@/store";

const loginApi = new APIClient("users/login");
const signupApi = new APIClient("users/signup");
const addAdminApi = new APIClient("admins");

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, setUser, logout } = useStore();

  return useMutation({
    mutationFn: (credentials) => loginApi.post(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/");
      setUser(data);
    },
    onError: (error) => {
      console.error(
        "Login failed:",
        error?.response?.data?.message || error.message
      );
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials) => signupApi.post(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      navigate("/");
    },
    onError: (error) => {
      console.error(
        "Signup failed:",
        error?.response?.data?.message || error.message
      );
    },
  });
};

export const useAddAdmins = (onAdd) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addAdminApi.post,

    onMutate: (newAdmin) => {
      // console.log("new: ", newBook);
      const previousAdmins = queryClient.getQueryData(["admins"]) || [];

      queryClient.setQueryData(["admins"], (admins = []) => [
        newAdmin,
        ...admins,
      ]);

      return { previousAdmins };
    },

    onSuccess: (savedAdmins, newAdmin) => {
      console.log("Admin added:", savedAdmins);
      onAdd();

      queryClient.setQueryData(["admins"], (admins) =>
        admins?.map((admin) => (admin === newAdmin ? savedAdmins : admin))
      );
    },

    onError: (error, newAdmin, context) => {
      if (!context) return;

      queryClient.setQueryData(["admins"], context.previousAdmins);
    },
  });
};
