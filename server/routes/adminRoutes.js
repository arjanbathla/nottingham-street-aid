const express = require("express")
const { fetchAllGrants } = require("../controllers/grantControllers")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

// setup routes and controller functions
router.get('/admin', fetchAllGrants)

module.exports = router