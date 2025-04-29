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

module.exports = router