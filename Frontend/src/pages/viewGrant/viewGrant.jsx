import React, { useState, useEffect } from "react";
import classes from "./viewGrant.module.css";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewGrant = () => {
    const { grant } = useSelector((state) => state.grant);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch grant data or handle side effects
        setIsLoading(false);
    }, [grant]);

    const deleteGrant = async () => {
        try {
            const grantId = grant._id; // Assuming the grant object has the ID
            const response = await fetch(
                `${import.meta.env.VITE_API_HOST || "http://localhost:8999"}/api/grant/${grantId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error deleting grant");
            }

            alert("Grant deleted successfully");
            navigate("/dashboard");
        } catch (error) {
            setError(error.message || "Unknown error");
            alert("Error deleting grant: " + (error.message || "Unknown error"));
        }
    };

    if (isLoading) {
        return <Container maxWidth="lg"><h3>Loading...</h3></Container>;
    }

    if (error) {
        return <Container maxWidth="lg"><h3>Error: {error}</h3></Container>;
    }

    return (
        <Container maxWidth="lg">
            <section className={classes.section}>
                {!grant ? (
                    <div className={classes.grant}>
                        <h3>No Grant To Display</h3>
                    </div>
                ) : (
                    <>
                        <section className={classes.section}>
                            <div className={classes.grant}>
                                <h3>Beneficiary Details</h3>
                                <p>{grant.benTitle} {grant.benFirstName} {grant.benLastName}</p>
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
                                <p>{grant.altTitle} {grant.altFirstName} {grant.altLastName}</p>
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
                                <p>Time in Nottingham: {grant.benTimeInNottingham}</p>
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
                                <p>Item 1: £{grant.grantItemCost1} - {grant.grantItemDetails1}</p>
                                <p>Item 2: £{grant.grantItemCost2} - {grant.grantItemDetails2}</p>
                                <p>Item 3: £{grant.grantItemCost3} - {grant.grantItemDetails3}</p>
                                <p>Item 4: £{grant.grantItemCost4} - {grant.grantItemDetails4}</p>
                                <p>Item 5: £{grant.grantItemCost5} - {grant.grantItemDetails5}</p>
                            </div>

                            <div className={classes.grant}>
                                <h3>Preferences</h3>
                                <p>Contact: {grant.prefContactMethod}</p>
                                <p>Communication: {grant.prefCommunication}</p>
                                <p>Share Data: {grant.prefDataSharing}</p>
                            </div>

                            <div className={classes.grant}>
                                <h3>Consent</h3>
                                <p>Beneficiary Consent: {grant.benConsent}</p>
                                <p>Organisation Consent: {grant.confirmApplication}</p>
                            </div>

                            {/* Button to delete the grant */}
                            <div className={classes.grant}>
                                <button onClick={deleteGrant}>Delete Grant</button>
                            </div>
                        </section>
                    </>
                )}
            </section>
        </Container>
    );
};

export default ViewGrant;
