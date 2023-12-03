const express = require("express")
const { fetchAllGrants, updateStatus } = require("../controllers/grantControllers")
const { fetchOrg } = require("../controllers/authController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

// setup routes and controller functions
router.get('/admin', fetchAllGrants)

router.get('/adminGetOrg', fetchOrg)

router.patch('/admin/updateStatus', updateStatus)


module.exports = router