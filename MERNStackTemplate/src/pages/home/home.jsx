import React from "react";
import classes from "./home.module.css";

import Container from "@mui/material/Container";
import Navlink from "../../navigation/navlink/navlink";
import Button from "../../components/button/button";
import img1 from "../../assets/howWeWork.png";

const home = () => {
  return (
    <div>
      <section className={classes.section}>
        <div className={classes.sectionHero}>
          <div className={classes.heroOverlay}>
            <Container maxWidth="lg">
              <div className={classes.overlayText}>
                <h2 className={classes.mainTitle}>Together We Can Do More.</h2>
                <div className={classes.textGrid}>
                  <div className={classes.textInfo}>
                    <p>
                      Charitable organisations can register with Nottingham
                      Street Aid in order to apply for grants to help their
                      beneficiaries
                    </p>
                    <Navlink to="/Register">
                      <Button>Register Today</Button>
                    </Navlink>
                  </div>
                  <div className={classes.textInfo}>
                    <p>
                      Registered organisations can apply for grants of up to
                      £750 to support individuals to move away from life on the
                      streets
                    </p>
                    <Navlink to="/Login">
                      <Button>Apply For A Grant</Button>
                    </Navlink>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </section>

      <Container maxWidth="lg">
        <section className={classes.section}>
          <div className={classes.sectionBrief}>
            <h3 className={classes.subTitle}>We Believe In Change.</h3>
            <p>
              Here at Nottingham Street Aid, we believe in change. Our goal is
              to make life better for people who are either street homeless or
              on the brink of it. We firmly believe that change is possible, and
              we're here to make it happen, but we can't do it alone. We rely on
              the kindness of those who are willing to lend a helping hand. When
              you donate to Nottingham Street Aid, you're not just giving money;
              you're providing hope. Your contributions go towards grants that
              directly impact the lives of rough sleepers. These grants help
              with practical stuff like getting transportation passes, putting
              down deposits for housing, or getting the training and resources
              needed to find work and get back on their feet. Imagine what a
              difference that makes! With your support, we're not just providing
              short-term relief; we're offering a lifeline to a better future.
              It's about giving people a chance to rebuild their lives and
              regain their independence. So, join us in this mission for change.
              Your generosity can be the turning point in someone's life.
              Together, we can create a community where everyone has the
              opportunity to thrive.
            </p>
          </div>
        </section>

        <section className={classes.section}>
          <div className={classes.sectionAbout}>
            <h3 className={classes.subTitle}>How We Work.</h3>
            <img src={img1} alt={img1} className={classes.aboutImage} />
          </div>
        </section>
      </Container>
    </div>
  );
};

export default home;
