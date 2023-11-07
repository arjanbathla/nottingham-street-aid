const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const grantSchema = new Schema(
  {
    userId: { type: String, required: false },
    grantStatus: { type: String, required: false },

    benTitle: { type: String, required: false },
    benFirstName: { type: String, required: false },
    benLastName: { type: String, required: false },
    benEmail: { type: String, required: false },
    benTelephone: { type: Number, required: false },

    declaration: { type: Boolean, required: false },
    benNotts: { type: Boolean, required: false },
    benAbode: { type: Boolean, required: false },
    benAddressLine1: { type: String, required: false },
    benAddressLine2: { type: String, required: false },
    benTown: { type: String, required: false },

    altTitle: { type: String, required: false },
    altFirstName: { type: String, required: false },
    altLastName: { type: String, required: false },
    altRole: { type: String, required: false },
    altEmail: { type: String, required: false },
    altTelephone: { type: Number, required: false },

    altAddressLine1: { type: String, required: false },
    altAddressLine2: { type: String, required: false },
    altCounty: { type: String, required: false },
    altPostcode: { type: String, required: false },

    sharedSignedLink: { type: String, required: false },
    benConsent: { type: Boolean, required: false },

    prefContactMethod: { type: String, required: false },
    prefCommunication: { type: Boolean, required: false },
    prefDataSharing: { type: Boolean, required: false },

    benAgeRange: { type: String, required: false },
    benDob: { type: String, required: false },
    benGen: { type: String, required: false },
    benSex: { type: String, required: false },
    benEthnicity: { type: String, required: false },
    benReligion: { type: String, required: false },

    benDisability: { type: String, required: false },
    benDisabilityExtra: { type: String, required: false },

    benMarital: { type: String, required: false },
    benPregnancy: { type: String, required: false },
    benDependants: { type: String, required: false },
    numOfDependants: { type: String, required: false },
    ageOfDependants: { type: String, required: false },

    currentAccom: { type: String, required: false },
    benCurrentAccomLength: { type: String, required: false },
    benHistOfHomelessness: { type: String, required: false },
    benHistDetails: { type: String, required: false },
    benTimeInNottingham: { type: String, required: false },
    benLinkToNottingham: { type: String, required: false },
    benLinkDetails: { type: String, required: false },

    benGrantReason: { type: String, required: false },
    grantDetails: { type: String, required: false },
    benStory: { type: String, required: false },

    grantAmountTotal: { type: String, required: false },
    grantItemCost1: { type: Number, required: false },
    grantItemDetails1: { type: String, required: false },
    grantItemCost2: { type: Number, required: false },
    grantItemDetails2: { type: String, required: false },
    grantItemCost3: { type: Number, required: false },
    grantItemDetails3: { type: String, required: false },
    grantItemCost4: { type: Number, required: false },
    grantItemDetails4: { type: String, required: false },
    grantItemCost5: { type: Number, required: false },
    grantItemDetails5: { type: String, required: false },

    grantQuoteLink: { type: String, required: false },
    confirmApplication: { type: String, required: false },
  },
  { timestamps: false }
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
  grantQuoteLink,
  confirmApplication
) {
  // if (
  //   !userId ||
  //   !grantStatus ||
  //   !benTitle ||
  //   !benFirstName ||
  //   !benLastName ||
  //   !benEmail ||
  //   !benTelephone ||
  //   !declaration ||
  //   !benNotts ||
  //   !benAbode ||
  //   !altTitle ||
  //   !altFirstName ||
  //   !altLastName ||
  //   !altRole ||
  //   !altEmail ||
  //   !altTelephone ||
  //   !altAddressLine1 ||
  //   !altAddressLine2 ||
  //   !altCounty ||
  //   !altPostcode ||
  //   !sharedSignedLink ||
  //   !benConsent ||
  //   !prefContactMethod ||
  //   !prefCommunication ||
  //   !prefDataSharing ||
  //   !benAgeRange ||
  //   !benDob ||
  //   !benGen ||
  //   !benSex ||
  //   !benEthnicity ||
  //   !benReligion ||
  //   !benDisability ||
  //   !benMarital ||
  //   !benPregnancy ||
  //   !numOfDependants ||
  //   !ageOfDependants ||
  //   !currentAccom ||
  //   !benCurrentAccomLength ||
  //   !benHistOfHomelessness ||
  //   !benHistDetails ||
  //   !benTimeInNottingham ||
  //   !benLinkToNottingham ||
  //   !benLinkDetails ||
  //   !benGrantReason ||
  //   !grantDetails ||
  //   !benStory ||
  //   !grantAmountTotal ||
  //   !grantItemCost1 ||
  //   !grantItemDetails1 ||
  //   !confirmApplication
  // ) {
  //   throw Error("All fields must be filled");
  // }

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
    grantQuoteLink,
    confirmApplication
  });

  return grant;
};

module.exports = mongoose.model("Grant", grantSchema);
