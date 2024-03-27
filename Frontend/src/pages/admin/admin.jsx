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
import Papa from 'papaparse';

const admin = () => {
  const { admin } = useSelector((state) => state.admin);
  const [grants, setGrantsLocal] = useState()
  const [auths, setAuthsLocal] = useState()

  const dispatch = useDispatch();

  useEffect(() => {
    const apiHost = import.meta.env.VITE_API_HOST || "https://notts-street-aid-backend.vercel.app";
    const apiEndpoint = "/api/admin";
    const apiUrl = apiHost + apiEndpoint;

    const fetchGrants = async () => {
      const response = await fetch(
        apiUrl,
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

  useEffect(() => {
    const apiHost = import.meta.env.VITE_API_HOST || "https://notts-street-aid-backend.vercel.app";
    const apiEndpoint = "/api/admin/auths";
    const apiUrl = apiHost + apiEndpoint;

    const fetchAuths = async () => {
      const response = await fetch(
        apiUrl,
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
//         dispatch(setGrants(json));
        setAuthsLocal(json)
//        console.log(json)
      }
    };

    if (admin) {
      fetchAuths();
    }
  }, [dispatch, admin]);

  const navigate = useNavigate();

  const viewMoreHandler = (grant) => {
    if (grant) {
      dispatch(setGrant(grant));
      navigate("/ViewAdminGrant");
    }
  };

  const viewMoreOrgHandler = (auth) => {
    if (auth) {
      //dispatch(setGrant(grant));
      navigate('/Organisation/${auth._id}');
    }
  };

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
    if (grants) {
      const csv = Papa.unparse(grants);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "grant_data.csv";
      a.click();
      window.URL.revokeObjectURL(url);
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

          <div className={classes.dashboard}>
            <div className={classes.dashboardHeader}>
              <h2>Organisations</h2>
            </div>
            <div className={classes.kanbanContent}>
              {!auths && <Loader loading={true} />}
              {auths &&
                auths.map(
                  (auth) =>
                      <div className={classes.grantItem} key={auth._id}>
                        <h3>
                          {auth.orgName}
                        </h3>
                        <div>
                          <p>Telephone - {auth.orgPhone}</p>
                          <p>Email - {auth.orgEmail}</p>
                          <p>Type - {auth.orgType}</p>
                        </div>
                        <Button2 clicked={(e) => viewMoreOrgHandler(auth)}>
                          View More
                        </Button2>
                      </div>
                    )
                }
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default admin;
