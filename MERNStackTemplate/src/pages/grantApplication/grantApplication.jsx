import { useState, useEffect } from "react";
import classes from "./grantApplication.module.css";

import { applyGrant } from "../../hooks/useApplyGrant";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";

import GDPR_PDF from "../../assets/NSA_Data_Protection_Policy_GDPR.pdf";
import PN_PDF from "../../assets/NSA_Privacy_Notice.pdf";

import { EighteenLim } from "../../config";

const GrantApplication = () => {
  const { apply, isLoadingGrant, errorGrant } = applyGrant();

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const [benTitle, setBenTitle] = useState("");
  const [benFirstName, setBenFirstName] = useState("");
  const [benLastName, setBenLastName] = useState("");
  const [benEmail, setBenEmail] = useState("");
  const [benTelephone, setBenTelephone] = useState("");

  const [declaration, setDeclaration] = useState(false);
  const [benNotts, setBenNotts] = useState(false);
  const [benAbode, setBenAbode] = useState(false);

  const [benAddressLine1, setBenAddressLine1] = useState("");
  const [benAddressLine2, setBenAddressLine2] = useState("");
  const [benTown, setBenTown] = useState("");

  const [altTitle, setAltTitle] = useState("");
  const [altFirstName, setAltFirstName] = useState("");
  const [altLastName, setAltLastName] = useState("");
  const [altRole, setAltRole] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [altTelephone, setAltTelephone] = useState("");

  const [altAddressLine1, setAltAddressLine1] = useState("");
  const [altAddressLine2, setAltAddressLine2] = useState("");
  const [altCounty, setAltCounty] = useState("");
  const [altPostcode, setAltPostcode] = useState("");

  const [sharedSignedLink, setSharedSignedLink] = useState();
  const [benConsent, setBenConsent] = useState(false);

  const [prefContactMethod, setPrefContactMethod] = useState("");
  const [prefCommunication, setPrefCommunication] = useState(false);
  const [prefDataSharing, setPrefDataSharing] = useState(false);

  const [benAgeRange, setBenAgeRange] = useState("");
  const [benDob, setBenDob] = useState("");
  const [benGen, setBenGen] = useState("");
  const [benSex, setBenSex] = useState("");
  const [benEthnicity, setBenEthnicity] = useState("");
  const [benReligion, setBenReligion] = useState("");
  const [benDisability, setBenDisability] = useState("");
  const [benDisabilityExtra, setBenDisabilityExtra] = useState("");
  const [benMarital, setBenMarital] = useState("");
  const [benPregnancy, setBenPregnancy] = useState("");
  const [benDependants, setBenDependants] = useState("");

  const [numOfDependants, setNumOfDependants] = useState("");
  const [ageOfDependants, setAgeOfDependants] = useState("");

  const [currentAccom, setCurrentAccom] = useState("");
  const [benCurrentAccomLength, setBenCurrentAccomLength] = useState("");

  const [benHistOfHomelessness, setBenHistOfHomelessness] = useState("");
  const [benHistDetails, setBenHistDetails] = useState("");
  const [benTimeInNottingham, setBenTimeInNottingham] = useState("");
  const [benLinktoNottingham, setBenLinkToNottingham] = useState("");
  const [benLinkDetails, setBenLinkDetails] = useState("");

  const [benGrantReason, setBenGrantReason] = useState("");
  const [grantDetails, setGrantDetails] = useState("");
  const [benStory, setBenStory] = useState("");

  const [grantAmountTotal, setGrantAmountTotal] = useState("");
  const [grantItemCost1, setGrantItemCost1] = useState("");
  const [grantItemDetails1, setGrantItemDetails1] = useState("");
  const [grantItemCost2, setGrantItemCost2] = useState("");
  const [grantItemDetails2, setGrantItemDetails2] = useState("");
  const [grantItemCost3, setGrantItemCost3] = useState("");
  const [grantItemDetails3, setGrantItemDetails3] = useState("");
  const [grantItemCost4, setGrantItemCost4] = useState("");
  const [grantItemDetails4, setGrantItemDetails4] = useState("");
  const [grantItemCost5, setGrantItemCost5] = useState("");
  const [grantItemDetails5, setGrantItemDetails5] = useState("");
  const [grantQuoteLink, setGrantQuoteLink] = useState("");

  const [confirmApplication, setConfirmApplication] = useState(false);

  const [otherBenTitle, setOtherBenTitle] = useState("");
  const [otherAltTitle, setOtherAltTitle] = useState("");
  const [otherAltRole, setOtherAltRole] = useState("");
  const [otherBenGen, setOtherBenGen] = useState("");
  const [otherBenSex, setOtherBenSex] = useState("");
  const [otherCurrentAccom, setOtherCurrentAccom] = useState("");
  const [otherBenGrantReason, setOtherBenGrantReason] = useState("");

  // if we every get a list of acceptable towns
  // const [towns, setTowns] = useState([]);
  // useEffect(() => {
  //   fetch("/towns.csv")
  //     .then((response) => response.text())
  //     .then((csvData) => {
  //       const townList = csvData.split("\n").map((row) => row.trim());
  //       setTowns(townList);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching or parsing CSV data", error);
  //     });
  // }, []);

  const [genders, setGenders] = useState([]);
  useEffect(() => {
    fetch("/genders.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const genderList = csvData.split("\n").map((row) => row.trim());
        setGenders(genderList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const [sexualities, setSexualities] = useState([]);
  useEffect(() => {
    fetch("/sexualities.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const sexualityList = csvData.split("\n").map((row) => row.trim());
        setSexualities(sexualityList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const [ethnicities, setEthnicities] = useState([]);
  useEffect(() => {
    fetch("/ethnicities.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const ethnicityList = csvData.split("\n").map((row) => row.trim());
        setEthnicities(ethnicityList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const [religions, setReligions] = useState([]);
  useEffect(() => {
    fetch("/religions.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const religionList = csvData.split("\n").map((row) => row.trim());
        setReligions(religionList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const [marital, setMarital] = useState([]);
  useEffect(() => {
    fetch("/marital.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const maritalList = csvData.split("\n").map((row) => row.trim());
        setMarital(maritalList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const [accomStatus, setAccomStatus] = useState([]);
  useEffect(() => {
    fetch("/accomStatus.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const accomList = csvData.split("\n").map((row) => row.trim());
        setAccomStatus(accomList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const [currentSituation, setCurrentSituation] = useState([]);
  useEffect(() => {
    fetch("/currentSituation.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const situationList = csvData.split("\n").map((row) => row.trim());
        setCurrentSituation(situationList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const [timeInNotts, setTimeInNotts] = useState([]);
  useEffect(() => {
    fetch("/timeInNottingham.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const nottinghamList = csvData.split("\n").map((row) => row.trim());
        setTimeInNotts(nottinghamList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const [grantReason, setGrantReason] = useState([]);
  useEffect(() => {
    fetch("/grantReason.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const grantReasonList = csvData.split("\n").map((row) => row.trim());
        setGrantReason(grantReasonList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const totalSections = 9;
  const [currentSection, setCurrentSection] = useState(1);
  const [latestSection, setLatestSection] = useState();

  const handleContinue = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //   useEffect(() => {
  //     getLocalCurrentSection();
  //   }, []);

  //   const getLocalCurrentSection = () => {
  //     if (localStorage.getItem("currentSectionGrantForm") === "") {
  //       localStorage.setItem("currentSectionGrantForm", JSON.stringify());
  //     } else {
  //       let localCurrentSection = JSON.parse(
  //         localStorage.getItem("currentSectionGrantForm")
  //       );
  //       setCurrentSection(localCurrentSection);
  //     }
  //   };

  //   useEffect(() => {
  //     saveLocalCurrentSection(currentSection);
  //   }, [currentSection]);

  //   const saveLocalCurrentSection = (currentSection) => {
  //     localStorage.setItem(
  //       "currentSectionGrantForm",
  //       JSON.stringify(currentSection)
  //     );
  //   };

  // Handle section click to navigate to a specific section
  const handleSectionClick = (section) => {
    setLatestSection(currentSection)
    // setLatestSection(section);
    if (latestSection >= section) {
      setCurrentSection(section); // bug::: inputs disappear when top progress bar used to go behind
      //eg. input on page 2 disappears only if go back to 1 not 3
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const titles = [
    "1. Grant",
    "2. Details",
    "3. Contacts",
    "4. Declaration",
    "5. Privacy Policy",
    "6. Characteristics",
    "7. Situations",
    "8. Reason",
    "9. Grant Amount",
  ];

  // Create section buttons for the progress bar
  const renderSectionButtons = () => {
    const sectionButtons = [];
    for (let section = 1; section <= totalSections; section++) {
      sectionButtons.push(
        <button
          key={section}
          onClick={() => handleSectionClick(section)}
          className={
            currentSection < section
              ? classes.progressButton
              : classes.fillButton
          }
        >
          {titles[section - 1]}
        </button>
      );
    }
    return sectionButtons;
  };

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    if (otherBenTitle) {
      setBenTitle(otherBenTitle);
    }
    if (otherAltTitle) {
      setAltTitle(otherAltTitle);
    }
    if (otherAltRole) {
      setAltRole(otherAltRole);
    }
    if (otherBenGen) {
      setBenGen(otherBenGen);
    }
    if (otherBenSex) {
      setBenSex(otherBenSex);
    }
    if (otherCurrentAccom) {
      setBenTitle(otherCurrentAccom);
    }
    if (otherBenGrantReason) {
      setBenGrantReason(otherBenGrantReason);
    }
    await apply(
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
    );
    setCurrentSection(1);
    console.log(benTitle,
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
      )
    if (!errorGrant) {
      navigate("/Organisation");
    }
  };

  let buttons;

  if (currentSection !== 1) {
    buttons = (
      <div className={classes.buttonBlock}>
        <Button clicked={handlePrevious}>Previous</Button>

        {isLoadingGrant && <Loader loading={isLoadingGrant} />}

        {currentSection === 9 ? (
          <Button type="submit" disabled={isLoadingGrant}>
            Submit Grant Application
          </Button>
        ) : (
          <Button type="submit">Continue</Button>
        )}
      </div>
    );
  } else {
    buttons = (
      <div className={classes.buttonContainer}>
        <Button type="submit">Start Grant Application</Button>
      </div>
    );
  }

  return (
    <Container maxWidth="lg">
      <section className={classes.section}>
        <div className={classes.form}>
          <div className={classes.progressBar}>
            <div className={classes.progressFill}>{renderSectionButtons()}</div>
          </div>

          {currentSection == 1 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>
                  1. Nottingham Street Aid Grant Application
                </h2>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Eligibility Criteria</h3>
                  <div className={classes.inputBlock}>
                    <ul>
                      <li>
                        The person must be sleeping rough, at high risk of
                        street homelessness, or housed in extremely vulnerable
                        conditions.
                      </li>
                      <li>
                        The grant must be for things that would help the person
                        get off or stay off the streets.
                      </li>
                      <li>
                        The person must currently live in the Nottingham area.
                      </li>
                      <li>
                        Details must be provided as part of the application.
                      </li>
                    </ul>
                  </div>

                  <div className={classes.inputBlock}>
                    <ul>
                      <li>
                        For further details on the grant application process,
                        please refer to the{" "}
                        <a
                          href="[INSERT LINK FOR APPLICATION GUIDELINES]"
                          target="_blank"
                          className={classes.link}
                        >
                          Nottingham Street Aid Application Guidelines
                        </a>
                      </li>
                      <li>
                        This form should be completed by referral organisations
                        registered with Nottingham Street Aid.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {buttons}
              {errorGrant && (
                <p className={classes.errorMessage}>{errorGrant}</p>
              )}
            </form>
          )}

          {currentSection === 2 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>2. Beneficiary Details</h2>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Beneficiary Details</h3>
                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Title *</label>
                      <select
                        value={benTitle}
                        onChange={(e) => setBenTitle(e.target.value)}
                        required
                      >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                        <option value="Other">Other</option>
                      </select>
                      {benTitle === "Other" && (
                        <input
                          type="text"
                          value={otherBenTitle}
                          onChange={(e) => setOtherBenTitle(e.target.value)}
                          placeholder="Other Title"
                          required
                        />
                      )}
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>First Name *</label>
                      <input
                        type="text"
                        value={benFirstName}
                        onChange={(e) => setBenFirstName(e.target.value)}
                        placeholder="Eg. John"
                        required
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Last Name *</label>
                      <input
                        type="text"
                        value={benLastName}
                        onChange={(e) => setBenLastName(e.target.value)}
                        placeholder="Eg. Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Email</label>
                      <input
                        type="email"
                        value={benEmail}
                        onChange={(e) => setBenEmail(e.target.value)}
                        placeholder="Eg. JohnDoe@email.com"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Telephone</label>
                      <input
                        type="number"
                        value={benTelephone}
                        onChange={(e) => setBenTelephone(e.target.value)}
                        placeholder="Eg. 07654 321 234"
                        pattern="^(((+44\s?\d{4}|(?0\d{4})?)\s?\d{3}\s?\d{3})|((+44\s?\d{3}|(?0\d{3})?)\s?\d{3}\s?\d{4})|((+44\s?\d{2}|(?0\d{2})?)"
                      />
                    </div>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Declaration</h3>
                  <div className={classes.checkboxGroup}>
                    <input
                      className={classes.checkbox}
                      type="checkbox"
                      id="no_relations"
                      checked={declaration}
                      onChange={() => setDeclaration(!declaration)}
                      required
                    />
                    <label htmlFor="no_relations">
                      I confirm that I do not have a family or personal
                      relationship with the beneficiary *
                    </label>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>County</h3>
                  <div className={classes.checkboxGroup}>
                    <input
                      className={classes.checkbox}
                      type="checkbox"
                      id="from_nottinghamshire"
                      checked={benNotts}
                      onChange={() => setBenNotts(!benNotts)}
                      required
                    />
                    <label htmlFor="from_nottinghamshire">
                      I confirm the beneficiary is living in Nottinghamshire *
                    </label>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Beneficiary Address Situation
                  </h3>
                  <div className={classes.inputBlock}>
                    <div className={classes.radioGroup}>
                      <div>
                        <input
                          type="radio"
                          checked={benAbode}
                          onChange={(e) => setBenAbode(true)}
                          required
                          id="yes_fixed_abode"
                          name="fixed_abode"
                        />
                        <label htmlFor="yes_fixed_abode">Fixed Abode</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          checked={!benAbode}
                          onChange={(e) => setBenAbode(false)}
                          required
                          id="no_fixed_abode"
                          name="fixed_abode"
                        />
                        <label htmlFor="no_fixed_abode">No Fixed Abode</label>
                      </div>
                    </div>
                  </div>
                </div>

                {benAbode === true && (
                  <div className={classes.multiInputBlock}>
                    <h3 className={classes.subTitle}>
                      Beneficiary Address Information
                    </h3>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        value={benAddressLine1}
                        onChange={(e) => setBenAddressLine1(e.target.value)}
                        placeholder="Eg. Building name or number"
                        required
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        value={benAddressLine2}
                        onChange={(e) => setBenAddressLine2(e.target.value)}
                        placeholder="Eg. Street name or number"
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Town *</label>
                      <input
                        type="text"
                        value={benTown}
                        onChange={(e) => setBenTown(e.target.value)}
                        placeholder="Eg. Town Name"
                        required
                      />
                    </div>
                  </div>
                )}

                {buttons}
              </div>
            </form>
          )}

          {currentSection === 3 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>3. Alternative Contact</h2>
                <label className={classes.inputLabel}>
                  Please provide an alternative address which we can contact the
                  beneficiary via. This could be their GP or a supporting
                  organisation.
                </label>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Alternative Contact Details
                  </h3>
                  <div className={classes.relatedInputBlockBlock}>
                    <div className={classes.relatedInputBlock}>
                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>Title *</label>
                        <select
                          value={altTitle}
                          onChange={(e) => setAltTitle(e.target.value)}
                          required
                        >
                          <option value="">Select Title</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                          <option value="Ms">Ms</option>
                          <option value="Other">Other</option>
                        </select>
                        {altTitle === "Other" && (
                          <input
                            type="text"
                            value={otherAltTitle}
                            onChange={(e) => setOtherAltTitle(e.target.value)}
                            placeholder="Other Title"
                            required
                          />
                        )}
                      </div>

                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={altFirstName}
                          onChange={(e) => setAltFirstName(e.target.value)}
                          placeholder="Eg. John"
                          required
                        />
                      </div>

                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={altLastName}
                          onChange={(e) => setAltLastName(e.target.value)}
                          placeholder="Eg. Doe"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Role In Relation To Beneficiary *
                    </label>
                    <select
                      value={altRole}
                      onChange={(e) => setAltRole(e.target.value)}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="GP/Doctor">GP/Doctor</option>
                      <option value="Therapist">Therapist</option>
                      <option value="Support/Key Worker">
                        Support/Key Worker
                      </option>
                      <option value="Church">Church</option>
                      <option value="Family Member">Family Member</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                    {altRole === "Other" && (
                      <input
                        type="text"
                        value={otherAltRole}
                        onChange={(e) => setOtherAltRole(e.target.value)}
                        placeholder="Other Role"
                        required
                      />
                    )}
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Email *</label>
                      <input
                        type="email"
                        value={altEmail}
                        onChange={(e) => setAltEmail(e.target.value)}
                        placeholder="Eg. JohnDoe@email.com"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        required
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Telephone *</label>
                      <input
                        type="number"
                        value={altTelephone}
                        onChange={(e) => setAltTelephone(e.target.value)}
                        placeholder="Eg. 07654 321 234"
                        pattern="^(((+44\s?\d{4}|(?0\d{4})?)\s?\d{3}\s?\d{3})|((+44\s?\d{3}|(?0\d{3})?)\s?\d{3}\s?\d{4})|((+44\s?\d{2}|(?0\d{2})?)"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Alternative Contact Address Information
                  </h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={altAddressLine1}
                      onChange={(e) => setAltAddressLine1(e.target.value)}
                      placeholder="Eg. Building name or number"
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Address Line 2</label>
                    <input
                      type="text"
                      value={altAddressLine2}
                      onChange={(e) => setAltAddressLine2(e.target.value)}
                      placeholder="Eg. Street name or number"
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>County *</label>
                    <input
                      type="text"
                      value={altCounty}
                      onChange={(e) => setAltCounty(e.target.value)}
                      placeholder="Eg. Nottinghamshire"
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Postcode *</label>
                    <input
                      type="text"
                      value={altPostcode}
                      onChange={(e) => setAltPostcode(e.target.value)}
                      placeholder="Eg. NG1 1AA"
                      pattern="(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"
                      required
                    />
                  </div>
                </div>
              </div>
              {buttons}
            </form>
          )}

          {currentSection === 4 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>
                  4. Beneficiary Declaration
                </h2>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Signed Declaration File</h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Please provide a copy of the beneficiary's signed
                      declaration. Handwritten, printed, video or audio files
                      accepted *
                    </label>
                    {/* <div className={classes.relatedInputBlock}> */}
                      <input
                        type="file"
                        // value={sharedSignedLink}
                        onChange={(e) => setSharedSignedLink(e.target.value)}
                        // required
                      />
                      {/* <label className={classes.inputLabel}>
                        {sharedSignedLink}
                      </label> */}
                    {/* </div> */}
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Beneficiary Consent</h3>
                  <div className={classes.checkboxGroup}>
                    <input
                      className={classes.checkbox}
                      type="checkbox"
                      id="beneficiary_consent"
                      checked={benConsent}
                      onChange={() => setBenConsent(!benConsent)}
                      required
                    />
                    <label htmlFor="beneficiary_consent">
                      I hereby confirm that the beneficiary is aware of and
                      supports this application *
                    </label>
                  </div>
                </div>
              </div>
              {buttons}
            </form>
          )}

          {currentSection === 5 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>
                  5. GDPR SETTINGS & PREFERENCES
                </h2>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Preferred Contact Method *
                  </h3>
                  <div className={classes.inputBlock}>
                    <select
                      value={prefContactMethod}
                      onChange={(e) => setPrefContactMethod(e.target.value)}
                      required
                    >
                      <option value="">Select Preference</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Email">Email</option>
                      <option value="Prefer not to be contacted">
                        Prefer not to be contacted
                      </option>
                    </select>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Communication Preference *
                  </h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Please indicate if the beneficiary is happy for us to
                      contact them for further information relating to their
                      application or follow-up.
                    </label>
                    <div className={classes.radioGroup}>
                      <div>
                        <input
                          type="radio"
                          checked={prefCommunication}
                          onChange={(e) => setPrefCommunication(true)}
                          id="yes_communication"
                          name="pref_communication"
                        />
                        <label htmlFor="yes_communication">Yes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          checked={!prefCommunication}
                          onChange={(e) => setPrefCommunication(false)}
                          id="no_communication"
                          name="pref_communication"
                        />
                        <label htmlFor="no_communication">No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    GDPR Settings & Data Sharing *
                  </h3>
                  <div className={classes.inputBlock}>
                    <div className={classes.radioGroup}>
                      <div>
                        <input
                          type="radio"
                          checked={prefDataSharing}
                          onChange={(e) => setPrefDataSharing(true)}
                          id="agree_to_gdpr"
                          name="gdpr_declaration"
                        />
                        <label htmlFor="agree_to_gdpr">Yes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          checked={!prefDataSharing}
                          onChange={(e) => setPrefDataSharing(false)}
                          id="deny_gdpr"
                          name="gdpr_declaration"
                        />
                        <label htmlFor="deny_gdpr">No</label>
                      </div>
                    </div>
                    <a href={GDPR_PDF} target="_blank" className={classes.link}>
                      Click here to read full GDPR Statement.
                    </a>
                  </div>
                </div>
              </div>
              {buttons}
            </form>
          )}

          {currentSection === 6 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>
                  6. Beneficiary's Protected Characteristics
                </h2>
                <label className={classes.inputLabel}>
                  We would like to collect the below data for reporting and
                  analytics. Certain information may also help with the
                  application and award process. This information will remain
                  anonymous. If the beneficiary prefers not to answer any of the
                  questions, please indicate so.{" "}
                </label>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Beneficiary Characteristics
                  </h3>
                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Age Range *</label>
                      <select
                        value={benAgeRange}
                        onChange={(e) => setBenAgeRange(e.target.value)}
                        required
                      >
                        <option value="">Select Age Range</option>
                        <option value="Young adult (18-25)">
                          Young adult (18-25)
                        </option>
                        <option value="Adults (26-65)">Adults (26-65)</option>
                        <option value="Senior (>65)">Senior ({">"}65)</option>
                      </select>
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel} htmlFor="dob">
                        Date Of Birth *
                      </label>
                      <input
                        type="date"
                        id="dob"
                        value={benDob}
                        onChange={(e) => setBenDob(e.target.value)}
                        max={EighteenLim}
                        required
                      />
                    </div>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Gender *</label>
                      <select
                        value={benGen}
                        onChange={(e) => setBenGen(e.target.value)}
                        required
                      >
                        <option value="">Select Gender</option>
                        {genders.map((gender, index) => (
                          <option key={index} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                      {benGen === "Other" && (
                        <input
                          type="text"
                          value={otherBenGen}
                          onChange={(e) => setOtherBenGen(e.target.value)}
                          placeholder="Other Gender"
                          required
                        />
                      )}
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Sexuality *</label>
                      <select
                        value={benSex}
                        onChange={(e) => setBenSex(e.target.value)}
                        required
                      >
                        <option value="">Select Sexuality</option>
                        {sexualities.map((sexuality, index) => (
                          <option key={index} value={sexuality}>
                            {sexuality}
                          </option>
                        ))}
                      </select>
                      {benSex === "Other" && (
                        <input
                          type="text"
                          value={otherBenSex}
                          onChange={(e) => setOtherBenSex(e.target.value)}
                          placeholder="Other Sexuality"
                          required
                        />
                      )}
                    </div>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Ethnicity *</label>
                      <select
                        value={benEthnicity}
                        onChange={(e) => setBenEthnicity(e.target.value)}
                        required
                      >
                        <option value="">Select Ethnicity</option>
                        {ethnicities.map((ethnicity, index) => (
                          <option key={index} value={ethnicity}>
                            {ethnicity}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Religion *</label>
                      <select
                        value={benReligion}
                        onChange={(e) => setBenReligion(e.target.value)}
                        required
                      >
                        <option value="">Select Religion</option>
                        {religions.map((religion, index) => (
                          <option key={index} value={religion}>
                            {religion}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Disability *</h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      This could be where the person has been diagnosed as
                      disabled or considers themselves to be disabled (Includes
                      long term illnesses and temp disability expected to last
                      12 months or more.)
                    </label>
                    <select
                      value={benDisability}
                      onChange={(e) => setBenDisability(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Prefer Not To Say">
                        Prefer Not To Say
                      </option>
                    </select>
                  </div>

                  {benDisability == "Yes" && (
                    <div className={classes.inputBlock}>
                      <label
                        className={classes.inputLabel}
                        htmlFor="disability"
                      >
                        Disability Description *
                      </label>
                      <textarea
                        id="disability"
                        rows="4"
                        value={benDisabilityExtra}
                        onChange={(e) => setBenDisabilityExtra(e.target.value)}
                        placeholder="Eg. Brief Description"
                        required
                      ></textarea>
                    </div>
                  )}
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Relations</h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Marital Status *
                    </label>
                    <select
                      value={benMarital}
                      onChange={(e) => setBenMarital(e.target.value)}
                      required
                    >
                      <option value="">Select Marital Status</option>
                      {marital.map((maritalStatus, index) => (
                        <option key={index} value={maritalStatus}>
                          {maritalStatus}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Pregnancy Status *
                    </label>
                    <select
                      value={benPregnancy}
                      onChange={(e) => setBenPregnancy(e.target.value)}
                      required
                    >
                      <option value="">Select Pregnancy Status</option>
                      <option value="Not Pregnant">Not Pregnant</option>
                      <option value="Pregnant">Pregnant</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Dependants *</label>
                    <select
                      value={benDependants}
                      onChange={(e) => setBenDependants(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="PreferNotToSay">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {benDependants === "Yes" && (
                  <div className={classes.multiInputBlock}>
                    <h3 className={classes.subTitle}>
                      More Information On Dependants
                    </h3>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Number of dependents *
                      </label>
                      <input
                        type="text"
                        value={numOfDependants}
                        onChange={(e) => setNumOfDependants(e.target.value)}
                        placeholder="Eg. 3"
                        required
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Age of dependents *
                      </label>
                      <input
                        type="text"
                        value={ageOfDependants}
                        onChange={(e) => setAgeOfDependants(e.target.value)}
                        placeholder="Eg. 10, 7, 5"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              {buttons}
            </form>
          )}

          {currentSection === 7 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>
                  7. Beneficiary's Current Situation
                </h2>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Accommodation Status & History
                  </h3>
                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Current Accommodation *
                      </label>
                      <select
                        value={currentAccom}
                        onChange={(e) => setCurrentAccom(e.target.value)}
                        required
                      >
                        <option value="">Select Accommodation</option>
                        {accomStatus.map((accom, index) => (
                          <option key={index} value={accom}>
                            {accom}
                          </option>
                        ))}
                      </select>
                      {currentAccom === "Other" && (
                        <input
                          type="text"
                          value={otherCurrentAccom}
                          onChange={(e) => setOtherCurrentAccom(e.target.value)}
                          placeholder="Other Accommodation Status"
                          required
                        />
                      )}
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Length In Current Situation *
                      </label>
                      <select
                        value={benCurrentAccomLength}
                        onChange={(e) =>
                          setBenCurrentAccomLength(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Length</option>
                        {currentSituation.map((situation, index) => (
                          <option key={index} value={situation}>
                            {situation}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      History Of Homelessness *
                    </label>
                    <select
                      value={benHistOfHomelessness}
                      onChange={(e) => setBenHistOfHomelessness(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {benHistOfHomelessness == "Yes" && (
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel} htmlFor="History">
                        History *
                      </label>

                      <textarea
                        id="History"
                        rows="4"
                        value={benHistDetails}
                        onChange={(e) => setBenHistDetails(e.target.value)}
                        placeholder="Eg. Brief Description, Please provide details e.g. number of times homeless, time period, accommodation status."
                        required
                      ></textarea>
                    </div>
                  )}
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Links To Nottingham</h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Approximate Time Spent In Nottingham*
                    </label>
                    <select
                      value={benTimeInNottingham}
                      onChange={(e) => setBenTimeInNottingham(e.target.value)}
                      required
                    >
                      <option value="">Select Time</option>
                      {timeInNotts.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Link to Nottingham *
                    </label>
                    <label className={classes.inputLabel}>
                      Does the beneficiary have links to Nottingham e.g. family?
                    </label>
                    <select
                      value={benLinktoNottingham}
                      onChange={(e) => setBenLinkToNottingham(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {benLinktoNottingham === "Yes" && (
                    <div className={classes.inputBlock}>
                      <label
                        className={classes.inputLabel}
                        htmlFor="Link Details"
                      >
                        Link Details *
                      </label>
                      <textarea
                        id="Link Details"
                        rows="4"
                        value={benLinkDetails}
                        onChange={(e) => setBenLinkDetails(e.target.value)}
                        placeholder="Eg. Brief Description, Please provide details of the beneficiaries link to Nottingham e.g. grew up here, family, friends, partner etc."
                        required
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>
              {buttons}
            </form>
          )}

          {currentSection === 8 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>8. Reason for Application</h2>
                <label className={classes.inputLabel}>
                  Please let us know why you are making this application and the
                  impact the grant will have to the beneficiary. Please provide
                  as much pertinent information as possible.
                </label>
                <label className={classes.inputLabel}>
                  A Street Aid grant can be used for or towards anything, as
                  long as it's used to fund whatever an individual needs to help
                  prevent them or gets them off, and stay off, the streets.
                </label>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Grant Reason & Details</h3>
                  <div className={classes.inputBlock}>
                    <label
                      className={classes.inputLabel}
                      htmlFor="Grant Reason"
                    >
                      Grant Reason *
                    </label>
                    <label className={classes.inputLabel}>
                      If Multiple Reasons, Select "Other" and Describe.
                    </label>

                    <select
                      value={benGrantReason}
                      onChange={(e) => setBenGrantReason(e.target.value)}
                      required
                    >
                      <option value="">Select Reason</option>
                      {grantReason.map((reason, index) => (
                        <option key={index} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                    {benGrantReason === "Other" && (
                      <input
                        type="text"
                        value={otherBenGrantReason}
                        onChange={(e) => setOtherBenGrantReason(e.target.value)}
                        placeholder="Other Reason(s)"
                        required
                      />
                    )}
                  </div>

                  <div className={classes.inputBlock}>
                    <label
                      className={classes.inputLabel}
                      htmlFor="Grant Details"
                    >
                      Grant Details *
                    </label>

                    <textarea
                      id="Grant Details"
                      rows="4"
                      value={grantDetails}
                      onChange={(e) => setGrantDetails(e.target.value)}
                      placeholder="Eg. Brief Description, Where necessary please provide further details for grant application reason i.e. what it will fund, if it is part funding etc."
                      required
                    ></textarea>
                  </div>

                  <div className={classes.inputBlock}>
                    <label
                      className={classes.inputLabel}
                      htmlFor="Beneficiary's Story"
                    >
                      Beneficiary's Story *
                    </label>

                    <textarea
                      id="Beneficiary's Story"
                      rows="4"
                      value={benStory}
                      onChange={(e) => setBenStory(e.target.value)}
                      placeholder="Eg. Brief Description, Please explain how the award will help the recipient get off or stay off the street. If the award is part of some larger plan to assist the individual, please explain the part the award will play."
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              {buttons}
            </form>
          )}

          {currentSection === 9 && (
            <form className={classes.formLayout} onSubmit={submitForm}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>9. Grant Amount</h2>
                <label className={classes.inputLabel}>
                  Please indicate the grant amount being applied for and where
                  possible provide quotes. The maximum amount is £750 per grant
                  and £2k per person over their lifetime. Only one grant will be
                  awarded per person in a 6 month period.
                </label>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Total Amount Seeking *</h3>
                  <div className={classes.inputBlock}>
                    <div className={classes.moneyInputContainer}>
                      <p className={classes.currencySymbol}>£</p>
                      <input
                        type="number"
                        min="1.00"
                        max="750.00"
                        value={grantAmountTotal}
                        onChange={(e) => setGrantAmountTotal(e.target.value)}
                        placeholder="750 (maximum per grant)"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Cost Breakdown *</h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Please provide the cost estimate for each item including
                      in your application. Up to 5 items are permitted.
                    </label>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <div className={classes.moneyInputContainer}>
                        <p className={classes.currencySymbol}>£</p>
                        <input
                          type="number"
                          min="1.00"
                          max="750.00"
                          value={grantItemCost1}
                          onChange={(e) => setGrantItemCost1(e.target.value)}
                          placeholder="Cost"
                          required
                        />
                      </div>
                    </div>

                    <div className={classes.inputBlock}>
                      <input
                        type="text"
                        value={grantItemDetails1}
                        onChange={(e) => setGrantItemDetails1(e.target.value)}
                        placeholder="Item Description"
                        required
                      />
                    </div>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <div className={classes.moneyInputContainer}>
                        <p className={classes.currencySymbol}>£</p>
                        <input
                          type="number"
                          min="0.00"
                          max="750.00"
                          value={grantItemCost2}
                          onChange={(e) => setGrantItemCost2(e.target.value)}
                          placeholder="Cost"
                        />
                      </div>
                    </div>

                    <div className={classes.inputBlock}>
                      <input
                        type="text"
                        value={grantItemDetails2}
                        onChange={(e) => setGrantItemDetails2(e.target.value)}
                        placeholder="Item Description"
                      />
                    </div>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <div className={classes.moneyInputContainer}>
                        <p className={classes.currencySymbol}>£</p>
                        <input
                          type="number"
                          min="0.00"
                          max="750.00"
                          value={grantItemCost3}
                          onChange={(e) => setGrantItemCost3(e.target.value)}
                          placeholder="Cost"
                        />
                      </div>
                    </div>

                    <div className={classes.inputBlock}>
                      <input
                        type="text"
                        value={grantItemDetails3}
                        onChange={(e) => setGrantItemDetails3(e.target.value)}
                        placeholder="Item Description"
                      />
                    </div>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <div className={classes.moneyInputContainer}>
                        <p className={classes.currencySymbol}>£</p>
                        <input
                          type="number"
                          min="0.00"
                          max="750.00"
                          value={grantItemCost4}
                          onChange={(e) => setGrantItemCost4(e.target.value)}
                          placeholder="Cost"
                        />
                      </div>
                    </div>

                    <div className={classes.inputBlock}>
                      <input
                        type="text"
                        value={grantItemDetails4}
                        onChange={(e) => setGrantItemDetails4(e.target.value)}
                        placeholder="Item Description"
                      />
                    </div>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <div className={classes.moneyInputContainer}>
                        <p className={classes.currencySymbol}>£</p>
                        <input
                          type="number"
                          min="0.00"
                          max="750.00"
                          value={grantItemCost5}
                          onChange={(e) => setGrantItemCost5(e.target.value)}
                          placeholder="Cost"
                        />
                      </div>
                    </div>

                    <div className={classes.inputBlock}>
                      <input
                        type="text"
                        value={grantItemDetails5}
                        onChange={(e) => setGrantItemDetails5(e.target.value)}
                        placeholder="Item Description"
                      />
                    </div>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Quotes File for Large Items
                  </h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Please provide quotes for higher cost items, above £xxx
                      attaching copies where possible. Up to 5 quotes can be
                      provided.
                    </label>

                    {/* <div className={classes.relatedInputBlock}> */}
                      <input
                        type="file"
                        // value={grantQuoteLink}
                        onChange={(e) => setGrantQuoteLink(e.target.value)}
                        // required
                      />
                      {/* <label className={classes.inputLabel}>
                        {grantQuoteLink}
                      </label> */}
                    {/* </div> */}
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <div className={classes.checkboxGroup}>
                    <input
                      className={classes.checkbox}
                      type="checkbox"
                      id="grant_confirmation"
                      checked={confirmApplication}
                      onChange={() =>
                        setConfirmApplication(!confirmApplication)
                      }
                      required
                    />
                    <label htmlFor="grant_confirmation">
                      I confirm that both the organisation and beneficiary is
                      aware of and consents of this grant application *
                    </label>
                  </div>
                </div>
              </div>
              {buttons}
            </form>
          )}
        </div>
      </section>
    </Container>
  );
};

export default GrantApplication;
