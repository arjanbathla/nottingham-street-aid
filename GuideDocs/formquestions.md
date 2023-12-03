# Form Questions
These are the questions for the registration and grant forms. Some questions can have multiple answers, eg. a grant application form may have more than one contact from the organisation, this will be made clear in the comment column. Questions marked with an asterisk (*) should be implemented as mandatory. Questions with 2 asterisks (**) are mandatory based on the answer to another question - this will be explained in the comments section of that question.



## Registration Form
This is the form organisations will complete once to confirm their details before being able to submit grant application forms.

### 1. Organisation Details
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Name of the referring organisation/charity|Text field|OrgName||
|*Address Line 1|Text field|OrgAddressLine1|eg. Building/Office Name|
|Address Line 2|Text field|OrgAddressLine2|eg. Street Name|
|*Town/City|Text field|Town||
|*County|Checkbox, Nottinghamshire or /other|City|Replacing city with county - only organisations present in Nottinghamshire are allowed. If 'other' application cannot continue|
|*Postcode|Text field|Postcode|Max 8 characters|
|Website|Text field|Website|Website, Facebook or LinkedIn URL|
|*General/Admin Email|Text field|OrgEmail||
|*General/Admin Telephone|Text field|OrgTel|Telephone or mobile number including area code|
|*What is the structure of your organisation? Please, select one.|Dropdown menu|OrgStructure|Options: Charity, Communinty Interest Company (CIC), Social Enterprise/LTD by Guarantee, Unincorporated Club/Association, Other. If 'Other' is chosen then a text field shoudl appear for the user to type their answer|
|**What is your registered charity number?|Text field|Charity#|Mandatory if 'Charity' is selected in 'What is the structure of your organisation?'|
|**What is your registered CRN companies house number?|Numeric text field|Company#|Mandatory if 'Communinty Interest Company (CIC)' or 'Social Enterprise/LTD by Guarantee' is selected in 'What is the structure of your organisation?'|
|**Please provide details that will enable us to verify your organisation.|Text field|OtherOSField|Mandatory if 'Other' Selected in 'What is the structure of your organisation?'|

### 2. Contact Details
#### 2.1 Primary Contact
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Please select a title|Dropdown menu|PContactTitle|Options: Mr, Mrs, Ms, Miss, Other. If 'Other' is chosen then a text field shoudl appear for the user to type their answer|
|*First Name|Text field|PContactName||
|*Last Name|Text field|PContactName||
|*Job Role|Text field|PContactRole|Job role/title of the primary contact|
|*Please provide your work telephone or mobile number (inc area code)|Text field|PContactTel|Job role/title of the primary contact|
|*Email Address|Text field|PContactEmail|A verification email will be sent to this address from nottingham@streetsupport.net|

#### 2.2 Secondary Contact (Not Mandatory)
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|Please select a title|Dropdown menu|SContactTitle|Options: Mr, Mrs, Ms, Miss, Other. If 'Other' is chosen then a text field shoudl appear for the user to type their answer|
|First Name|Text field|SContactName||
|Last Name|Text field|SContactName||
|Job Role|Text field|SContactRole|Job role/title of the primary contact|
|Please provide your work telephone or mobile number (inc area code)|Text field|SContactTel|Job role/title of the primary contact|
|Email Address|Text field|SContactEmail|A verification email will be sent to this address from nottingham@streetsupport.net|

In the form drafts, they have 'GrantEmail' and 'GrantEmailOther' here. We will deal with these in the grant application form instead so the user that is logged in will be automatically sent the correspondence relating to the grant application.

