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

  const [formData, setFormData] = useState({
    ...foundAuth,
    financeContact: foundAuth.financeContact || false,
    secondContact: foundAuth.secondContact || false,
  });

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
    const response = await fetch(
      import.meta.env.VITE_API_HOST + "/api/auth/update",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    console.log('response', response)
//    if (errorSignup == null) {
//        deleteLocalStorageItemsStartingWith('Register')
//    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.section}>
        <div className={classes.form}>
            <form className={classes.formLayout} onSubmit={submitRegistration}>
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
                      value={formData.orgName}
                      onChange={handleChange}
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
                      value={formData.orgAdr1}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Address Line 2</label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. Street name or number"
                      value={formData.orgAdr2}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Town *</label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. Town or city name"
                      value={formData.orgTown}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>County *</label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. County name"
                      value={formData.orgCounty}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={classes.inputBlock}>
                    <label className={classes.inputLabel}>Postcode *</label>
                    <input
                      maxLength={2000}
                      type="text"
                      placeholder="Eg. NG1 1AA"
                      value={formData.orgPostcode}
                      onChange={handleChange}
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
                        value={formData.orgEmail}
                        onChange={handleChange}
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
                        value={formData.orgPhone}
                        onChange={handleChange}
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
                      value={formData.orgWebsite}
                      onChange={handleChange}
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
                      value={formData.orgType}
                      onChange={handleChange}
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
                        value={formData.otherOrgType}
                        onChange={handleChange}
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
                        value={formData.orgCharityNumber}
                        onChange={handleChange}
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
                        value={formData.orgHouseNumber}
                        onChange={handleChange}
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
                        value={formData.contact1Title}
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
                          value={formData.otherContact1Title}
                          onChange={handleChange}
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
                        value={formData.contact1Fname}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>Last Name *</label>
                      <input
                        maxLength={2000}
                        type="text"
                        placeholder="Eg. Doe"
                        value={formData.contact1Lname}
                        onChange={handleChange}
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
                        value={formData.contact1Email}
                        onChange={handleChange}
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
                        value={formData.contact1Phone}
                        onChange={handleChange}
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
                      value={formData.contact1Role}
                      onChange={handleChange}
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
                      checked={formData.secondContact}
                      onChange={handleChange}
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
                          value={formData.contact2Title}
                          onChange={handleChange}
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
                            value={formData.otherContact2Title}
                            onChange={handleChange}
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
                          value={formData.contact2Fname}
                          onChange={handleChange}
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
                          value={formData.contact2Lname}
                          onChange={handleChange}
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
                          value={formData.contact2Email}
                          onChange={handleChange}
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
                          value={formData.contact2Phone}
                          onChange={handleChange}
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
                        value={formData.contact2Role}
                        onChange={handleChange}
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
                      checked={formData.financeContact}
                      onChange={handleChange}
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
                          value={formData.contact3Title}
                          onChange={handleChange}
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
                            value={formData.otherContact3Title}
                            onChange={handleChange}
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
                          value={formData.contact3Fname}
                          onChange={handleChange}
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
                          value={formData.contact3Lname}
                          onChange={handleChange}
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
                          value={formData.contact3Email}
                          onChange={handleChange}
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
                          value={formData.contact3Phone}
                          onChange={handleChange}
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
                        value={formData.contact3Role}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={classes.formContent}>
                <div className={classes.buttonBlock}>
                    <Button type="submit">Update</Button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
