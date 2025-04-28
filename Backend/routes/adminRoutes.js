const express = require("express")
const { fetchAllAuths, fetchAllGrants, updateStatus, deleteGrant} = require("../controllers/grantControllers")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)

// setup routes and controller functions
router.get('/admin', fetchAllGrants)

// this needs to be here to do auth and cast to json
router.get("/admin/auths", fetchAllAuths);
// Route to delete a grant
router.delete('/controllers/grantControllers', deleteGrant);

router.patch('/admin/updateStatus', updateStatus)


module.exports = router