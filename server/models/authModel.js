const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    username:         { type: String, required: true, unique: true},
    password:         { type: String, required: true },

    orgName:          { type: String, required: true },
    orgAdr1:          { type: String, required: true },
    orgAdr2:          { type: String, required: false },
    orgTown:          { type: String, required: true },
    orgCounty:        { type: String, required: true },
    orgPostcode:      { type: String, required: true },

    orgEmail:         { type: String, required: true },
    orgPhone:         { type: Number, required: true },
    orgWebsite:       { type: String, required: false },
    orgType:          { type: String, required: true },
    orgCharityNumber: { type: String, required: false },
    orgHouseNumber:   { type: String, required: false },

    contact1Title:    { type: String, required: true },
    contact1Fname:    { type: String, required: true },
    contact1Lname:    { type: String, required: true },
    contact1Role:     { type: String, required: true },
    contact1Email:    { type: String, required: true },
    contact1Phone:    { type: Number, required: true },

    contact2Title:    { type: String, required: true },
    contact2Fname:    { type: String, required: true },
    contact2Lname:    { type: String, required: true },
    contact2Role:     { type: String, required: true },
    contact2Email:    { type: String, required: true },
    contact2Phone:    { type: Number, required: true },

    contact3Title:    { type: String, required: true },
    contact3Fname:    { type: String, required: true },
    contact3Lname:    { type: String, required: true },
    contact3Role:     { type: String, required: true },
    contact3Email:    { type: String, required: true },
    contact3Phone:    { type: Number, required: true },

    commsPref:        { type: Boolean, required: true },
    dataPref:         { type: Boolean, required: true },
    newsletterPref:   { type: Boolean, required: true },
    bulletinPref:     { type: Boolean, required: true },
    tsAndCs:          { type: Boolean, required: true },
  },
  { timestamps: true }
);

//static signup method
authSchema.statics.signup = async function (
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
) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(username)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Auth already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const auth = await this.create({
    username,
    password: hash,
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
  });

  return auth;
};

//static login method
authSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const auth = await this.findOne({ username });

  if (!auth) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, auth.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return auth;
};

module.exports = mongoose.model("Auth", authSchema);
