const Grant = require("../models/grantModel");
const mongoose = require("mongoose");

//get grants
const fetchGrants = async (req, res) => {
  const userId = req.auth._id;
  const grants = await Grant.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(grants);
};

//get grants
const fetchAllGrants = async (req, res) => {
  console.log("Fetching all grants...");
  const grants = await Grant.find({}).sort({ createdAt: -1 });
  console.log(`Found ${grants.length} grants:`, grants);
  console.log(grants);
  res.status(200).json(grants);
};

const updateStatus = async (req, res) => {
  const {grantId, status} = req.body
  const grants = await Grant.findOneAndUpdate({_id: grantId},{
    grantStatus: status
  })
  res.status(200).json(grants);
};

//apply grants
const createGrant = async (req, res) => {
  const {
    benTitle,
    benFirstName,
    benLastName,
    benEmail,
    benTelephone,
    declaration,
    benNotts,
    benAbode,
    benAddressLine1,
    benAddressLine2,
    benTown,
    altTitle,
    altFirstName,
    altLastName,
    altRole,
    altEmail,
    altTelephone,
    altAddressLine1,
    altAddressLine2,
    altCounty,
    altPostcode,
    prefContactMethod,
    prefCommunication,
    prefDataSharing,
    benAgeRange,
    benDob,
    benGen,
    benSex,
    benEthnicity,
    benReligion,
    benDisability,
    benDisabilityExtra,
    benMarital,
    benPregnancy,
    benDependants,
    numOfDependants,
    ageOfDependants,
    currentAccom,
    benCurrentAccomLength,
    benHistOfHomelessness,
    benHistDetails,
    benTimeInNottingham,
    benLinkToNottingham,
    benLinkDetails,
    benGrantReason,
    grantDetails,
    benStory,
    grantAmountTotal,
    grantItemCost1,
    grantItemDetails1,
    grantItemCost2,
    grantItemDetails2,
    grantItemCost3,
    grantItemDetails3,
    grantItemCost4,
    grantItemDetails4,
    grantItemCost5,
    grantItemDetails5,
    benConsent,
    confirmApplication
  } = req.body;
  try {
    const userId = req.auth._id;
    const grantStatus = "Pending";
    const grant = await Grant.applyGrant(
      userId,
      grantStatus,
      benTitle,
      benFirstName,
      benLastName,
      benEmail,
      benTelephone,
      declaration,
      benNotts,
      benAbode,
      benAddressLine1,
      benAddressLine2,
      benTown,
      altTitle,
      altFirstName,
      altLastName,
      altRole,
      altEmail,
      altTelephone,
      altAddressLine1,
      altAddressLine2,
      altCounty,
      altPostcode,
      prefContactMethod,
      prefCommunication,
      prefDataSharing,
      benAgeRange,
      benDob,
      benGen,
      benSex,
      benEthnicity,
      benReligion,
      benDisability,
      benDisabilityExtra,
      benMarital,
      benPregnancy,
      benDependants,
      numOfDependants,
      ageOfDependants,
      currentAccom,
      benCurrentAccomLength,
      benHistOfHomelessness,
      benHistDetails,
      benTimeInNottingham,
      benLinkToNottingham,
      benLinkDetails,
      benGrantReason,
      grantDetails,
      benStory,
      grantAmountTotal,
      grantItemCost1,
      grantItemDetails1,
      grantItemCost2,
      grantItemDetails2,
      grantItemCost3,
      grantItemDetails3,
      grantItemCost4,
      grantItemDetails4,
      grantItemCost5,
      grantItemDetails5,
      benConsent,
      confirmApplication
    );
    res.status(200).json({ grant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchAllAuths = async (req, res) => {
//  console.log("Fetching all auths...");
//  const auths = await Auth.find({}).sort({ createdAt: -1 });
//  console.log("Found ${auths.length} auths.");
//  console.log(auths);
  res.status(200).json({});
};

module.exports = {
  fetchGrants,
  fetchAllGrants,
  updateStatus,
  createGrant,
  fetchAllAuths,
};
