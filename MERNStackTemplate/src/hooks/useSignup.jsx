import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../contextStore/userStore";

export const useSignup = () => {
  const dispatch = useDispatch();

  const [errorSignup, setErrorSignup] = useState(null);
  const [isLoadingSignup, setIsLoadingSignup] = useState(null);

  const signup = async (
    username,
    password,
    orgName,
    orgAdr1,
    orgAdr2,
    orgTown,
    orgCounty,
    orgPostcode,
    orgEmail,
    orgPhone,
    orgWebsite,
    orgType,
    orgCharityNumber,
    orgHouseNumber,
    contact1Title,
    contact1Fname,
    contact1Lname,
    contact1Role,
    contact1Email,
    contact1Phone,
    contact2Title,
    contact2Fname,
    contact2Lname,
    contact2Role,
    contact2Email,
    contact2Phone,
    contact3Title,
    contact3Fname,
    contact3Lname,
    contact3Role,
    contact3Email,
    contact3Phone,
    commsPref,
    dataPref,
    newsletterPref,
    bulletinPref,
    tsAndCs
  ) => {
    setIsLoadingSignup(true);
    setErrorSignup(null);

    const response = await fetch(
      "https://notts-street-aid-backend.vercel.app/api/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          orgName,
          orgAdr1,
          orgAdr2,
          orgTown,
          orgCounty,
          orgPostcode,
          orgEmail,
          orgPhone,
          orgWebsite,
          orgType,
          orgCharityNumber,
          orgHouseNumber,
          contact1Title,
          contact1Fname,
          contact1Lname,
          contact1Role,
          contact1Email,
          contact1Phone,
          contact2Title,
          contact2Fname,
          contact2Lname,
          contact2Role,
          contact2Email,
          contact2Phone,
          contact3Title,
          contact3Fname,
          contact3Lname,
          contact3Role,
          contact3Email,
          contact3Phone,
          commsPref,
          dataPref,
          newsletterPref,
          bulletinPref,
          tsAndCs,
        }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoadingSignup(false);
      setErrorSignup(json.error);
    }
    if (response.ok) {
      dispatch(loginUser(json));
      setIsLoadingSignup(false);
    }
  };
  return { signup, isLoadingSignup, errorSignup };
};