#### 2.3 Finance Contact
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|Please select a title|Dropdown menu|FContactTitle|Options: Mr, Mrs, Ms, Miss, Other. If 'Other' is chosen then a text field should appear for the user to type their answer|
|First Name|Text field|FContactName||
|Last Name|Text field|FContactName||
|Job Role|Text field|FContactRole|Job role/title of the primary contact|
|Please provide a contact number for payment enquiries|Text field|FContactTel|Job role/title of the primary contact|
|*Email address of who should be contacted in the event of any payment enquiries|Text field|FContactEmail|A verification email will be sent to this address from nottingham@streetsupport.net|
|*Email address to be used for remittance advice|Text field|FRemittanceEmail|. This might be a separate inbox used by the organisation's finance system|


### 3. GDPR Settings and Preferences
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Please tick this box if you are happy for us to email you with future grant bulletins or communication. These will be sent to your registered admin email.|Checkbox, yes or no|CommsPref|Default 'No'|
|*I give consent for Nottingham Street Aid to share the information that I have provided in line with the Data Sharing Agreement and Privacy Statement. Click here (LINK TBC) to view. You may revoke your consent at any time.|Checkbox, yes or no|DataSharing|Default 'No'. Correct link yet to be given|
|*Please tick this box if you agree to our terms and conditions. Please click here (LINK TBC) to read in full.|Checkbox, yes or no|T&C and Privacy|Default 'No'. Correct link yet to be given|
|*Please tick if you wish to receive our regular e-newsletter.|Newsletter|Checkbox, yes or no|Default 'No'|
|*Please tick if you wish to receive our grant bulletins, notifying you of upcoming funding rounds, changes and awards etc.|Checkbox, yes or no|GrantBulletin|Default 'No'|


## Grant Form
This form is to be completed on behalf of a beneficiary by a member of the organisation.

### 1. Beneficiary Details
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Please select title|Dropdown menu|BenTitle|Options: Mr, Mrs, Ms, Miss, Other. If 'Other' is chosen then a text field should appear for the user to type their answer|
|*First Name|Text field|BenName||
|*Last Name|Text field|BenName||
|*Do you have a familial or personal relationship with the beneficiary?|Checkbox, yes or no|None|If 'yes' application cannot continue|
|*Is the beneficiary of no fixed abode?|Checkbox, yes or no|NoFixedAbode||
|**Address Line 1|Text field|BenAddressLine1|Only shows if NoFixedAbode is No|
|Address Line 2|Text field|BenAddressLine2|Only shows if NoFixedAbode is No|
|*Town/City. If beneficiary has no fixed abode, provide the general area in which they stay.|Text field|BenTown||
|*County. If beneficiary has no fixed abode, provide the general area in which they stay.|Checkbox, Nottinghamshire or Other|BenCity|Replacing city with county - only beneficiaries present in Nottinghamshire are allowed. If 'other' application cannot continue.|
|Please provide the beneficiary's email address, if possible.|Text field|BenEmail||
|Please provide the beneficiary's telephone number, if possible. (inc area code)|Text field|BenTel||

### 2. Alternative Contact
Please provide an alternative contact and address through which we can contact the beneficiary. This could be their GP or a supporting organisation. 
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Name|Text field|BenAltContact||
|*Please tell us the job role/relationship to the beneficiary.|Dropdown menu|BenAltRole/BenAltRoleOther|Options: GP, Therapist, Support Worker, Church, Family Member, Friend, Other. If 'Other' is chosen then a text field should appear for the user to type their answer.|
|*Address Line 1|Text field|BenAltAddressLine1|eg. Building/Office Name|
|Address Line 2|Text field|BenAltAddressLine2|eg. Street Name|
|*Town/City|Text field|BenAltTown||
|*County|Text field|BenAltCity|Replacing city with county|
|*Postcode|Text field|BenAltPostcode|Max 8 characters|
|*Please provide the alternative contact's email address.|Text field|BenAltEmail||
|Please provide the alternative contact's telephone number. (inc area code)|Text field|BenAltTel||

