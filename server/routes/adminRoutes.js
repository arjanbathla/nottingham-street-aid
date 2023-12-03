const express = require("express")
const { fetchAllGrants, updateStatus } = require("../controllers/grantControllers")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

// setup routes and controller functions
router.get('/admin', fetchAllGrants)

router.patch('/admin/updateStatus', updateStatus)


module.exports = router