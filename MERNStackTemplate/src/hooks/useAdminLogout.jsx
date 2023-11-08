import { useDispatch } from "react-redux";
import { logoutAdmin } from "../contextStore/adminStore";

export const useAdminLogout = () => {
  const dispatch = useDispatch();

  const adminLogout = () => {
    // localStorage.removeItem("currentSectionGrantForm");
    // localStorage.removeItem("currentSectionRegForm");
    dispatch(logoutAdmin());
  };

  return { adminLogout };
};
