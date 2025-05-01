import React from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import classes from "./FAQ.module.css";

const FAQ = () => {
  return (
    <Container>
      <section className={classes.faqSection}>
        <h2 className={classes.title}>Frequently Asked Questions</h2>

        <div className={classes.faqItem}>
          <h3>Q: What is Nottingham Street Aid?</h3>
          <p>
            A collaborative local fund that helps individuals experiencing street
            homelessness. Funds are used to provide personalised support like housing,
            transport, ID, clothing, or training.
          </p>
        </div>

        <div className={classes.faqItem}>
            <h3>Q: How can I donate?</h3>
            <p>
                You can donate securely via our official Nottingham Street Aid donation page.
                Every contribution supports personalised help for individuals experiencing homelessness.
            </p>
            <p>
            The donation platform is currently under development. Please check back soon or{" "}
            <Link to="/ContactUs">contact us</Link> for alternative ways to support.
        </p>

        </div>



        <div className={classes.faqItem}>
          <h3>Q: Where does my donation go?</h3>
          <p>
            100% of your donation is used for small grants that support people
            transitioning off the streets, including help with travel, housing
            essentials, or accessing training.
          </p>
        </div>

        <div className={classes.faqItem}>
            <h3>Q: Can individuals refer themselves for help?</h3>
            <p>
                Individuals cannot refer themselves directly, but they can seek support from a registered organisation.
                These partners will assess needs and submit a grant application on their behalf.{" "}
                <Link to="/ContactUs">Get in touch</Link> to find a referral partner near you.
            </p>
        </div>


        <div className={classes.faqItem}>
          <h3>Q: Can charitable organisations register?</h3>
          <p>
            Yes, local charities and organisations supporting street homeless
            individuals can register to apply for grants.{" "}
            <Link to="/Register">Click here to register</Link>.
          </p>
        </div>

        <div className={classes.faqItem}>
          <h3>Q: How much funding can be applied for?</h3>
          <p>
            Grants are available up to £750 to support a person’s move away from
            rough sleeping.
          </p>
        </div>

        <div className={classes.contactUs}>
          <h3>Need More Help?</h3>
          <p>
            If your question isn't listed or you need support,{" "}
            <Link to="/ContactUs">contact us</Link>.
          </p>
        </div>
      </section>
    </Container>
  );
};

export default FAQ;
