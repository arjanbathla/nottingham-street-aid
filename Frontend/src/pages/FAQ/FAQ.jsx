import React from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom"; // Import Link for navigation
import classes from "./FAQ.module.css";  // Import the CSS module

const FAQ = () => {
    return (
        <Container>
            <section className={classes.faqSection}>
                <h2 className={classes.title}>Frequently Asked Questions</h2>
                <div className={classes.faqItem}>
                    <h3>Q: Can charitable organisations register with Nottingham Street Aid?</h3>
                    <p>A: Yes, charitable organisations can register with Nottingham Street Aid in order to apply for grants to help their beneficiaries.</p>
                </div>

                <div className={classes.faqItem}>
                    <h3>Q: How much can registered organisations apply for in grants?</h3>
                    <p>A: Registered organisations can apply for grants of up to £750 to support individuals to move away from life on the streets.</p>
                </div>

                <div className={classes.faqItem}>
                    <h3>Q: What does Nottingham Street Aid believe in?</h3>
                    <p>A: We believe in change. Our goal is to make life better for people who are either street homeless or on the brink of it. We firmly believe that change is possible, and we are here to make it happen, but we cannot do it alone. When you donate to Nottingham Street Aid, you are providing hope. Your contributions go towards grants that directly impact the lives of rough sleepers, helping with practical needs like transportation, housing deposits, and training resources.</p>
                </div>

                <div className={classes.faqItem}>
                    <h3>Q: How does Nottingham Street Aid work?</h3>
                    <p>A: Members of the public donate to the Nottingham Street Aid fund. An independent panel reviews applications and makes grants. The referring charity purchases items that will help the individual avoid living on the streets.</p>
                </div>

                <div className={classes.contactUs}>
                    <h3>Contact Us</h3>
                    <p>If you have more questions or need assistance, feel free to <Link to="/ContactUs">contact us</Link>.</p>
                </div>
            </section>
        </Container>
    );
};

export default FAQ;
