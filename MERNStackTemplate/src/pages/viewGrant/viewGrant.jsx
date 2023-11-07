import React from "react";
import classes from "./viewGrant.module.css";

import { Container } from "@mui/material";

import { useSelector } from "react-redux";

const viewGrant = () => {
  const { grant } = useSelector((state) => state.grant);

  return (
    <Container maxWidth="lg">
      <section className={classes.section}>
        {/* <div className={classes.grant}>
          {grant && Object.entries(grant).map(([key, value]) => (
            <p key={key}>{key} : {value}</p>
          ))}
        </div> */}

        {!grant && (
            <section className={classes.section}>
                <div className={classes.grant}>
                    <h3>No Grant To Display</h3>
                </div>
            </section>
        )}

        {grant && (
          <section className={classes.section}>
            <div className={classes.grant}>
              <h3>Beneficiary Details</h3>
              <p>
                Name: {grant.benTitle} - {grant.benFirstName} -{" "}
                {grant.benLastName}
              </p>
              <p>Email: {grant.benEmail}</p>
              <p>Telephone: {grant.benTelephone}</p>
            </div>

            <div className={classes.grant}>
              <h3>Beneficiary Address</h3>
              <p>Nottingham: {grant.benNotts}</p>
              <p>Fixed Abode: {grant.benAbode}</p>
              <p>Address Line 1: {grant.benAddressLine1}</p>
              <p>Address Line 2: {grant.benAddressLine2}</p>
              <p>Town: {grant.benTown}</p>
            </div>

            <div className={classes.grant}>
              <h3>Alternative Contacts</h3>
              <p>
                Name: {grant.altTitle} - {grant.altFirstName} -{" "}
                {grant.altLastName}
              </p>
              <p>Role: {grant.altRole}</p>
              <p>Email: {grant.altEmail}</p>
              <p>Telephone: {grant.altTelephone}</p>
            </div>

            <div className={classes.grant}>
              <h3>Alternative Address</h3>
              <p>Address Line 1: {grant.altAddressLine1}</p>
              <p>Address Line 2: {grant.altAddressLine2}</p>
              <p>County: {grant.altCounty}</p>
              <p>Postcode: {grant.altPostcode}</p>
            </div>

            <div className={classes.grant}>
              <h3>Declaration</h3>
              <p>Sign: {grant.sharedSignedLink}</p>
            </div>

            <div className={classes.grant}>
              <h3>Preferences</h3>
              <p>Contact: {grant.prefContactMethod}</p>
              <p>Communication: {grant.prefCommunication}</p>
              <p>Share Data: {grant.prefDataSharing}</p>
            </div>

            <div className={classes.grant}>
              <h3>Beneficiary Characteristics</h3>
              <p>Age Range: {grant.benAgeRange}</p>
              <p>Date of Birth: {grant.benDob}</p>
              <p>Gender: {grant.benGen}</p>
              <p>Sex: {grant.benSex}</p>
              <p>Ethnicity: {grant.benEthnicity}</p>
              <p>Religion: {grant.benReligion}</p>
              <p>Disability: {grant.benDisability}</p>
              <p>Description: {grant.benDisabilityExtra}</p>
            </div>

            <div className={classes.grant}>
              <h3>Beneficiary Relations</h3>
              <p>Married: {grant.benMarital}</p>
              <p>Pregnant: {grant.benPregnancy}</p>
              <p>Dependents: {grant.benDependants}</p>
              <p>Number of Dependents: {grant.numOfDependants}</p>
              <p>Age of Dependents: {grant.ageOfDependants}</p>
            </div>

            <div className={classes.grant}>
              <h3>Beneficiary Situations</h3>
              <p>Accommodation: {grant.currentAccom}</p>
              <p>Current Stay: {grant.benCurrentAccomLength}</p>
              <p>History: {grant.benHistOfHomelessness}</p>
              <p>History Details: {grant.benHistDetails}</p>
              <p>Time in Nottingham:{grant.benTimeInNottingham}</p>
              <p>Links to Nottingham: {grant.benLinkToNottingham}</p>
              <p>Link details: {grant.benLinkDetails}</p>
            </div>

            <div className={classes.grant}>
              <h3>Beneficiary Reason</h3>
              <p>Reason: {grant.benGrantReason}</p>
              <p>Details: {grant.grantDetails}</p>
              <p>Story: {grant.benStory}</p>
            </div>

            <div className={classes.grant}>
              <h3>Grant Amount</h3>
              <p>Total Amount: £{grant.grantAmountTotal}</p>
              <p>
                Item 1: £{grant.grantItemCost1} - {grant.grantItemDetails1}
              </p>
              <p>
                Item 2: £{grant.grantItemCost2} - {grant.grantItemDetails2}
              </p>
              <p>
                Item 3: £{grant.grantItemCost3} - {grant.grantItemDetails3}
              </p>
              <p>
                Item 4: £{grant.grantItemCost4} - {grant.grantItemDetails4}
              </p>
              <p>
                Item 5: £{grant.grantItemCost5} - {grant.grantItemDetails5}
              </p>
              <p>Quote: {grant.grantQuoteLink}</p>
            </div>
          </section>
        )}
      </section>
    </Container>
  );
};

export default viewGrant;
