import { useDispatch } from "react-redux";
import { logoutUser } from "../contextStore/userStore";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    // localStorage.removeItem("currentSectionGrantForm");
    // localStorage.removeItem("currentSectionRegForm");
    dispatch(logoutUser());
  };

  return { logout };
};
