import { React, useState, useEffect } from "react";
import classes from "./register.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { useLocalStorageState, deleteLocalStorageItemsStartingWith } from "../../hooks/useLocalStorageStateWithBoolean";

import Container from "@mui/material/Container";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";

import GDPR_PDF from "../../assets/NSA_Data_Protection_Policy_GDPR.pdf";
import PN_PDF from "../../assets/NSA_Privacy_Notice.pdf";

import { useSelector } from 'react-redux';
import { selectAuths } from "../../contextStore/authsStore";

const Register = () => {
  const navigate = useNavigate();
  const { signup, isLoadingSignup, errorSignup } = useSignup();

  const { id } = useParams();
  console.log(id);

  const auths = useSelector(selectAuths);
  console.log(auths)

  const foundAuth = auths.find(auth => auth._id === id);
  console.log(foundAuth)

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const [username, setUsername] = useLocalStorageState('username', 'Register', '');
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [orgName, setOrgName] = useLocalStorageState('orgName', 'Register', '');
  const [orgAdr1, setOrgAdr1] = useLocalStorageState('orgAdr1', 'Register', '');
  const [orgAdr2, setOrgAdr2] = useLocalStorageState('orgAdr2', 'Register', '');
  const [orgTown, setOrgTown] = useLocalStorageState('orgTown', 'Register', '');
  const [orgCounty, setOrgCounty] = useLocalStorageState('orgCounty', 'Register', '');
  const [orgPostcode, setOrgPostcode] = useLocalStorageState('orgPostcode', 'Register', '');

  const [orgEmail, setOrgEmail] = useLocalStorageState('orgEmail', 'Register', '');
  const [orgPhone, setOrgPhone] = useLocalStorageState('orgPhone', 'Register', '');
  const [orgWebsite, setOrgWebsite] = useLocalStorageState('orgWebsite', 'Register', '');

  const [orgType, setOrgType] = useLocalStorageState('orgType', 'Register', '');
  const [orgCharityNumber, setOrgCharityNumber] = useLocalStorageState('orgCharityNumber', 'Register', '');
  const [orgHouseNumber, setOrgHouseNumber] = useLocalStorageState('orgHouseNumber', 'Register', '');

  const [contact1Title, setContact1Title] = useLocalStorageState('contact1Title', 'Register', '');
  const [contact1Fname, setContact1Fname] = useLocalStorageState('contact1Fname', 'Register', '');
  const [contact1Lname, setContact1Lname] = useLocalStorageState('contact1Lname', 'Register', '');
  const [contact1Role, setContact1Role] = useLocalStorageState('contact1Role', 'Register', '');
  const [contact1Email, setContact1Email] = useLocalStorageState('contact1Email', 'Register', '');
  const [contact1Phone, setContact1Phone] = useLocalStorageState('contact1Phone', 'Register', '');

  const [financeContact, setFinanceContact] = useLocalStorageState('financeContact', 'Register', false);
  const [secondContact, setSecondContact] = useLocalStorageState('secondContact', 'Register', false);

  const [contact2Title, setContact2Title] = useLocalStorageState('contact2Title', 'Register', '');
  const [contact2Fname, setContact2Fname] = useLocalStorageState('contact2Fname', 'Register', '');
  const [contact2Lname, setContact2Lname] = useLocalStorageState('contact2Lname', 'Register', '');
  const [contact2Role, setContact2Role] = useLocalStorageState('contact2Role', 'Register', '');
  const [contact2Email, setContact2Email] = useLocalStorageState('contact2Email', 'Register', '');
  const [contact2Phone, setContact2Phone] = useLocalStorageState('contact2Phone', 'Register', '');

  const [contact3Title, setContact3Title] = useLocalStorageState('contact3Title', 'Register', '');
  const [contact3Fname, setContact3Fname] = useLocalStorageState('contact3Fname', 'Register', '');
  const [contact3Lname, setContact3Lname] = useLocalStorageState('contact3Lname', 'Register', '');
  const [contact3Role, setContact3Role] = useLocalStorageState('contact3Role', 'Register', '');
  const [contact3Email, setContact3Email] = useLocalStorageState('contact3Email', 'Register', '');
  const [contact3Phone, setContact3Phone] = useLocalStorageState('contact3Phone', 'Register', '');

  const [commsPref, setCommsPref] = useLocalStorageState('commsPref', 'Register', false);
  const [dataPref, setDataPref] = useLocalStorageState('dataPref', 'Register', false);
  const [newsletterPref, setNewsletterPref] = useLocalStorageState('newsletterPref', 'Register', false);
  const [bulletinPref, setBulletinPref] = useLocalStorageState('bulletinPref', 'Register', false);
  const [tsAndCs, setTsAndCs] = useLocalStorageState('tsAndCs', 'Register', false);

  const [otherOrgType, setOtherOrgType] = useLocalStorageState('otherOrgType', 'Register', '');
  const [otherContact1Title, setOtherContact1Title] = useLocalStorageState('otherContact1Title', 'Register', '');
  const [otherContact2Title, setOtherContact2Title] = useLocalStorageState('otherContact2Title', 'Register', '');
  const [otherContact3Title, setOtherContact3Title] = useLocalStorageState('otherContact3Title', 'Register', '');

  const [organisations, setOrganisations] = useState([]);
  useEffect(() => {
    fetch("/organisations.csv")
      .then((response) => response.text())
      .then((csvData) => {
        const organisationList = csvData.split("\n").map((row) => row.trim());
        setOrganisations(organisationList);
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV data", error);
      });
  }, []);

  const totalSections = 4;
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

  // Handle section click to navigate to a specific section
  const handleSectionClick = (section) => {
    // for limiter
    setLatestSection(currentSection);

    // setLatestSection(section);
    if (latestSection >= section) {
      setCurrentSection(section); // bug::: inputs disappear when top progress bar used to go behind
      //eg. input on page 2 disappears only if go back to 1 not 3
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const titles = [
    "1. Register",
    "2. Organisation",
    "3. Contacts",
    "4. Data Privacy",
  ];

  const renderSectionButtons = () => {
    const sectionButtons = [];
    for (let i = 1; i <= totalSections; i++) {
      sectionButtons.push(
        <button
          key={i}
          onClick={() => handleSectionClick(i)}
          className={
            currentSection < i ? classes.progressButton : classes.fillButton
          }
        >
          {titles[i - 1]}
        </button>
      );
    }
    return sectionButtons;
  };

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate("/Login");
  };

  const submitRegistration = async (e) => {
    e.preventDefault();
    if (otherOrgType) {
      setOrgType(otherOrgType);
    }
    if (otherContact1Title) {
      setContact1Title(otherContact1Title);
    }
    if (otherContact2Title) {
      setContact2Title(otherContact2Title);
    }
    if (otherContact3Title) {
      setContact3Title(otherContact3Title);
    }
    await signup(
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
      secondContact ? contact2Title : '',
      secondContact ? contact2Fname : '',
      secondContact ? contact2Lname : '',
      secondContact ? contact2Role : '',
      secondContact ? contact2Email : '',
      secondContact ? contact2Phone : '',
      financeContact ? contact3Title : '',
      financeContact ? contact3Fname : '',
      financeContact ? contact3Lname : '',
      financeContact ? contact3Role : '',
      financeContact ? contact3Email : '',
      financeContact ? contact3Phone : '',
      commsPref,
      dataPref,
      newsletterPref,
      bulletinPref,
      tsAndCs
    );
    setCurrentSection(1);

    if (errorSignup == null) {
        deleteLocalStorageItemsStartingWith('Register')
    }
  };

  let buttons;

  if (currentSection !== 1) {
    buttons = (
      <div className={classes.buttonBlock}>
        <Button clicked={handlePrevious}>Previous</Button>

        {isLoadingSignup && <Loader loading={isLoadingSignup} />}

        {currentSection === 4 ? (
          <Button type="submit" disabled={isLoadingSignup}>
            Submit Registration
          </Button>
        ) : (
          <Button type="submit">Continue</Button>
        )}
      </div>
    );
  } else {
    buttons = (
      <div className={classes.buttonBlock}>
        <Button type="submit">Continue</Button>
      </div>
    );
  }

  return (
    <Container maxWidth="lg">
      <div className={classes.section}>
        <div className={classes.form}>
          <div className={classes.progressBar}>
            <div className={classes.progressFill}>{renderSectionButtons()}</div>
          </div>

          {currentSection === 1 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>1. Register</h2>
              </div>
              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Organisation Registration Details
                  </h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Email *</label>
                    <input
                      maxLength={2000}
                      type="email"
                      placeholder="Eg. JohnDoe@email.com"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Password *</label>
                    <div className={classes.passwordBlock}>
                      <input
                        maxLength={2000}
                        type={showPass ? "text" : "password"}
                        placeholder="Eg. Password123#"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$"
                        required
                      />
                      <Button clicked={handleClickShowPassword}>
                        {showPass ? "Hide" : "Show"}
                      </Button>
                    </div>
                    <label className={classes.passwordLabel}>
                      At least 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol and 8 Characters.
                    </label>
                    <a onClick={handleLogin} className={classes.link}>
                      Already Registered? Click Here To Login.
                    </a>
                  </div>
                </div>
              </div>

              {errorSignup && (
                <p className={classes.errorMessage}>{errorSignup}</p>
              )}

              <div className={classes.buttonBlock}>
                <Button type="submit">Continue Registration</Button>
              </div>
            </form>
          )}

          {currentSection === 2 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>2. Organisation Details</h2>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Organisation Address Information
                  </h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Organisation Name *
                    </label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. Nottingham Street Organisation"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Address Line 1 *
                    </label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. Building name or number"
                      value={orgAdr1}
                      onChange={(e) => setOrgAdr1(e.target.value)}
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Address Line 2</label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. Street name or number"
                      value={orgAdr2}
                      onChange={(e) => setOrgAdr2(e.target.value)}
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Town *</label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. Town or city name"
                      value={orgTown}
                      onChange={(e) => setOrgTown(e.target.value)}
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>County *</label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. County name"
                      value={orgCounty}
                      onChange={(e) => setOrgCounty(e.target.value)}
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Postcode *</label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. NG1 1AA"
                      value={orgPostcode}
                      onChange={(e) => setOrgPostcode(e.target.value)}
                      pattern="^(GIR ?0AA|((([A-PR-UWYZa-pr-uwyz][0-9][0-9]?)|(([A-PR-UWYZa-pr-uwyz][A-HK-Ya-hk-y][0-9][0-9]?)|(([A-PR-UWYZa-pr-uwyz][0-9][A-HJKSTUWa-hjkstuw])|([A-PR-UWYZa-pr-uwyz][A-HK-Ya-hk-y][0-9][ABEHMNPRV-Yabehmnprv-y])))) ?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2})$"
                      required
                    />
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>
                    Organisation Contact Information
                  </h3>
                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Email *</label>
                      <input
                        maxLength={2000}
                        type="email"
                        placeholder="Eg. JohnDoe@email.com"
                        value={orgEmail}
                        onChange={(e) => setOrgEmail(e.target.value)}
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        required
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Telephone *</label>
                      <input
                        maxLength={2000}
                        type="tel"
                        placeholder="Eg. 07654 321 234"
                        value={orgPhone}
                        onChange={(e) => setOrgPhone(e.target.value)}
                        pattern="(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}"
                        required
                      />
                    </div>
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Website</label>
                    <input
                      maxLength={2000}
                      type="url"
                      placeholder="Eg. https://www.NottinghamStreetOrg.com"
                      value={orgWebsite}
                      onChange={(e) => setOrgWebsite(e.target.value)}
                    />
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>Organisation Details</h3>
                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Organisation Type *
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      required
                    >
                      <option value="">Select Organisation Type</option>
                      {organisations.map((organisation, index) => (
                        <option key={index} value={organisation}>
                          {organisation}
                        </option>
                      ))}
                    </select>
                    {orgType === "Other" && (
                      <input
                        maxLength={2000}
                        type="text"
                        value={otherOrgType}
                        onChange={(e) => setOtherOrgType(e.target.value)}
                        placeholder="Other Organisation Type"
                        required
                      />
                    )}
                  </div>

                  {orgType === "Charity" && (
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Charity Number *
                      </label>
                      <input
                        maxLength={2000}
                        type="text"
                        value={orgCharityNumber}
                        onChange={(e) => setOrgCharityNumber(e.target.value)}
                        placeholder="Eg. AB12345"
                        pattern="^[A-Za-z0-9]{7,8}$"
                        required
                      />
                    </div>
                  )}

                  {(orgType === "Community Interest Company (CIC)" ||
                    orgType === "Social Enterprise/LTD by Guarantee") && (
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        CRN Companies House Number *
                      </label>
                      <input
                        maxLength={2000}
                        type="number"
                        value={orgHouseNumber}
                        onChange={(e) => setOrgHouseNumber(e.target.value)}
                        placeholder="Eg. 12345678, Last 8 Digits Only"
                        min={10000000}
                        max={99999999}
                        required
                      />
                    </div>
                  )}
                </div>
                {buttons}
              </div>
            </form>
          )}

          {currentSection === 3 && (
            <form className={classes.formLayout} onSubmit={handleContinue}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>3. Contact Details</h2>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <h3 className={classes.subTitle}>1st Point Of Contact</h3>
                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Title *</label>
                      <select
                        value={contact1Title}
                        onChange={(e) => setContact1Title(e.target.value)}
                        required
                      >
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                        <option value="Other">Other</option>
                      </select>
                      {contact1Title === "Other" && (
                        <input
                          maxLength={2000}
                          type="text"
                          value={otherContact1Title}
                          onChange={(e) =>
                            setOtherContact1Title(e.target.value)
                          }
                          placeholder="Other Title"
                          required
                        />
                      )}
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>First Name *</label>
                      <input
                        maxLength={2000}
                        type="text"
                        placeholder="Eg. John"
                        value={contact1Fname}
                        onChange={(e) => setContact1Fname(e.target.value)}
                        required
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Last Name *</label>
                      <input
                        maxLength={2000}
                        type="text"
                        placeholder="Eg. Doe"
                        value={contact1Lname}
                        onChange={(e) => setContact1Lname(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Email *</label>
                      <input
                        maxLength={2000}
                        type="email"
                        placeholder="Eg. JohnDoe@email.com"
                        value={contact1Email}
                        onChange={(e) => setContact1Email(e.target.value)}
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        required
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Telephone *</label>
                      <input
                        maxLength={2000}
                        type="tel"
                        placeholder="Eg. 07654 321 234"
                        value={contact1Phone}
                        onChange={(e) => setContact1Phone(e.target.value)}
                        pattern="(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}"
                        required
                      />
                    </div>
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>
                      Role In Organisation *
                    </label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. Admin"
                      value={contact1Role}
                      onChange={(e) => setContact1Role(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <div className={classes.checkboxGroup}>
                    <input
                      maxLength={2000}
                      className={classes.checkbox}
                      type="checkbox"
                      id="secondContact"
                      checked={secondContact}
                      onChange={(e) => setSecondContact(!secondContact)}
                    />
                    <label htmlFor="secondContact">
                      {secondContact ? "Remove" : "Add"} Second Point Of Contact
                    </label>
                  </div>
                </div>

                {secondContact && (
                  <div className={classes.multiInputBlock}>
                    <h3 className={classes.subTitle}>2nd Point Of Contact</h3>
                    <div className={classes.relatedInputBlock}>
                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>Title *</label>
                        <select
                          value={contact2Title}
                          onChange={(e) => setContact2Title(e.target.value)}
                          required
                        >
                          <option value="">Select Title</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                          <option value="Ms">Ms</option>
                          <option value="Other">Other</option>
                        </select>
                        {contact2Title === "Other" && (
                          <input
                            maxLength={2000}
                            type="text"
                            value={otherContact2Title}
                            onChange={(e) =>
                              setOtherContact2Title(e.target.value)
                            }
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
                          maxLength={2000}
                          type="text"
                          placeholder="Eg. John"
                          value={contact2Fname}
                          onChange={(e) => setContact2Fname(e.target.value)}
                          required
                        />
                      </div>

                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>
                          Last Name *
                        </label>
                        <input
                          maxLength={2000}
                          type="text"
                          placeholder="Eg. Doe"
                          value={contact2Lname}
                          onChange={(e) => setContact2Lname(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className={classes.relatedInputBlock}>
                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>Email *</label>
                        <input
                          maxLength={2000}
                          type="email"
                          placeholder="Eg. JohnDoe@email.com"
                          value={contact2Email}
                          onChange={(e) => setContact2Email(e.target.value)}
                          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                          required
                        />
                      </div>

                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>
                          Telephone *
                        </label>
                        <input
                          maxLength={2000}
                          type="tel"
                          placeholder="Eg. 07654 321 234"
                          value={contact2Phone}
                          onChange={(e) => setContact2Phone(e.target.value)}
                          pattern="(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}"
                          required
                        />
                      </div>
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Role In Organisation *
                      </label>
                      <input
                        maxLength={2000}
                        type="text"
                        placeholder="Eg. Management"
                        value={contact2Role}
                        onChange={(e) => setContact2Role(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className={classes.multiInputBlock}>
                  <div className={classes.checkboxGroup}>
                    <input
                      maxLength={2000}
                      className={classes.checkbox}
                      type="checkbox"
                      id="financeContact"
                      checked={financeContact}
                      onChange={(e) => setFinanceContact(!financeContact)}
                    />
                    <label htmlFor="financeContact">
                      {financeContact ? "Remove" : "Add"} Finance Contact
                    </label>
                  </div>
                </div>

                {financeContact && (
                  <div className={classes.multiInputBlock}>
                    <h3 className={classes.subTitle}>Finance Contact</h3>
                    <div className={classes.relatedInputBlock}>
                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>Title *</label>
                        <select
                          value={contact3Title}
                          onChange={(e) => setContact3Title(e.target.value)}
                          required
                        >
                          <option value="">Select Title</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                          <option value="Ms">Ms</option>
                          <option value="Other">Other</option>
                        </select>
                        {contact3Title === "Other" && (
                          <input
                            maxLength={2000}
                            type="text"
                            value={otherContact3Title}
                            onChange={(e) =>
                              setOtherContact3Title(e.target.value)
                            }
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
                          maxLength={2000}
                          type="text"
                          placeholder="Eg. John"
                          value={contact3Fname}
                          onChange={(e) => setContact3Fname(e.target.value)}
                          required
                        />
                      </div>

                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>
                          Last Name *
                        </label>
                        <input
                          maxLength={2000}
                          type="text"
                          placeholder="Eg. Doe"
                          value={contact3Lname}
                          onChange={(e) => setContact3Lname(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className={classes.relatedInputBlock}>
                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>Email *</label>
                        <input
                          maxLength={2000}
                          type="email"
                          placeholder="Eg. JohnDoe@email.com"
                          value={contact3Email}
                          onChange={(e) => setContact3Email(e.target.value)}
                          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                          required
                        />
                      </div>

                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>
                          Telephone *
                        </label>
                        <input
                          maxLength={2000}
                          type="tel"
                          placeholder="Eg. 07654 321 234"
                          value={contact3Phone}
                          onChange={(e) => setContact3Phone(e.target.value)}
                          pattern="(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}"
                          required
                        />
                      </div>
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Role In Organisation *
                      </label>
                      <input
                        maxLength={2000}
                        type="text"
                        placeholder="Eg. Finance manager"
                        value={contact3Role}
                        onChange={(e) => setContact3Role(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                {buttons}
              </div>
            </form>
          )}

          {currentSection === 4 && (
            <form className={classes.formLayout} onSubmit={submitRegistration}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>
                  4. GDPR SETTINGS & PREFERENCES
                </h2>
              </div>

              <div className={classes.formContent}>
                <div className={classes.multiInputBlock}>
                  <div className={classes.relatedInputBlock}>
                    <div className={classes.inputBlock}>
                      <h3 className={classes.subTitle}>Receive Emails</h3>
                      <div className={classes.radioGroup}>
                        <div>
                          <input
                            type="radio"
                            id="yes_comms"
                            name="comms"
                            checked={commsPref}
                            onChange={(e) => setCommsPref(true)}
                          />
                          <label htmlFor="yes_comms">Yes</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="no_comms"
                            name="comms"
                            checked={!commsPref}
                            onChange={(e) => setCommsPref(false)}
                          />
                          <label htmlFor="no_comms">No</label>
                        </div>
                      </div>
                    </div>
                    <div className={classes.inputBlock}>
                      <h3 className={classes.subTitle}>Newsletter</h3>
                      <div className={classes.radioGroup}>
                        <div>
                          <input
                            type="radio"
                            id="yes_newsletter"
                            name="newsletter"
                            checked={newsletterPref}
                            onChange={(e) => setNewsletterPref(true)}
                          />
                          <label htmlFor="yes_newsletter">Yes</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="no_newsletter"
                            name="newsletter"
                            checked={!newsletterPref}
                            onChange={(e) => setNewsletterPref(false)}
                          />
                          <label htmlFor="no_newsletter">No</label>
                        </div>
                      </div>
                    </div>

                    <div className={classes.inputBlock}>
                      <h3 className={classes.subTitle}>Grant Bulletin</h3>
                      <div className={classes.radioGroup}>
                        <div>
                          <input
                            type="radio"
                            id="yes_bulletin"
                            name="bulletin"
                            checked={bulletinPref}
                            onChange={(e) => setBulletinPref(true)}
                          />
                          <label htmlFor="yes_bulletin">Yes</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="no_bulletin"
                            name="bulletin"
                            checked={!bulletinPref}
                            onChange={(e) => setBulletinPref(false)}
                          />
                          <label htmlFor="no_bulletin">No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <div className={classes.inputBlock}>
                    <h3 className={classes.subTitle}>Data Sharing</h3>
                    <div className={classes.radioGroup}>
                      <div>
                        <input
                          type="radio"
                          id="yes_share"
                          name="share"
                          checked={dataPref}
                          onChange={(e) => setDataPref(true)}
                        />
                        <label htmlFor="yes_share">Yes</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="no_share"
                          name="share"
                          checked={!dataPref}
                          onChange={(e) => setDataPref(false)}
                        />
                        <label htmlFor="no_share">No</label>
                      </div>
                    </div>
                    <a href={GDPR_PDF} target="_blank" className={classes.link}>
                      Click here to read full terms and conditions.
                    </a>
                    <a
                      href="mailtoenquiries.nottingham@streetsupport.net"
                      className={classes.link}
                    >
                      Contact enquiries.nottingham@streetsupport.net to revoke
                      consent
                    </a>
                  </div>
                </div>

                <div className={classes.multiInputBlock}>
                  <div className={classes.inputBlock}>
                    <h3 className={classes.subTitle}>Terms & Conditions</h3>
                  </div>
                  <div className={classes.checkboxGroup}>
                    <input
                      className={classes.checkbox}
                      type="checkbox"
                      id="ts&cs"
                      checked={tsAndCs}
                      onChange={(e) => setTsAndCs(!tsAndCs)}
                      required
                    />
                    <label htmlFor="ts&cs">Accept terms and conditions *</label>
                  </div>
                  <a href={PN_PDF} target="_blank" className={classes.link}>
                    Click here to read full terms and conditions.
                  </a>
                </div>
                {buttons}
              </div>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Register;
