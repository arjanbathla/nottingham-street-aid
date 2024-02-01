import { useState } from "react";
import { setGrants } from "../contextStore/grantsStore";
import { useDispatch, useSelector } from "react-redux";

export const applyGrant = () => {
  const { user } = useSelector((state) => state.user);
  const { grants } = useSelector((state) => state.grants);
  const dispatch = useDispatch();

  const [errorGrant, setErrorGrant] = useState(null);
  const [isLoadingGrant, setIsLoadingGrant] = useState(null);

  const apply = async (
    benTitle,
    benFirstName,
    benLastName,
    benEmail,
    benTelephone,
    declaration,
    benNotts,
    benAbode,
    benAddressLine1,
    benAddressLine2,
    benTown,
    altTitle,
    altFirstName,
    altLastName,
    altRole,
    altEmail,
    altTelephone,
    altAddressLine1,
    altAddressLine2,
    altCounty,
    altPostcode,
    prefContactMethod,
    prefCommunication,
    prefDataSharing,
    benAgeRange,
    benDob,
    benGen,
    benSex,
    benEthnicity,
    benReligion,
    benDisability,
    benDisabilityExtra,
    benMarital,
    benPregnancy,
    benDependants,
    numOfDependants,
    ageOfDependants,
    currentAccom,
    benCurrentAccomLength,
    benHistOfHomelessness,
    benHistDetails,
    benTimeInNottingham,
    benLinkToNottingham,
    benLinkDetails,
    benGrantReason,
    grantDetails,
    benStory,
    grantAmountTotal,
    grantItemCost1,
    grantItemDetails1,
    grantItemCost2,
    grantItemDetails2,
    grantItemCost3,
    grantItemDetails3,
    grantItemCost4,
    grantItemDetails4,
    grantItemCost5,
    grantItemDetails5,
    benConsent,
    confirmApplication
  ) => {
    setIsLoadingGrant(true);
    setErrorGrant(null);

    if (!user) {
      setErrorGrant("You Must Be Logged In");
      return;
    }

    const apiHost = import.meta.env.VITE_API_HOST || "https://notts-street-aid-backend.vercel.app";
    const apiEndpoint = "/api/organisation/create";
    const apiUrl = apiHost + apiEndpoint;

    const response = await fetch(
      apiUrl,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          benTitle,
          benFirstName,
          benLastName,
          benEmail,
          benTelephone,
          declaration,
          benNotts,
          benAbode,
          benAddressLine1,
          benAddressLine2,
          benTown,
          altTitle,
          altFirstName,
          altLastName,
          altRole,
          altEmail,
          altTelephone,
          altAddressLine1,
          altAddressLine2,
          altCounty,
          altPostcode,
          prefContactMethod,
          prefCommunication,
          prefDataSharing,
          benAgeRange,
          benDob,
          benGen,
          benSex,
          benEthnicity,
          benReligion,
          benDisability,
          benDisabilityExtra,
          benMarital,
          benPregnancy,
          benDependants,
          numOfDependants,
          ageOfDependants,
          currentAccom,
          benCurrentAccomLength,
          benHistOfHomelessness,
          benHistDetails,
          benTimeInNottingham,
          benLinkToNottingham,
          benLinkDetails,
          benGrantReason,
          grantDetails,
          benStory,
          grantAmountTotal,
          grantItemCost1,
          grantItemDetails1,
          grantItemCost2,
          grantItemDetails2,
          grantItemCost3,
          grantItemDetails3,
          grantItemCost4,
          grantItemDetails4,
          grantItemCost5,
          grantItemDetails5,
          benConsent,
          confirmApplication
        }),
      }
    );

    const json = await response.json();

    setIsLoadingGrant(false);
    if (response.ok) {
      dispatch(setGrants(json));
    } else {
      setErrorGrant(json.error);
    }
  };
  return { apply, isLoadingGrant, errorGrant };
};
