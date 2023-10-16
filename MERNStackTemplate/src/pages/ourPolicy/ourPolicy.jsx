import React from "react";
import classes from "./ourPolicy.module.css";

import Container from "@mui/material/Container";

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
              <a href="">Link to our GDPR policy.</a>
            </div>
            <div className={classes.policyCard}>
              <h3 className={classes.subTitle}>Privacy Policy</h3>
              <p>How we handle your data and ensure privacy.</p>
              <a href="">Link to our privacy policy notice.</a>
            </div>
            <div className={classes.policyCard}>
              <h3 className={classes.subTitle}>Apply Guide</h3>
              <p>Step by step guide on how to apply for a grant.</p>
              <a href="">Link to our step by step grant application guide.</a>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ourPolicy;
