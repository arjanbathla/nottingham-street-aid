// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "../../components/button/button";
import classes from "./forgotPassword.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const body = await res.json();
    if (res.ok) setStatus({ type: "success", msg: body.message });
    else setStatus({ type: "error", msg: body.error });
  };

  return (
    <Container maxWidth="sm">
      <form className={classes.form} onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <div className={classes.inputBlock}>
          <label>Email *</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit">Send Reset Link</Button>
        {status && (
          <p className={status.type === "error" ? classes.error : classes.success}>
            {status.msg}
          </p>
        )}

        <a onClick={() => navigate("/login")} className={classes.link}>
          Back to Login
        </a>
      </form>
    </Container>
  );
}