### 3. Beneficiary Declaration
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Please indicate that the beneficiary is aware of and supports this application.|Checkbox, yes or no|BenConsent|If 'No' is chosen, the application cannot continue|
|*Please provide a copy of the beneficiary's signed declaration. This could be a handwritten or printed statement. Alternatively, video or audio files of the beneficiary giving verbal consent will be accepted. This should be a link to a shared file (eg. Google Drive, OneDrive). If you experience any difficulties please contact enquiries.nottingham@streetsupport.net.|File upload|BenDeclaration|If not uploaded, the application cannot continue|

### 4. GDPR Settings and Preferences
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Please tick this box if the beneficiary is happy for us to contact them for further information relating to their application or follow-up.|Checkbox, yes or no|BenCommsPref|Default 'No'|
|**Please indicate preferred means of contact.|Dropdown menu|BenContactMethod|Options: Phone, Email|
|*Nottingham Street Aid will hold personal information about the beneficiary in line with the Data Sharing Agreement and Privacy Statement. Click here (LINK TBD) to view. Please confirm consent for Nottingham Street Aid to share information with other organisations to facilitate my and future grant applications. You may revoke your consent at any time by emailing both nottingham@streetsupport.net and enquiries.nottingham@streetsupport.net.|Checkbox, yes or no|BenDataSharing|Default 'No'. Correct link yet to be given|

### 5. Beneficiary's Protected Characteristics
We would like to collect the below data for reporting and analytics. Certain information may also help with the application and award process. This information will remain anonymous. If the beneficiary prefers not to answer any of the questions, please indicate so. 
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Which of these best describes the beneficiaries current gender identity?|Dropdown menu|Gender|Options: Cisgender Male, Cisgender Female, Non-Binary, Gender queer/fluid, Transgender Male, Transgender Female, Intersex, Prefer not to say, Other. If 'Other' is chosen then a text field should appear for the user to type their answer.|
|*Select the beneficiary's age range. They must be over 18.|Dropdown menu|AgeRange|Options: Young adult (18-25), Adults (26-65), Senior (over 65)|
|*Provide the beneficiary's date of birth, if known.|Date or 'not known' button|DOB|Should fall within given range|
|*Please select the ethnicity of the beneficiary.|Dropdown menu||Options: Asian or Asian British: Indian, Asian or Asian British: Pakistani, Asian or Asian British: Bangladeshi, Asian or Asian British: Chinese, Asian or Asian British: Any other Asian background, Black, Black British, Caribbean or African: Caribbean, Black, Black British, Caribbean or African: African, Black, Black British, Caribbean or African: Any other Black, Black British, or Caribbean background, Mixed or multiple ethnic groups: White and Black Caribbean, Mixed or multiple ethnic groups: White and Black African, Mixed or multiple ethnic groups: White and Asian, Mixed or multiple ethnic groups: Any other Mixed or multiple ethnic background, White: English, Welsh, Scottish, Northern Irish or British, White: Irish, White: Gypsy or Irish Traveller, White: Roma, White: Any other White background, Other ethnic group: Arab, Other ethnic group: Any other ethnic group|
|*Religion or belief of the beneficiary.|Dropdown menu|Religion|Options: Christian, Hindu, Buddhist, Jewish, Muslim, Sikh, No Religion, Any other religion|
|*Which of these best describes the beneficiary's current sexual orientation?|Dropdown menu|Sexuality|Options: Asexual, Bisexual, Homosexual, Heterosexual, Pansexual, Queer, Prefer not to say, Other. If 'Other' is chosen then a text field should appear for the user to type their answer.|
|*Please let us know if the beneficiary is disabled in any way as this may be useful to the application. This includes long-term illnesses and temporary disability expected to last 12 months or more.|Checkbox, yes or no|Disability||
|**Details on disability|Text field|None|If 'yes' then offer text field to type answer|
|*Provide the marital or partnership status of the beneficiary.|Dropdown menu|MaritalStatus|Options: Married, Single, Cohabiting, Civil Partnership, Prefer not to say|
|*Please let us know whether the beneficiary is pregnant. This will help with the application process.|Checkbox, yes or no|PreganancyStatus||
|*Does the beneficiary have any dependants and/or anyone they are responsible for care?|Checkbox, yes or no|Dependants||

