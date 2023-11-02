const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const grantSchema = new Schema(
  {
    userId: { type: String, required: true },
    grantStatus: { type: String, required: true },

    benTitle: { type: String, required: true },
    benFirstName: { type: String, required: true },
    benLastName: { type: String, required: true },
    benEmail: { type: String, required: true },
    benTelephone: { type: Number, required: true },

    declaration: { type: Boolean, required: true },
    benNotts: { type: Boolean, required: true },
    benAbode: { type: Boolean, required: true },
    benAddressLine1: { type: String, required: false },
    benAddressLine2: { type: String, required: false },
    benTown: { type: String, required: false },

    altTitle: { type: String, required: true },
    altFirstName: { type: String, required: true },
    altLastName: { type: String, required: true },
    altRole: { type: String, required: true },
    altEmail: { type: String, required: true },
    altTelephone: { type: Number, required: true },

    altAddressLine1: { type: String, required: true },
    altAddressLine2: { type: String, required: true },
    altCounty: { type: String, required: true },
    altPostcode: { type: String, required: true },

    sharedSignedLink: { type: String, required: true },
    benConsent: { type: Boolean, required: true },

    prefContactMethod: { type: String, required: true },
    prefCommunication: { type: Boolean, required: true },
    prefDataSharing: { type: Boolean, required: true },

    benAgeRange: { type: String, required: true },
    benDob: { type: String, required: true },
    benGen: { type: String, required: true },
    benSex: { type: String, required: true },
    benEthnicity: { type: String, required: true },
    benReligion: { type: String, required: true },

    benDisability: { type: String, required: true },
    benDisabilityExtra: { type: String, required: false },

    benMarital: { type: String, required: true },
    benPregnancy: { type: String, required: true },
    benDependants: { type: String, required: true },
    numOfDependants: { type: String, required: true },
    ageOfDependants: { type: String, required: true },

    currentAccom: { type: String, required: true },
    benCurrentAccomLength: { type: String, required: true },
    benHistOfHomelessness: { type: String, required: true },
    benHistDetails: { type: String, required: true },
    benTimeInNottingham: { type: String, required: true },
    benLinktoNottingham: { type: String, required: true },
    benLinkDetails: { type: String, required: true },

    benGrantReason: { type: String, required: true },
    grantDetails: { type: String, required: true },
    benStory: { type: String, required: true },

    grantAmountTotal: { type: String, required: true },
    grantItemCost1: { type: Number, required: true },
    grantItemDetails1: { type: String, required: true },
    grantItemCost2: { type: Number, required: false },
    grantItemDetails2: { type: String, required: false },
    grantItemCost3: { type: Number, required: false },
    grantItemDetails3: { type: String, required: false },
    grantItemCost4: { type: Number, required: false },
    grantItemDetails4: { type: String, required: false },
    grantItemCost5: { type: Number, required: false },
    grantItemDetails5: { type: String, required: false },

    grantQuoteLink: { type: String, required: false },
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
  sharedSignedLink,
  benConsent,
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
  benLinktoNottingham,
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
  grantQuoteLink,
  confirmApplication
) {
  if (
    !userId ||
    !grantStatus ||
    !benTitle ||
    !benFirstName ||
    !benLastName ||
    !benEmail ||
    !benTelephone ||
    !declaration ||
    !benNotts ||
    !benAbode ||
    !altTitle ||
    !altFirstName ||
    !altLastName ||
    !altRole ||
    !altEmail ||
    !altTelephone ||
    !altAddressLine1 ||
    !altAddressLine2 ||
    !altCounty ||
    !altPostcode ||
    !sharedSignedLink ||
    !benConsent ||
    !prefContactMethod ||
    !prefCommunication ||
    !prefDataSharing ||
    !benAgeRange ||
    !benDob ||
    !benGen ||
    !benSex ||
    !benEthnicity ||
    !benReligion ||
    !benDisability ||
    !benMarital ||
    !benPregnancy ||
    !numOfDependants ||
    !ageOfDependants ||
    !currentAccom ||
    !benCurrentAccomLength ||
    !benHistOfHomelessness ||
    !benHistDetails ||
    !benTimeInNottingham ||
    !benLinktoNottingham ||
    !benLinkDetails ||
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
    sharedSignedLink,
    benConsent,
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
    benLinktoNottingham,
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
    grantQuoteLink,
    confirmApplication,
  });

  return grant;
};

module.exports = mongoose.model("Grant", grantSchema);
