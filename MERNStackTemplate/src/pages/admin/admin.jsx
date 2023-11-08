import React, { useEffect, useState } from "react";
import classes from "./admin.module.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setGrants } from "../../contextStore/grantsStore";
import { setGrant } from "../../contextStore/grantStore";

import { Container } from "@mui/material";
import Button from "../../components/button/button";
import Button2 from "../../components/button2/button2";
import Loader from "../../components/loader/loader";

import CryptoJS from "crypto-js";

const admin = () => {
  const { admin } = useSelector((state) => state.admin);
  // const { grants } = useSelector((state) => state.grants);
  const [grants, setGrantsLocal] = useState()

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGrants = async () => {
      const response = await fetch(
        "https://notts-street-aid-backend.vercel.app/api/admin",
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch(setGrants(json));
        setGrantsLocal(json)
      }
    };

    if (admin) {
      fetchGrants();
    }
  }, [dispatch, admin]);

  const navigate = useNavigate();

  const viewMoreHandler = (grant) => {
    if (grant) {
      dispatch(setGrant(grant));
      navigate("/ViewAdminGrant");
    }
  };

  // Initialize 'downloadData' state with a default value of null
  const [downloadData, setDownloadData] = useState(null);

  // This useEffect generates and triggers a CSV download when 'downloadData' is not null.
  useEffect(() => {
    if (!downloadData) return;

    // Create the CSV content by converting the data into a CSV format
    const header = Object.keys(downloadData[0]).join(",");
    const csvContent = [header]
      .concat(downloadData.map((item) => Object.values(item).join(",")))
      .join("\n");

    // Create a Blob containing the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a URL for the Blob and prepare a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grant_data.csv";

    // Simulate a click on the download link to trigger the download
    a.click();

    // Revoke the URL to free up resources
    window.URL.revokeObjectURL(url);

    // Reset 'downloadData' to null after the download is triggered
    setDownloadData(null);
  }, [downloadData]);

  //For future devs i would advise you create a function that generates a secret key for extra security, this is just a placeholder
  const SECRET_KEY = "your-secret-key";

  // This function encrypts the given 'data' using the AES encryption algorithm
  // with a secret key ('SECRET_KEY') and returns the encrypted data as a string.
  function encrypt(data) {
    if (data != "") {
      return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    }
  }

  const handleCsvDownload = () => {
    // Check if 'grants' data is available
    if (grants) {
      // Map 'grants' data to create a new array of encrypted grant data (encryption applied to personal details)
      const allGrantData = grants.map((grant) => ({
        benTitle: encrypt(grant.benTitle),
        benFirstName: encrypt(grant.benFirstName),
        benLastName: encrypt(grant.benLastName),
        benEmail: encrypt(grant.benEmail),
        benTelephone: grant.benTelephone,
        benAbode: grant.benAbode,
        benAddressLine1: grant.benAddressLine1,
        benAddressLine2: grant.benAddressLine2,
        benTown: grant.benTown,
        altTitle: encrypt(grant.altTitle),
        altFirstName: encrypt(grant.altFirstName),
        altLastName: encrypt(grant.altLastName),
        altRole: grant.altRole,
        altEmail: encrypt(grant.altEmail),
        altTelephone: grant.altTelephone,
        altAddressLine1: grant.altAddressLine1,
        altAddressLine2: grant.altAddressLine2,
        altCounty: grant.altCounty,
        altPostcode: grant.altPostcode,
        sharedSignedLink: grant.sharedSignedLink,
        prefContactMethod: grant.prefContactMethod,
        prefCommunicationMethod: grant.prefCommunicationMethod,
        prefDataSharing: grant.prefDataSharing,
        benAgeRange: grant.benAgeRange,
        benDob: grant.benDob,
        benGen: grant.benGen,
        benSex: grant.benSex,
        benEthnicity: grant.benEthnicity,
        benReligion: grant.benReligion,
        benDisability: grant.benDisability,
        benDisabilityExtra: grant.benDisabilityExtra,
        benMarital: grant.benMarital,
        benDependants: grant.benDependants,
        benPregnancy: grant.benPregnancy,
        numOfDependants: grant.numOfDependants,
        ageOfDependants: grant.ageOfDependants,
        dependantInformation: grant.dependantInformation,
        currentAccom: grant.currentAccom,
        benCurrentAccomLength: grant.benCurrentAccomLength,
        benHistOfHomelessness: grant.benHistOfHomelessness,
        benHistDetails: grant.benHistDetails,
        benTimeInNottingham: grant.benTimeInNottingham,
        benLinktoNottingham: grant.benLinktoNottingham,
        benLinkDetails: grant.benLinkDetails,
        benGrantReason: grant.benGrantReason,
        grantDetails: grant.grantDetails,
        benStory: grant.benStory,
        grantAmountTotal: grant.grantAmountTotal,
        grantItemCost1: grant.grantItemCost1,
        grantItemDetails1: grant.grantItemDetails1,
        grantItemCost2: grant.grantItemCost2,
        grantItemDetails2: grant.grantItemDetails2,
        grantItemCost3: grant.grantItemCost3,
        grantItemDetails3: grant.grantItemDetails3,
        grantItemCost4: grant.grantItemCost4,
        grantItemDetails4: grant.grantItemDetails4,
        grantItemCost5: grant.grantItemCost5,
        grantItemDetails5: grant.grantItemDetails5,
        grantQuoteLink: grant.grantQuoteLink,
        grantSupportingDoc: grant.grantSupportingDoc,
        submissionDate: grant.submissionDate,
      }));

      // Set the 'downloadData' state with the array of encrypted grant data
      setDownloadData(allGrantData);
    }
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.section}>
        <div className={classes.dashboard}>
          <div className={classes.dashboardHeader}>
            <h2>Admin Dashboard</h2>
            <Button clicked={handleCsvDownload}>Download Data As CSV</Button>
          </div>
        </div>

        <div className={classes.kanban}>
          <div className={classes.dashboard}>
            <div className={classes.dashboardHeader}>
              <h2>Pending Grants</h2>
            </div>
            <div className={classes.kanbanContent}>
              {!grants && <Loader loading={true} />}
              {grants &&
                grants.map(
                  (grant) =>
                    grant.grantStatus == "Pending" && (
                      <div className={classes.grantItem} key={grant._id}>
                        <h3>
                          {grant.benTitle} {grant.benFirstName}{" "}
                          {grant.benLastName}
                        </h3>
                        <div>
                          <p>Email - {grant.benEmail}</p>
                          <p>Telephone - {grant.benTelephone}</p>
                          <br></br>
                          <p>Reason - {grant.benGrantReason}</p>
                          <p>Details - {grant.grantDetails}</p>
                          <p>Amount - £{grant.grantAmountTotal}</p>
                          <br></br>
                          <p>{grant.createdAt}</p>
                          <p>{grant.grantStatus}</p>
                        </div>
                        <Button2 clicked={(e) => viewMoreHandler(grant)}>
                          View More
                        </Button2>
                      </div>
                    )
                )}
            </div>
          </div>

          <div className={classes.dashboard}>
            <div className={classes.dashboardHeader}>
              <h2>Approved Grants</h2>
            </div>
            <div className={classes.kanbanContent}>
              {!grants && <Loader loading={true} />}
              {grants &&
                grants.map(
                  (grant) =>
                    grant.grantStatus == "Approved" && (
                      <div className={classes.grantItem} key={grant._id}>
                        <h3>
                          {grant.benTitle} {grant.benFirstName}{" "}
                          {grant.benLastName}
                        </h3>
                        <div>
                          <p>Email - {grant.benEmail}</p>
                          <p>Telephone - {grant.benTelephone}</p>
                          <br></br>
                          <p>Reason - {grant.benGrantReason}</p>
                          <p>Details - {grant.grantDetails}</p>
                          <p>Amount - £{grant.grantAmountTotal}</p>
                          <br></br>
                          <p>{grant.createdAt}</p>
                          <p>{grant.grantStatus}</p>
                        </div>
                        <Button2 clicked={(e) => viewMoreHandler(grant)}>
                          View More
                        </Button2>
                      </div>
                    )
                )}
            </div>
          </div>

          <div className={classes.dashboard}>
            <div className={classes.dashboardHeader}>
              <h2>Rejected Grants</h2>
            </div>
            <div className={classes.kanbanContent}>
              {!grants && <Loader loading={true} />}
              {grants &&
                grants.map(
                  (grant) =>
                    grant.grantStatus == "Rejected" && (
                      <div className={classes.grantItem} key={grant._id}>
                        <h3>
                          {grant.benTitle} {grant.benFirstName}{" "}
                          {grant.benLastName}
                        </h3>
                        <div>
                          <p>Email - {grant.benEmail}</p>
                          <p>Telephone - {grant.benTelephone}</p>
                          <br></br>
                          <p>Reason - {grant.benGrantReason}</p>
                          <p>Details - {grant.grantDetails}</p>
                          <p>Amount - £{grant.grantAmountTotal}</p>
                          <br></br>
                          <p>{grant.createdAt}</p>
                          <p>{grant.grantStatus}</p>
                        </div>
                        <Button2 clicked={(e) => viewMoreHandler(grant)}>
                          View More
                        </Button2>
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default admin;
