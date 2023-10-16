import React from "react";

import Container from "@mui/material/Container";
import EmailForm from "../../components/emailForm/emailForm";

const contactUs = () => {
  return (
    <Container>
      <section style={{padding: "var(--padding-3)"}}>
        <EmailForm />
      </section>
    </Container>
  );
};

export default contactUs;
