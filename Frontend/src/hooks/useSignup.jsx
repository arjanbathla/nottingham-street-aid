// frontend/src/hooks/useSignup.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../contextStore/userStore";
import validator from "validator";

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

    // Client-side email validation
    if (!validator.isEmail(username)) {
      setErrorSignup("Invalid username email format");
      setIsLoadingSignup(false);
      return;
    }
    if (!validator.isEmail(orgEmail)) {
      setErrorSignup("Invalid organization email format");
      setIsLoadingSignup(false);
      return;
    }
    if (!validator.isEmail(contact1Email)) {
      setErrorSignup("Invalid primary contact email format");
      setIsLoadingSignup(false);
      return;
    }
    // Validate contact2Email if secondContact is true (i.e., fields are provided)
    if (contact2Email && !validator.isEmail(contact2Email)) {
      setErrorSignup("Invalid secondary contact email format");
      setIsLoadingSignup(false);
      return;
    }
    // Validate contact3Email if financeContact is true (i.e., fields are provided)
    if (contact3Email && !validator.isEmail(contact3Email)) {
      setErrorSignup("Invalid finance contact email format");
      setIsLoadingSignup(false);
      return;
    }

    const apiHost =
      import.meta.env.VITE_API_HOST || "https://notts-street-aid-backend.vercel.app";
    const response = await fetch(`${apiHost}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userStatus: "Pending", // Added as per authModel.js requirement
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
        commsPref: commsPref.toString(),
        dataPref: dataPref.toString(),
        newsletterPref: newsletterPref.toString(),
        bulletinPref: bulletinPref.toString(),
        tsAndCs: tsAndCs.toString(),
      }),
    });

    const json = await response.json();

    setIsLoadingSignup(false);
    if (response.ok) {
      dispatch(loginUser(json));
    } else {
      setErrorSignup(json.error);
    }
  };
  return { signup, isLoadingSignup, errorSignup };
};