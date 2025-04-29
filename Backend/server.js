require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const organisationRoutes = require("./routes/organisationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const passwordResetRoutes = require("./routes/passwordReset"); // added this
const { deleteGrant } = require("./controllers/grantControllers");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.delete("/api/grant/:grantId", deleteGrant);

app.use("/api", passwordResetRoutes); // added this BEFORE auth routes
app.use("/api", authRoutes, organisationRoutes, adminRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("connected to db and server started on", process.env.PORT);
    });
})
.catch((error) => {
    console.log("ERR:", error);
});
