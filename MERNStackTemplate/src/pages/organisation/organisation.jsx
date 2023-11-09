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

import GUIDE from "../../assets/NSA_Application_Guide.pdf"

const organisation = () => {
  const { user } = useSelector((state) => state.user);
  // const { grants } = useSelector((state) => state.grants);
  const [grants, setGrantsLocal] = useState()

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
        setGrantsLocal(json)
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
    if(grant){
      dispatch(setGrant(grant))
      navigate("/ViewGrant")
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

          <div className={classes.dashboardContent}>
            {!grants && <Loader loading={true} />}
            {grants &&
              grants.map((grant) => (
                <div className={classes.grantItem} key={grant._id}>
                  <h3 className={classes.subTitle}>
                    {grant.benTitle} {grant.benFirstName} {grant.benLastName}
                  </h3>
                  <p>Status - {grant.grantStatus}</p>
                  <Button2 clicked={(e) => viewMoreHandler(grant)}>
                    View More
                  </Button2>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default organisation;
