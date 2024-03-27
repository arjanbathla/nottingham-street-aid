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
  const foundAuth = useSelector(selectAuths).find(auth => auth._id === id);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const [orgName, setOrgName] = useState(foundAuth.orgName || '');
  const [orgAdr1, setOrgAdr1] = useState(foundAuth.orgAdr1 || '');
  const [orgAdr2, setOrgAdr2] = useState(foundAuth.orgAdr2 || '');
  const [orgTown, setOrgTown] = useState(foundAuth.orgTown || '');
  const [orgCounty, setOrgCounty] = useState(foundAuth.orgCounty || '');
  const [orgPostcode, setOrgPostcode] = useState(foundAuth.orgPostcode || '');

  const [orgEmail, setOrgEmail] = useState(foundAuth.orgEmail || '');
  const [orgPhone, setOrgPhone] = useState(foundAuth.orgPhone || '');
  const [orgWebsite, setOrgWebsite] = useState(foundAuth.orgWebsite || '');

  const [orgType, setOrgType] = useState(foundAuth.orgType || '');
  const [orgCharityNumber, setOrgCharityNumber] = useState(foundAuth.orgCharityNumber || '');
  const [orgHouseNumber, setOrgHouseNumber] = useState(foundAuth.orgHouseNumber || '');

  const [contact1Title, setContact1Title] = useState(foundAuth.contact1Title || '');
  const [contact1Fname, setContact1Fname] = useState(foundAuth.contact1Fname || '');
  const [contact1Lname, setContact1Lname] = useState(foundAuth.contact1Lname || '');
  const [contact1Role, setContact1Role] = useState(foundAuth.contact1Role || '');
  const [contact1Email, setContact1Email] = useState(foundAuth.contact1Email || '');
  const [contact1Phone, setContact1Phone] = useState(foundAuth.contact1Phone || '');

  const [financeContact, setFinanceContact] = useState(foundAuth.financeContact || false);
  const [secondContact, setSecondContact] = useState(foundAuth.secondContact || false);

  const [contact2Title, setContact2Title] = useState(foundAuth.contact2Title || '');
  const [contact2Fname, setContact2Fname] = useState(foundAuth.contact2Fname || '');
  const [contact2Lname, setContact2Lname] = useState(foundAuth.contact2Lname || '');
  const [contact2Role, setContact2Role] = useState(foundAuth.contact2Role || '');
  const [contact2Email, setContact2Email] = useState(foundAuth.contact2Email || '');
  const [contact2Phone, setContact2Phone] = useState(foundAuth.contact2Phone || '');

  const [contact3Title, setContact3Title] = useState(foundAuth.contact3Title || '');
  const [contact3Fname, setContact3Fname] = useState(foundAuth.contact3Fname || '');
  const [contact3Lname, setContact3Lname] = useState(foundAuth.contact3Lname || '');
  const [contact3Role, setContact3Role] = useState(foundAuth.contact3Role || '');
  const [contact3Email, setContact3Email] = useState(foundAuth.contact3Email || '');
  const [contact3Phone, setContact3Phone] = useState(foundAuth.contact3Phone || '');

  const [commsPref, setCommsPref] = useState(foundAuth.commsPref || false);
  const [dataPref, setDataPref] = useState(foundAuth.dataPref || false);
  const [newsletterPref, setNewsletterPref] = useState(foundAuth.newsletterPref || false);
  const [bulletinPref, setBulletinPref] = useState(foundAuth.bulletinPref || false);
  const [tsAndCs, setTsAndCs] = useState(foundAuth.tsAndCs || false);

  const [otherOrgType, setOtherOrgType] = useState(foundAuth.otherOrgType || '');
  const [otherContact1Title, setOtherContact1Title] = useState(foundAuth.otherContact1Title || '');
  const [otherContact2Title, setOtherContact2Title] = useState(foundAuth.otherContact2Title || '');
  const [otherContact3Title, setOtherContact3Title] = useState(foundAuth.otherContact3Title || '');

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

  return (
    <Container maxWidth="lg">
      <div className={classes.section}>
        <div className={classes.form}>
            <form className={classes.formLayout}>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>Organisation Details</h2>
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
              </div>
              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>Contact Details</h2>
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
              </div>

              <div className={classes.formBanner}>
                <h2 className={classes.mainTitle}>
                  GDPR SETTINGS & PREFERENCES
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
//                <div className={classes.buttonBlock}>
//                    <Button type="submit">Submit</Button>
//                </div>
              </div>
            </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
