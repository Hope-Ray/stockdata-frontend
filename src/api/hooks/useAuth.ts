import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../endpoints/auth";

export const useLogin = (onSuccess: any, onError: any) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess,
    onError,
  });
};

export const useRegister = (onSuccess: any, onError: any) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess,
    onError,
  });
};
