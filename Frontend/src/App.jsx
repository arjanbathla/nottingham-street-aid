import React from "react";
import "./App.css";

// import '@fontsource/dela-gothic-one';
// import '@fontsource/bebas-neue';
// Supports weights 100-900
import "@fontsource-variable/jost";

import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./navigation/layout/layout";

import Home from "./pages/home/home";
import Register from "./pages/register/register";
import RegisterEdit from "./pages/register/register_edit";
import Login from "./pages/login/login";
import ContactUs from "./pages/contactUs/contactUs";
import OurPolicy from "./pages/ourPolicy/ourPolicy";

import Organisation from "./pages/organisation/organisation";
import GrantApplication from "./pages/grantApplication/grantApplication";
import ViewGrant from "./pages/viewGrant/viewGrant";

import AdminLogin from "./pages/adminLogin/adminLogin";
import Admin from "./pages/admin/admin";
import ViewAdminGrant from "./pages/viewAdminGrant/viewAdminGrant";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { admin } = useSelector((state) => state.admin);

  let routes = (
    <Routes>
      <Route
        path="/"
        element={
          !user && !admin ? (
            <Home />
          ) : !admin ? (
            <Navigate to="/Organisation" />
          ) : (
            <Navigate to="/Admin" />
          )
        }
      />
      <Route
        path="/Register"
        element={
          !user && !admin ? (
            <Register />
          ) : !admin ? (
            <Navigate to="/Organisation" />
          ) : (
            <Navigate to="/Admin" />
          )
        }
      />
      <Route
        path="/Login"
        element={
          !user && !admin ? (
            <Login />
          ) : !admin ? (
            <Navigate to="/Organisation" />
          ) : (
            <Navigate to="/Admin" />
          )
        }
      />

      <Route
        path="/AdminLogin"
        element={
          !user && !admin ? (
            <AdminLogin />
          ) : !admin ? (
            <Navigate to="/Organisation" />
          ) : (
            <Navigate to="/Admin" />
          )
        }
      />

      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/OurPolicy" element={<OurPolicy />} />

      <Route path="/Organisation" element={user ? <Organisation /> : <Navigate to="/" />}/>
      <Route path="/Register/:id" element={<RegisterEdit />} />
      <Route path="/GrantApplication" element={user ? <GrantApplication /> : <Navigate to="/" />}/>
      <Route path="/ViewGrant" element={user ? <ViewGrant /> : <Navigate to="/" />}/>

      <Route path="/Admin" element={admin ? <Admin /> : <Navigate to="/" />} />
      <Route path="/ViewAdminGrant" element={admin ? <ViewAdminGrant /> : <Navigate to="/" />}/>
    </Routes>
  );

  return <Layout>{routes}</Layout>;
};

export default App;
