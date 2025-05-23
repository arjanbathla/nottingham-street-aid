import React, { useEffect } from "react"
import "./App.css";
import { logoutUser } from "../src/contextStore/userStore";
import {useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate,useNavigate } from "react-router-dom";
// import '@fontsource/dela-gothic-one';
// import '@fontsource/bebas-neue';
// Supports weights 100-900
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
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';



const App = () => {
    const { user } = useSelector((state) => state.user);
    const { admin } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let timeoutId = null;
    useEffect(() => {
        const handleUserActivity = () => {
            if (timeoutId) {
                clearTimeout(timeoutId); // Clear the previous timeout
            }
            resetTimer(); // Reset the timer
        };

        const logoutAfterTimeout = () => {
            dispatch(logoutUser()); // Dispatch the logout action
            navigate("/");
        };

        const resetTimer = () => {
            timeoutId = setTimeout(logoutAfterTimeout, 300000); // 5 minutes
        };

        // Listen for user activity events
        window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("keydown", handleUserActivity);
        window.addEventListener("click", handleUserActivity);
        window.addEventListener("scroll", handleUserActivity);

        resetTimer(); // Start the timer

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener("mousemove", handleUserActivity);
            window.removeEventListener("keydown", handleUserActivity);
            window.removeEventListener("click", handleUserActivity);
            window.removeEventListener("scroll", handleUserActivity);
            clearTimeout(timeoutId); // Clear timeout if component unmounts
        };
    }, [dispatch]);
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPassword />} />




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
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/Organisation" element={user ? <Organisation /> : <Navigate to="/" />}/>
            <Route path="/Register/:id" element={<RegisterEdit />} />
            <Route path="/GrantApplication" element={user ? <GrantApplication /> : <Navigate to="/" />}/>
            <Route path="/ViewGrant" element={user ? <ViewGrant /> : <Navigate to="/" />}/>
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/Admin" element={admin ? <Admin /> : <Navigate to="/" />} />
            <Route path="/ViewAdminGrant" element={admin ? <ViewAdminGrant /> : <Navigate to="/" />}/>
        </Routes>
    );

    return <Layout>{routes}</Layout>;
};

export default App;