const express = require("express")
const {loginAuth, signupAuth, adminLoginAuth, fetchAllAuths} = require("../controllers/authControllers")

const router = express.Router()

// setup routes and controller functions
router.post('/login', loginAuth)
router.post('/signup', signupAuth)
router.post('/adminLogin', adminLoginAuth)

router.get("/auth", fetchAllAuths);


module.exports = router
