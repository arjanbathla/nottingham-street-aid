import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGrants } from "../contextStore/grantsStore";

export const useUpdateStatus = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.admin);

  const [errorUpdateStatus, setErrorUpdateStatus] = useState(null);
  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] = useState(null);

  const updateStatus = async (grantId, status) => {
    setIsLoadingUpdateStatus(true);
    setErrorUpdateStatus(null);

    const response = await fetch(
      "https://notts-street-aid-backend.vercel.app/api/admin/updateStatus",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grantId,
          status,
        }),
      }
    );

    // console.log(status)

    const json = await response.json();

    if (!response.ok) {
      setIsLoadingUpdateStatus(false);
      setErrorUpdateStatus(json.error);
    }
    if (response.ok) {
      setIsLoadingUpdateStatus(false);
      dispatch(setGrants(json));
    }
  };
  return { updateStatus, isLoadingUpdateStatus, errorUpdateStatus };
};
