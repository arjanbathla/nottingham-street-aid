import { React, useEffect, useState } from "react";
import classes from "./organisation.module.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setGrants } from "../../contextStore/grantsStore";
import { setGrant } from "../../contextStore/grantStore";

import Container from "@mui/material/Container";
import Button from "../../components/button/button";
import Button2 from "../../components/button2/button2";

const organisation = () => {
  const { user } = useSelector((state) => state.user);
  const { grants } = useSelector((state) => state.grants);

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
            <h2 className={classes.mainTitle}>All Grants</h2>
            <div className={classes.addGrantBlock}>
              <Button clicked={startNewGrant}>Start New Grant</Button>
              <a href={""} target="_blank">
                <Button>Application Guide</Button>
              </a>
            </div>
          </div>

          <div className={classes.dashboardContent}>
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

        {/* {grantViewKey && (
          <div className={classes.dashboard}>
            <div className={classes.grantItem} key={grantViewKey}>
              {grants &&
                grants.map(
                  (grant) =>
                    grant._id === grantViewKey && (
                      <div className={classes.grantItem} key={grant._id}>
                        <p>Status: {grant.grantStatus}</p>
                        <p>Title: {grant.benTitle}</p>
                        <p>FirstName: {grant.benFirstName}</p>
                        <p>LastName: {grant.benLastName}</p>
                        <p>Email: {grant.benEmail}</p>
                        <p>Telephone: {grant.benTelephone}</p>
                        <p>NoRelation: {grant.declaration}</p>
                        <p>Nottingham: {grant.benNotts}</p>
                        <p>FixedAbode: {grant.benAbode}</p>
                        <p>AddressLine1: {grant.benAddressLine1}</p>
                        <p>AddressLine2: {grant.benAddressLine2}</p>
                        <p>Town: {grant.benTown}</p>
                        <p>Title: {grant.altTitle}</p>
                        <p>FirstName: {grant.altFirstName}</p>
                        <p>LastName: {grant.altLastName}</p>
                        <p>Relation: {grant.altRole}</p>
                        <p>Email: {grant.altEmail}</p>
                        <p>Telephone: {grant.altTelephone}</p>
                        <p>AdressLine1: {grant.altAddressLine1}</p>
                        <p>AdressLine2: {grant.altAddressLine2}</p>
                        <p>County: {grant.altCounty}</p>
                        <p>Postcode: {grant.altPostcode}</p>
                        <p>Signed: {grant.sharedSignedLink}</p>
                        <p>Consent: {grant.benConsent}</p>
                        <p>PrefContactMethod: {grant.prefContactMethod}</p>
                        <p>
                          PrefCommunicationMethod: {grant.prefCommunication}
                        </p>
                        <p>PrefDataSharing: {grant.prefDataSharing}</p>
                        <p>AgeRange: {grant.benAgeRange}</p>
                        <p>DOB: {grant.benDob}</p>
                        <p>Gender: {grant.benGen}</p>
                        <p>Sex: {grant.benSex}</p>
                        <p>Ethnicity: {grant.benEthnicity}</p>
                        <p>Religion: {grant.benReligion}</p>
                        <p>Disability: {grant.benDisability}</p>
                        <p>DisabilityDescription: {grant.benDisabilityExtra}</p>
                        <p>Marital: {grant.benMarital}</p>
                        <p>Pregnant: {grant.benPregnancy}</p>
                        <p>Dependants: {grant.benDependants}</p>
                        <p>NumberOfDependants: {grant.numOfDependants}</p>
                        <p>AgeOfDependants: {grant.ageOfDependants}</p>
                        <p>CurrentAccomodation: {grant.currentAccom}</p>
                        <p>
                          LengthInAccomodation: {grant.benCurrentAccomLength}
                        </p>
                        <p>History: {grant.benHistOfHomelessness}</p>
                        <p>HistoryDetails: {grant.benHistDetails}</p>
                        <p>TimeInNottingham: {grant.benTimeInNottingham}</p>
                        <p>LinkToNottingham: {grant.benLinktoNottingham}</p>
                        <p>LinkDetails: {grant.benLinkDetails}</p>
                        <p>Reason: {grant.benGrantReason}</p>
                        <p>Details: {grant.grantDetails}</p>
                        <p>Story: {grant.benStory}</p>
                        <p>TotalAmount: {grant.grantAmountTotal}</p>
                        <p>Item1Cost: {grant.grantItemCost1}</p>
                        <p>Item1Details: {grant.grantItemDetails1}</p>
                        <p>Item2Cost: {grant.grantItemCost2}</p>
                        <p>Item2Details: {grant.grantItemDetails2}</p>
                        <p>Item3Cost: {grant.grantItemCost3}</p>
                        <p>Item3Details: {grant.grantItemDetails3}</p>
                        <p>Item4Cost: {grant.grantItemCost4}</p>
                        <p>Item4Details: {grant.grantItemDetails4}</p>
                        <p>Item5Cost: {grant.grantItemCost5}</p>
                        <p>Item5Details: {grant.grantItemDetails5}</p>
                        <p>{grant.grantQuoteLink}</p>
                        <p>{grant.confirmApplication}</p>
                        <Button clicked={(e) => setGrantViewKey(false)}>
                          Close Full View
                        </Button>
                      </div>
                    )
                )}
            </div>
          </div>
        )} */}
      </section>
    </Container>
  );
};

export default organisation;
