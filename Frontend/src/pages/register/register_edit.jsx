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

import { useSelector, useDispatch } from 'react-redux';
import { selectAuths, updateAuth } from "../../contextStore/authsStore";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signup, isLoadingSignup, errorSignup } = useSignup();

  const { id } = useParams();
  const [foundAuth, setFoundAuth] = useState(useSelector(selectAuths).find(auth => auth._id === id));

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const [formData, setFormData] = useState(foundAuth);

//  console.log('foundAuth', foundAuth)
//  console.log('formData', formData)
//  console.log('foundAuth - stringify', JSON.stringify(foundAuth))
//  console.log('formData - stringify', JSON.stringify(formData))

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
    console.log('updating t')
    const response = await fetch(
      import.meta.env.VITE_API_HOST + "/api/auth/update",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const updatedAuth = await response.json();
      setFoundAuth(updatedAuth);
      setFormData(updatedAuth);
      setIsUpdated(false);
      dispatch(updateAuth(updatedAuth));
    } else {
      console.error('Failed to update auth');
    }
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('values', { name, value, type, checked })
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    setFormData(updatedFormData);
    setIsUpdated(JSON.stringify(updatedFormData) !== JSON.stringify(foundAuth));
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
                      name="orgName"
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
                      name="orgAdr1"
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
                      name="orgAdr2"
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
                      name="orgTown"
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
                      name="orgCounty"
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
                      name="orgPostcode"
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
                        name="orgEmail"
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
                        name="orgPhone"
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
                      name="orgWebsite"
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
                      name="orgType"
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
                    {formData.orgType === "Other" && (
                      <input
                        name="otherOrgType"
                        maxLength={2000}
                        type="text"
                        value={formData.otherOrgType}
                        onChange={handleChange}
                        placeholder="Other Organisation Type"
                        required
                      />
                    )}
                  </div>

                  {formData.orgType === "Charity" && (
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        Charity Number *
                      </label>
                      <input
                        name="orgCharityNumber"
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

                  {(formData.orgType === "Community Interest Company (CIC)" ||
                    formData.orgType === "Social Enterprise/LTD by Guarantee") && (
                    <div className={classes.inputBlock}>
                      <label className={classes.inputLabel}>
                        CRN Companies House Number *
                      </label>
                      <input
                        name="orgHouseNumber"
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
                        name="contact1Title"
                        value={formData.contact1Title}
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
                      {formData.contact1Title === "Other" && (
                        <input
                          name="otherContact1Title"
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
                        name="contact1Fname"
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
                        name="contact1Lname"
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
                        name="contact1Email"
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
                        name="contact1Phone"
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
                      name="contact1Role"
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
                      name="secondContact"
                      maxLength={2000}
                      className={classes.checkbox}
                      type="checkbox"
                      id="secondContact"
                      checked={formData.secondContact || !('secondContact' in formData) && formData.contact2Fname}
                      onChange={handleChange}
                    />
                    <label htmlFor="secondContact">
                      {(formData.secondContact || !('secondContact' in formData) && formData.contact2Fname) ? "Remove" : "Add"} Second Point Of Contact
                    </label>
                  </div>
                </div>

                {(formData.secondContact || !('secondContact' in formData) && formData.contact2Fname) && (
                  <div className={classes.multiInputBlock}>
                    <h3 className={classes.subTitle}>2nd Point Of Contact</h3>
                    <div className={classes.relatedInputBlock}>
                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>Title *</label>
                        <select
                          name="contact2Title"
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
                        {formData.contact2Title === "Other" && (
                          <input
                            name="otherContact2Title"
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
                          name="contact2Fname"
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
                          name="contact2Lname"
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
                          name="contact2Email"
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
                          name="contact2Phone"
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
                        name="contact2Role"
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
                      name="financeContact"
                      maxLength={2000}
                      className={classes.checkbox}
                      type="checkbox"
                      id="financeContact"
                      checked={formData.financeContact || !('financeContact' in formData) && formData.contact3Fname}
                      onChange={handleChange}
                    />
                    <label htmlFor="financeContact">
                      {(formData.financeContact || !('financeContact' in formData) && formData.contact3Fname) ? "Remove" : "Add"} Finance Contact
                    </label>
                  </div>
                </div>

                {(formData.financeContact || !('financeContact' in formData) && formData.contact3Fname) && (
                  <div className={classes.multiInputBlock}>
                    <h3 className={classes.subTitle}>Finance Contact</h3>
                    <div className={classes.relatedInputBlock}>
                      <div className={classes.inputBlock}>
                        <label className={classes.inputLabel}>Title *</label>
                        <select
                          name="contact3Title"
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
                        {formData.contact3Title === "Other" && (
                          <input
                            name="otherContact3Title"
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
                          name="contact3Fname"
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
                          name="contact3Lname"
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
                          name="contact3Email"
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
                          name="contact3Phone"
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
                        name="contact3Role"
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
                    <Button type="submit" disabled={!isUpdated}>Update</Button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
