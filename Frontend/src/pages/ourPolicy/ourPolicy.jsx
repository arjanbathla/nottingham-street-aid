import classes from "./ourPolicy.module.css";
import Container from "@mui/material/Container";
import GDPR_PDF from "../../assets/NSA_Data_Protection_Policy_GDPR.pdf";
import PN_PDF from "../../assets/NSA_Privacy_Notice.pdf";
import GUIDE from "../../assets/NSA_Application_Guide.pdf";
import COOKIE_POLICY_PDF from "../../assets/cookies policy.pdf"; // Import your cookie policy PDF

const OurPolicy = () => {
  return (
      <Container maxWidth="lg">
        <section style={{ padding: "var(--padding-3)" }}>
          <div className={classes.policySection}>
            <h2 className={classes.mainTitle}>Our Policies & Guidance</h2>
            <div className={classes.policyContent}>
              <div className={classes.policyCard}>
                <h3 className={classes.subTitle}>GDPR</h3>
                <p>How we follow GDPR regulations and keep our users safe.</p>
                <a href={GDPR_PDF} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  Link To Our GDPR Policy.
                </a>
              </div>
              <div className={classes.policyCard}>
                <h3 className={classes.subTitle}>Privacy Policy</h3>
                <p>How we handle your data and ensure privacy.</p>
                <a href={PN_PDF} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  Link To Our Privacy Policy Statement.
                </a>
              </div>
              <div className={classes.policyCard}>
                <h3 className={classes.subTitle}>Cookie Policy</h3>
                <p>Information on how we use cookies to enhance your experience.</p>
                <a href={COOKIE_POLICY_PDF} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  Link To Our Cookie Policy.
                </a>
              </div>
              <div className={classes.policyCard}>
                <h3 className={classes.subTitle}>Apply Guide</h3>
                <p>Step by step guide on how to apply for a grant.</p>
                <a href={GUIDE} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  Link To Our Grant Application Guide.
                </a>
              </div>
            </div>
          </div>
        </section>
      </Container>
  );
};

export default OurPolicy;
