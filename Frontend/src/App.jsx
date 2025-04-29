import React, { useEffect, useState } from "react";
import "./App.css";
import { logoutUser } from "../src/contextStore/userStore";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "@fontsource-variable/jost";

import Layout from "./navigation/layout/layout";

import Home from "./pages/home/home";
import Register from "./pages/register/register";
import RegisterEdit from "./pages/register/register_edit";
import Login from "./pages/login/login";
import ContactUs from "./pages/contactUs/contactUs";
import OurPolicy from "./pages/ourPolicy/ourPolicy";
import FAQ from "./pages/FAQ/FAQ.jsx";
import MyProfile from "./pages/myProfile/myProfile";
import Organisation from "./pages/organisation/organisation";
import GrantApplication from "./pages/grantApplication/grantApplication";
import ViewGrant from "./pages/viewGrant/viewGrant";
import AdminLogin from "./pages/adminLogin/adminLogin";
import Admin from "./pages/admin/admin";
import ViewAdminGrant from "./pages/viewAdminGrant/viewAdminGrant";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showWarning, setShowWarning] = useState(false);
  let timeoutId = null;
  let warningId = null;

  useEffect(() => {
    const handleUserActivity = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (warningId) clearTimeout(warningId);
      setShowWarning(false);
      resetTimer();
    };

    const logoutAfterTimeout = () => {
      dispatch(logoutUser());
      navigate("/");
    };

    const resetTimer = () => {
      // Show warning after 4.5 minutes
      warningId = setTimeout(() => {
        setShowWarning(true);
      }, 270000); // 4.5 minutes

      // Logout after 5 minutes
      timeoutId = setTimeout(logoutAfterTimeout, 300000); // 5 minutes
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, handleUserActivity));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleUserActivity));
      if (timeoutId) clearTimeout(timeoutId);
      if (warningId) clearTimeout(warningId);
    };
  }, [dispatch, navigate]);

  let routes = (
    <Routes>
      <Route
        path="/"
        element={!user && !admin ? <Home /> : !admin ? <Navigate to="/Organisation" /> : <Navigate to="/Admin" />}
      />
      <Route
        path="/Register"
        element={!user && !admin ? <Register /> : !admin ? <Navigate to="/Organisation" /> : <Navigate to="/Admin" />}
      />
      <Route
        path="/Login"
        element={!user && !admin ? <Login /> : !admin ? <Navigate to="/Organisation" /> : <Navigate to="/Admin" />}
      />
      <Route
        path="/AdminLogin"
        element={!user && !admin ? <AdminLogin /> : !admin ? <Navigate to="/Organisation" /> : <Navigate to="/Admin" />}
      />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/OurPolicy" element={<OurPolicy />} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/Organisation" element={user ? <Organisation /> : <Navigate to="/" />} />
      <Route path="/Register/:id" element={<RegisterEdit />} />
      <Route path="/GrantApplication" element={user ? <GrantApplication /> : <Navigate to="/" />} />
      <Route path="/ViewGrant" element={user ? <ViewGrant /> : <Navigate to="/" />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/Admin" element={admin ? <Admin /> : <Navigate to="/" />} />
      <Route path="/ViewAdminGrant" element={admin ? <ViewAdminGrant /> : <Navigate to="/" />} />
    </Routes>
  );

  return (
    <Layout>
      {routes}
      {showWarning && (
        <div style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "20px",
          backgroundColor: "lightyellow",
          border: "2px solid orange",
          borderRadius: "8px",
          zIndex: 9999,
          fontWeight: "bold"
        }}>
          <p>⚠️ You will be logged out in 30 seconds due to inactivity!</p>
          <button
            onClick={() => {
              setShowWarning(false);
              if (timeoutId) clearTimeout(timeoutId);
              if (warningId) clearTimeout(warningId);
            }}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: "orange",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Stay Logged In
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;
