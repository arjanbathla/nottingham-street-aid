import express from "express";
import { forgotPassword, resetPassword } from "../controllers/authControllers.js";


const express = require("express")
const { loginAuth, signupAuth, adminLoginAuth, authUpdate,getProfile} = require("../controllers/authControllers")
const { getProfileByUsername, updateProfile } = require("../controllers/authControllers");
const router = express.Router()

// setup routes and controller functions
router.post('/login', loginAuth)
router.post('/signup', signupAuth)
router.post('/adminLogin', adminLoginAuth)
router.post('/auth/update', authUpdate)
router.get("/profile/:username", getProfileByUsername);
router.patch("/profile/:username", updateProfile);


// new endpoints:
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router
