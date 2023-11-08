import { React, useState } from "react";
import classes from "./adminLogin.module.css";

import { useNavigate } from "react-router-dom";
import { useAdminLogin } from "../../hooks/useAdminLogin";

import Container from "@mui/material/Container";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";

const adminAdminLogin = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { adminLogin, isLoadingAdminLogin, errorAdminLogin } = useAdminLogin();

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    await adminLogin(user, pass);
  };

  return (
    <Container maxWidth="lg">
      <section className={classes.section}>
        <div className={classes.formSection}>
          <form className={classes.form} onSubmit={handleAdminLogin}>
            <h2 className={classes.mainTitle}>Admin Login</h2>

            <div className={classes.multiInputBlock}>
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
                    // pattern="^(?=.*\d.*\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$"
                    required
                  />
                  <Button clicked={handleClickShowPassword}>
                    {showPass ? "Hide" : "Show"}
                  </Button>
                </div>
                <label className={classes.passwordLabel}>
                  Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol and 8
                  Characters
                </label>
              </div>
            </div>

            <div className={classes.buttonBlock}>
              <Button type="submit" disable={isLoadingAdminLogin}>
                Login
              </Button>
              {isLoadingAdminLogin && <Loader loading={isLoadingAdminLogin} />}
              
              <div>
                <p>asd@asd.com</p>
                <p>ASDasd_123#</p>
              </div>
            </div>
            {errorAdminLogin && <p className={classes.errorMessage}>{errorAdminLogin}</p>}
          </form>
        </div>
      </section>
    </Container>
  );
};

export default adminAdminLogin;
