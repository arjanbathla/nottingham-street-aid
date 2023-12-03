import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../contextStore/userStore";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [errorLogin, setErrorLogin] = useState(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState(null);

  const login = async (username, password) => {
    setIsLoadingLogin(true);
    setErrorLogin(null);

    const response = await fetch("https://notts-street-aid-backend.vercel.app/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoadingLogin(false);
      setErrorLogin(json.error);
    }
    if (response.ok) {
      setIsLoadingLogin(false);
      dispatch(loginUser(json));
    }
  };
  return { login, isLoadingLogin, errorLogin };
};
