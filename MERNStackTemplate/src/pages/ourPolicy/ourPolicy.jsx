import React from "react";
import classes from "./ourPolicy.module.css";

import Container from "@mui/material/Container";
import GDPR_PDF from "../../assets/NSA_Data_Protection_Policy_GDPR.pdf"
import PN_PDF from "../../assets/NSA_Privacy_Notice.pdf"

const ourPolicy = () => {
  return (
    <Container maxWidth="lg">
      <section style={{ padding: "var(--padding-3)" }}>
        <div className={classes.policySection}>
          <h2 className={classes.mainTitle}>Our Policies & Guidance</h2>
          <div className={classes.policyContent}>
            <div className={classes.policyCard}>
              <h3 className={classes.subTitle}>GDPR</h3>
              <p>How we follow GDPR regulations and keep our users safe.</p>
              <a href={GDPR_PDF} target="_blank" className={classes.link}>Link To Our GDPR Policy.</a>
            </div>
            <div className={classes.policyCard}>
              <h3 className={classes.subTitle}>Privacy Policy</h3>
              <p>How we handle your data and ensure privacy.</p>
              <a href={PN_PDF} target="_blank" className={classes.link}>Link To Our Privacy Policy Statement.</a>
            </div>
            <div className={classes.policyCard}>
              <h3 className={classes.subTitle}>Apply Guide</h3>
              <p>Step by step guide on how to apply for a grant.</p>
              <a href={""} target="_blank" className={classes.link}>Link To Our Grant Application Guide.</a>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ourPolicy;
