import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../contextStore/adminStore";

export const useAdminLogin = () => {
  const dispatch = useDispatch();

  const [errorAdminLogin, setErrorAdminLogin] = useState(null);
  const [isLoadingAdminLogin, setIsLoadingAdminLogin] = useState(null);

  const adminLogin = async (username, password) => {
    setIsLoadingAdminLogin(true);
    setErrorAdminLogin(null);

    const apiHost = import.meta.env.VITE_API_HOST || "https://notts-street-aid-backend.vercel.app";
    const apiEndpoint = "/api/adminLogin";
    const apiUrl = apiHost + apiEndpoint;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoadingAdminLogin(false);
      setErrorAdminLogin(json.error);
    }
    if (response.ok) {
      setIsLoadingAdminLogin(false);
      dispatch(loginAdmin(json));
    }
  };
  return { adminLogin, isLoadingAdminLogin, errorAdminLogin };
};
