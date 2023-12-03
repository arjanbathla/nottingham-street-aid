import { React, useEffect, useState } from "react";
import classes from "./organisation.module.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setGrants } from "../../contextStore/grantsStore";
import { setGrant } from "../../contextStore/grantStore";

import Container from "@mui/material/Container";
import Button from "../../components/button/button";
import Button2 from "../../components/button2/button2";
import Loader from "../../components/loader/loader";

import GUIDE from "../../assets/NSA_Application_Guide.pdf";

const organisation = () => {
  const { user } = useSelector((state) => state.user);
  // const { grants } = useSelector((state) => state.grants);
  const [grants, setGrantsLocal] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGrants = async () => {
      const response = await fetch(
        "https://notts-street-aid-backend.vercel.app/api/organisation",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch(setGrants(json));
        setGrantsLocal(json);
      }
    };

    if (user) {
      fetchGrants();
    }
  }, [dispatch, user]);

  const navigate = useNavigate();

  const startNewGrant = () => {
    navigate("/GrantApplication");
  };

  const viewMoreHandler = (grant) => {
    if (grant) {
      dispatch(setGrant(grant));
      navigate("/ViewGrant");
    }
  };

  return (
    <Container maxWidth="lg">
      <section className={classes.section}>
        <div className={classes.dashboard}>
          <div className={classes.dashboardHeader}>
            <h2 className={classes.mainTitle}>Organisation Dashboard</h2>
            <div className={classes.addGrantBlock}>
              <Button clicked={startNewGrant}>Start New Grant</Button>
              <a href={GUIDE} target="_blank">
                <Button>Application Guide</Button>
              </a>
            </div>
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
      </section>
    </Container>
  );
};

export default organisation;
