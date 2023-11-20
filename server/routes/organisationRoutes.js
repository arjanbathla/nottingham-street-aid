const express = require("express");
const multer = require("multer");

const { fetchGrants, createGrant } = require("../controllers/grantControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

// setup routes and controller functions
router.get("/organisation", fetchGrants);
router.post("/organisation/create", createGrant);

// const upload = multer({
//   storage: "path-to-storage",
//   limits: { fileSize: 100000 },
//   key: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// router.post(
//   "/organisation/create",
//   upload.fields([
//     { name: "sign", maxCount: 1 },
//     { name: "quote", maxCount: 1 },
//   ]),
//   createGrant
// );

module.exports = router;
