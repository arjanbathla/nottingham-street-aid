const Grant = require("../models/grantModel");
const Auth = require("../models/authModel");
const mongoose = require("mongoose");

// Character limits to guard against excessively long free-text submissions
const MAX_SHORT_TEXT = 500;   // e.g. item descriptions
const MAX_LONG_TEXT  = 1000;  // e.g. full narratives

// Fetch grants for the authenticated user
const fetchGrants = async (req, res) => {
  const userId = req.auth._id;
  const grants = await Grant.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(grants);
};


// Fetch all grants (admin)
const fetchAllGrants = async (req, res) => {
  console.log("Fetching all grants...");
  const grants = await Grant.find({}).sort({ createdAt: -1 });
  console.log(`Found ${grants.length} grants.`);
  res.status(200).json(grants);
};



// Update a grant's status
const updateStatus = async (req, res) => {
  const { grantId, status } = req.body;
  const updated = await Grant.findOneAndUpdate(
    { _id: grantId },
    { grantStatus: status },
    { new: true }
  );
  res.status(200).json(updated);
};

// Create a new grant application
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
    dependantDescription,
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

  // Validate maximum lengths on free-text fields
  const textChecks = [
    { val: benDisabilityExtra,    max: MAX_SHORT_TEXT, name: 'Disability details' },
    { val: benHistDetails,         max: MAX_LONG_TEXT,  name: 'Homelessness history' },
    { val: benLinkDetails,         max: MAX_LONG_TEXT,  name: 'Link to Nottingham' },
    { val: grantDetails,           max: MAX_LONG_TEXT,  name: 'Grant details' },
    { val: benStory,               max: MAX_LONG_TEXT,  name: 'Beneficiary story' },
    { val: dependantDescription,   max: MAX_LONG_TEXT,  name: 'Dependants description' },
    { val: grantItemDetails1,      max: MAX_SHORT_TEXT, name: 'Item 1 details' },
    { val: grantItemDetails2,      max: MAX_SHORT_TEXT, name: 'Item 2 details' },
    { val: grantItemDetails3,      max: MAX_SHORT_TEXT, name: 'Item 3 details' },
    { val: grantItemDetails4,      max: MAX_SHORT_TEXT, name: 'Item 4 details' },
    { val: grantItemDetails5,      max: MAX_SHORT_TEXT, name: 'Item 5 details' },
  ];

  for (let { val, max, name } of textChecks) {
    if (val && val.length > max) {
      return res
        .status(400)
        .json({ error: `${name} cannot exceed ${max} characters.` });
    }
  }

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
      dependantDescription,
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

// Fetch all authenticated users (admin)
const fetchAllAuths = async (req, res) => {
  console.log("Fetching all auths...");
  const auths = await Auth.find({}).sort({ createdAt: -1 });
  console.log(`Found ${auths.length} auths.`);
  res.status(200).json(auths);
};

// Delete grant by ID
const deleteGrant = async (req, res) => {
  const { grantId } = req.params; // Access grantId from the URL

  try {
    console.log("Attempting to delete grant with ID:", grantId);

    const grant = await Grant.findByIdAndDelete(grantId);

    if (!grant) {
      return res.status(404).json({ message: "Grant not found" });
    }

    console.log("Grant deleted successfully:", grantId);
    res.status(200).json({ message: "Grant deleted successfully" });
  } catch (error) {
    console.error("Error deleting grant:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  fetchGrants,
  fetchAllGrants,
  updateStatus,
  createGrant,
  fetchAllAuths,
  deleteGrant,
};
