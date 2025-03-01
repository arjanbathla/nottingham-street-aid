import { useDispatch } from "react-redux";
import { logoutUser } from "../contextStore/userStore";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return { logout };
};
 