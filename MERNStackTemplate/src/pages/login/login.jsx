import { React, useState } from "react";
import classes from "./login.module.css";

import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import Container from "@mui/material/Container";
import Button from "../../components/button/button";

const login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { login, isLoadingLogin, errorLogin } = useLogin();
  const navigate = useNavigate();

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    navigate("/Register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(user, pass);
  };

  return (
    <Container maxWidth="lg">
      <section className={classes.section}>
        <div className={classes.formSection}>
          <form className={classes.form} onSubmit={handleLogin}>
            <h2>Login</h2>

            <div className={classes.inputBlock}>
              <label className={classes.inputLabel}>Email *</label>
              <input
                type="email"
                placeholder="Eg. JohnDoe@email.com"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                required
              />
            </div>

            <div className={classes.inputBlock}>
              <label className={classes.inputLabel}>Password *</label>
              <div className={classes.passwordBlock}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Eg. Password123#"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  required
                />
                <Button clicked={handleClickShowPassword}>
                  {showPass ? "Hide" : "Show"}
                </Button>
              </div>
            </div>

            <div className={classes.buttonBlock}>
              <Button type="submit" disable={isLoadingLogin}>
                Login
              </Button>
              <Button clicked={handleRegister}>Register With Us Today</Button>
              <div>
                <p>Demo user</p>
                <p>asd@asd.com</p>
                <p>ASDasd_123</p>
              </div>
            </div>

            {errorLogin && <p className={classes.errorMessage}>{errorLogin}</p>}
          </form>
        </div>
      </section>
    </Container>
  );
};

export default login;
