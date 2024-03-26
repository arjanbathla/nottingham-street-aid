const express = require("express")
const { fetchAllGrants, updateStatus } = require("../controllers/grantControllers")
const { fetchAllAuths } = require("../controllers/authControllers")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

// setup routes and controller functions
router.get('/admin', fetchAllGrants)

// this needs to be here to do auth and cast to json
router.get("/auth", fetchAllAuths);

router.patch('/admin/updateStatus', updateStatus)


module.exports = router