const express = require("express")
const { fetchGrants, createGrant } = require("../controllers/grantControllers")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

// setup routes and controller functions
router.get('/organisation', fetchGrants)
router.post('/organisation/create', createGrant)

module.exports = router