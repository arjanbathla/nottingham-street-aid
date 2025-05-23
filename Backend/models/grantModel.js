const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const grantSchema = new Schema(
  {
    userId: { type: String, required: true },
    grantStatus: { type: String, required: true },

    benTitle: { type: String, required: true },
    benFirstName: { type: String, required: true },
    benLastName: { type: String, required: true },
    benEmail: { type: String, required: false },
    benTelephone: { type: String, required: false },

    declaration: { type: String, required: true },
    benNotts: { type: String, required: true },
    benAbode: { type: String, required: true },
    benAddressLine1: { type: String, required: false },
    benAddressLine2: { type: String, required: false },
    benTown: { type: String, required: false },

    altTitle: { type: String, required: true },
    altFirstName: { type: String, required: true },
    altLastName: { type: String, required: true },
    altRole: { type: String, required: true },
    altEmail: { type: String, required: true },
    altTelephone: { type: String, required: true },

    altAddressLine1: { type: String, required: true },
    altAddressLine2: { type: String, required: false },
    altCounty: { type: String, required: true },
    altPostcode: { type: String, required: true },

    prefContactMethod: { type: String, required: true },
    prefCommunication: { type: String, required: true },
    prefDataSharing: { type: String, required: true },

    benAgeRange: { type: String, required: true },
    benDob: { type: String, required: true },
    benGen: { type: String, required: true },
    benSex: { type: String, required: true },
    benEthnicity: { type: String, required: true },
    benReligion: { type: String, required: true },

    benDisability: { type: String, required: true },
    
    benDisabilityExtra: { type: String, required: false, maxlength: 500 },

    benMarital: { type: String, required: true },
    benPregnancy: { type: String, required: true },
    benDependants: { type: String, required: true },
    numOfDependants: { type: String, required: false },
    ageOfDependants: { type: String, required: false },

    currentAccom: { type: String, required: true },
    benCurrentAccomLength: { type: String, required: true },
    benHistOfHomelessness: { type: String, required: true },
    benHistDetails: { type: String, required: false, maxlength: 1000 },
    benTimeInNottingham: { type: String, required: true },
    benLinkToNottingham: { type: String, required: true },
    benLinkDetails: { type: String, required: false, maxlength: 1000 },


    benGrantReason: { type: String, required: true },
   
    grantDetails: { type: String, required: false, maxlength: 1000 },
    benStory: { type: String, required: false, maxlength: 1000 },

    grantAmountTotal: { type: String, required: true },
    grantItemCost1: { type: String, required: true },
    grantItemDetails1: { type: String, required: true },
    grantItemDetails1: { type: String, required: true,  maxlength: 500 },
    grantItemCost2: { type: String, required: false },
    grantItemDetails2: { type: String, required: false, maxlength: 500 },
    grantItemCost3: { type: String, required: false },
    grantItemDetails3: { type: String, required: false,   maxlength: 500 },
    grantItemCost4: { type: String, required: false },
    grantItemDetails4: { type: String, required: false,   maxlength: 500 },
    grantItemCost5: { type: String, required: false },
    grantItemDetails5: { type: String, required: false,   maxlength: 500 },

    benConsent: { type: String, required: true },
    confirmApplication: { type: String, required: true },
  },
  { timestamps: true }
);

//static signup method
grantSchema.statics.applyGrant = async function (
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
) {
  if (
    !userId ||
    !grantStatus ||
    !benTitle ||
    !benFirstName ||
    !benLastName ||
    !altTitle ||
    !altFirstName ||
    !altLastName ||
    !altRole ||
    !altEmail ||
    !altTelephone ||
    !altAddressLine1 ||
    !altCounty ||
    !altPostcode ||
    !prefContactMethod ||
    !benAgeRange ||
    !benDob ||
    !benGen ||
    !benSex ||
    !benEthnicity ||
    !benReligion ||
    !benDisability ||
    !benMarital ||
    !benPregnancy ||
    !benDependants ||
    !currentAccom ||
    !benCurrentAccomLength ||
    !benHistOfHomelessness ||
    !benTimeInNottingham ||
    !benLinkToNottingham ||
    !benGrantReason ||
    !grantDetails ||
    !benStory ||
    !grantAmountTotal ||
    !grantItemCost1 ||
    !grantItemDetails1 ||
    !confirmApplication
  ) {
    throw Error("All fields must be filled");
  }

  const grant = await this.create({
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
  });

  return grant;
};

module.exports = mongoose.model("Grant", grantSchema);
