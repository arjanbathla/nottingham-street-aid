// importing required packages
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const organisationRoutes = require("./routes/organisationRoutes")
const adminRoutes = require("./routes/adminRoutes")

// init express node app
const app = express();

// allow the app to use middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/api/lee', (req, res) => {
  res.status(200).json({ message: "Temporary /api/lee route" });
});

app.use("/api", authRoutes, organisationRoutes, adminRoutes)

// connect the app to a database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connected to db and server started on", process.env.PORT);
    });
})
.catch((error) => {
    console.log("ERR:", error)
})
