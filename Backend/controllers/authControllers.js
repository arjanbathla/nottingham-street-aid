const Auth = require("../models/authModel");
const AdminAuth = require("../models/adminAuthModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginAuth = async (req, res) => {
  const { username, password } = req.body;
  try {
    const auth = await Auth.login(username, password);
    const token = createToken(auth._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminLoginAuth = async (req, res) => {
  const { username, password } = req.body;
  try {
    const auth = await AdminAuth.login(username, password);
    const token = createToken(auth._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminSignupAuth = async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const auth = await AdminAuth.create({ username, password: hash });
    const token = createToken(auth._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupAuth = async (req, res) => {
  const {
    username,
    password,
    orgName,
    orgAdr1,
    orgAdr2,
    orgTown,
    orgCounty,
    orgPostcode,
    orgEmail,
    orgPhone,
    orgWebsite,
    orgType,
    orgCharityNumber,
    orgHouseNumber,
    contact1Title,
    contact1Fname,
    contact1Lname,
    contact1Role,
    contact1Email,
    contact1Phone,
    contact2Title,
    contact2Fname,
    contact2Lname,
    contact2Role,
    contact2Email,
    contact2Phone,
    contact3Title,
    contact3Fname,
    contact3Lname,
    contact3Role,
    contact3Email,
    contact3Phone,
    commsPref,
    dataPref,
    newsletterPref,
    bulletinPref,
    tsAndCs,
  } = req.body;
  try {
    const userStatus = "Pending";
    const auth = await Auth.signup(
      userStatus,
      username,
      password,
      orgName,
      orgAdr1,
      orgAdr2,
      orgTown,
      orgCounty,
      orgPostcode,
      orgEmail,
      orgPhone,
      orgWebsite,
      orgType,
      orgCharityNumber,
      orgHouseNumber,
      contact1Title,
      contact1Fname,
      contact1Lname,
      contact1Role,
      contact1Email,
      contact1Phone,
      contact2Title,
      contact2Fname,
      contact2Lname,
      contact2Role,
      contact2Email,
      contact2Phone,
      contact3Title,
      contact3Fname,
      contact3Lname,
      contact3Role,
      contact3Email,
      contact3Phone,
      commsPref,
      dataPref,
      newsletterPref,
      bulletinPref,
      tsAndCs
    );
    const token = createToken(auth._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authUpdate = async (req, res) => {
  const auth = req.body;
  console.log('auth', auth)
  try {
    updated = await Auth.findOneAndUpdate({_id: auth._id}, auth, { new: true })
    console.log('updated', updated)
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfileByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await Auth.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const updated = await Auth.findOneAndUpdate(
      { username },
      { $set: req.body },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "User not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

module.exports = {
  loginAuth,
  signupAuth,
  adminLoginAuth,
  adminSignupAuth,  // <----- added here
  authUpdate,
  getProfileByUsername,
  updateProfile,
};