### 6. **Dependent Details (Only appears if the beneficiary has dependents)
If the beneficiary has dependants please provide details on the number and age of dependants. This will help with the application process.
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|**How many dependents does the beneficiary have?|Number|None||
|**Enter the age of each dependent separated by a comma.|Number|None||
|**Enter any further information about the dependents that would be useful to the application.|Text field|None||

### 7. Beneficiary's Current Situation
Please provide details of the beneficiary's current situation to support their application.
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Please let us know the beneficiary's last known accommodation status/type.|Dropdown menu|AccomStatus|Options: Sofa Surfing, Supported (Hostel etc.), Unsuitable (shed, garage etc.), Temporary (B&B, hotels etc.), Own Tenancy/AST, Risk of Homelessness, Refuge (domestic abuse), Winter/night shelter, Other. If 'Other' is chosen then a text field should appear for the user to type their answer.|
|*How long have they been in this situation/current accommodation status?|Dropdown|AccomLongevity|Options: Less than 1 month, 1-6 months, 6-12 months, 12 months or more|
|*Does the beneficiary have a previous history of homelessness?|Checkbox, yes or no|PreviousHistory||
|*Please provide details of the beneficiary's history of homelessness.|Text field|HistDetails|e.g. number of times homeless, time period, accommodation status etc|
|*Approximately how long has the beneficiary lived in Nottingham?|Dropdown menu|TimeInNotts|Options: Less than a month, Up to 6 months, 6-12 months, 1-2 years, More than 2 years|
|*Does the beneficiary have links to Nottingham?|Checkbox, yes or no|LinkToNotts||
|*Please provide details of their links to Nottingham|Text field|LinktoNottsDetails|If 'yes' then offer text field to type answer|

### 8. Reasons for Application
Please let us know why you are making this application and the impact the grant will have to the beneficiary.  Please provide as much pertinent information as possible.
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Please let us know what the grant will be used for by selecting one (or more) of the options, providing further detail where requested. If your reason for grant application is not listed select ‘other’ and specify.|Dropdown, multiple selections|GrantReason|Options: Home improvements, Whitegoods, Therapy/ Counselling, Deposit, Digital Device (tablet, mobile, laptop), Other Membership/Fees, Travel Pass (Robinhood card etc), Bike/Car, Work clothes/safety gear, Work equip/materials, Licenses (Peddlers), Training/Education, Other. If 'Other' is chosen then a text field should appear for the user to type their answer.|
|*Please provide details for the grant application.|Text field|OtherGrantReason|less than 300 words|
|*Please explain how the award will help the recipient get off or stay off the street. If the award is part of some larger plan to assist the individual, please explain the part the award will play.|Text field|StoryDialog||

### 9. Grant Amount
Please indicate the grant amount being applied for and where possible provide quotes. The maximum amount is £750 per grant and £2k per person over their lifetime. Only one grant will be awarded per person in a 6 month period.
|Question|Field Type|Satisfied Dataset Entity|Comments|
|-|-|-|-|
|*Please provide the total amount applied for in GBP (£).|Numeric|None|less than 750 GBP|
|Please provide the cost estimate for each item included in your application.|Text field|CostBreakdown||
|Please provide quotes for higher cost items, above £100 attaching copies where possible. This should be a link to a shared file (eg. Google Drive, OneDrive). Up to 3 quotes can be provided. Please ensure that access rights have been granted to both Nottingham@streetsupport.net and  enquiries.nottingham@streetsupport.net (or anyone with a link).|Text field|Quote|There can be many quotes, so if one field is filled in then make another appear. This can happen up to 3 times. Or have 3 different fields that can be filled in.|
|Indicate whether quotes or other supporting artefacts have been included with the application.|Checkbox, yes or no|QuoteAttachments||
