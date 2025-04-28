import { React, useState } from "react";
import classes from "./login.module.css";

import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import Container from "@mui/material/Container";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";

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
            <h2 className={classes.mainTitle}>Login</h2>

            <div className={classes.multiInputBlock}>
              <div className={classes.inputBlock}>
                <label className={classes.inputLabel}>Email *</label>
                <input
                  maxLength={50}
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
                    maxLength={30}
                    type={showPass ? "text" : "password"}
                    placeholder="Eg. Password123#"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    // pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
                    required
                  />
                  <Button clicked={handleClickShowPassword}>
                    {showPass ? "Hide" : "Show"}
                  </Button>
                </div>
                <label className={classes.passwordLabel}>
                  At least 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol and 8 Characters.
                </label>
                <a onClick={handleRegister} className={classes.link}>
                  Not Registered? Click Here To Register.
                </a>
              </div>
            </div>
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgot-password");
              }}
              className={classes.link}
            >
              Forgot Password?
            </a>           
            <div className={classes.buttonBlock}>
              <Button type="submit" disable={isLoadingLogin}>
                Login
              </Button>
              {isLoadingLogin && <Loader loading={isLoadingLogin} />}

              {/* <div>
                <p>asd@asd.com</p>
                <p>ASDasd_123#</p>
              </div> */}
            </div>
            {errorLogin && <p className={classes.errorMessage}>{errorLogin}</p>}
          </form>
        </div>
      </section>
    </Container>
  );
};

export default login;
