const Auth = require("../models/authModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
    const auth = await Auth.signup(
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

module.exports = {
  loginAuth,
  signupAuth,
};
