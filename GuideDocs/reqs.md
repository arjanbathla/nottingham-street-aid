 # NSA Requirements Documentation

The proposed solution must fulfil the following requirements:
|ID|Title/Description|Comments|
|--|--|--|
|1|**Form Submission**|So far drafted as Google forms|
|1.1|Registered organisations should be able to submit a registration form|Once an organisation has been verified, they can log in and complete the registration form|
|1.2|Registered organisations should be able to submit multiple grant applications once they have submitted a registration form|After a registration form has been completed, the organisation can then complete beneficiary forms|
|1.3|Form submissions should automatically be stored in a database|Most likely mySQL - Google Forms to Spreadsheet to Database|
|1.4|Registration form should only be submitted once|...|
|1.5|Organisations should receive an email confirmation when they've submitted a registration form|...|
|1.6|Organisations should receive an email confirmation when they've submitted a grant application|...|
|1.7|Organisations should have the option of emailing a copy of the submitted form to their registered email|...|
|1.8|Forms need to meet the data requirements as defined in the draft data dictionary and prototype Google forms|Links to these have been provided separately|
|2|**Database Storage**|Most likely mySQL|
|2.1|Should store all the information from form submissions|Submissions will include data validation|
|2.2|Beneficiaries should be linked to the organisations they're referred from|i.e. organisation foreign key|
|2.3|3 initial tables: User logins, organisations and beneficiaries|This is flexible, but a good starting point|
|2.4|Beneficiary personal data needs to be anonymised to panel members|It should not be necessary to know the beneficiary’s name etc., to process the application|
|3|**User Interface**|How users access the data|
|3.1|UI should be a website/accessible via the cloud|...|
|3.2|Information in database should be accessible via UI|Should be displayed in a user friendly way|
|3.3|Organisations should only be able to see database information submitted by said organisation|Needs to be GDPR compliant|
|3.4|Panel members should be able to see anonymised database information|Needs to be GDPR compliant|
|3.5|NSA admins should be able to see all database information|Needs to be GDPR compliant|
|3.6|Database information should be able to be sorted by certain criteria|Criteria TBD|
|3.7|Database information should be able to be filtered by certain criteria|Criteria TBD|
|3.8|UI design should follow Nottingham Street Aid's current colour palette|For brand identity|
|3.9|Organisations should be able to view and amend all details pertaining to their registration form|...|
|3.10|Organisations should be able to view and amend all details pertaining to their grant applications|...|
|3.11|NSA admins should be able to amend the status of a grant application|e.g. New, Acknowledged, Pending Review, Under Review, Approved, Not Approved|...|
|3.12|Users should be able to search for grant applications by 'Beneficiary Name' or by unique application number (likely to be 'Application ID')|...|
|3.13|Information fields when viewing the database (ie. headers) should have tooltips|...|
|4|**Reporting**|Allowing users to print resultant databases|
|4.1|Database views should be exported as a PDF onto the user's computer|...|
|4.2|Database views should be exported as a CSV onto the user's computer|...|
|5|**User Signups**|...|
|5.1|NSA admins should have 'master' accounts as they have access to all database information|...|
|5.2|Organisations should be able to signup to the website/software|Signup is without access initially|
|5.3|Organisations should be validated by a NSA admin before their email is officially registered|...|
|5.4|Organisations should receive a confirmation email once their account has been verified|...|
|5.5|Organisations should receive a confirmation email once their registration application has been received|...|
|5.6|Organisations should receive an email once if their application has been rejected|...|
|6|**User Logins**|...|
|6.1|Registered users should log in with a unique code sent to their registered email each time|...|
|6.2|Only users with validated accounts will be able to request a login code|...|
|6.3|When login details are entered, the user is asked to confirm the correct organisation details have been retrieved|'Is this you?' type of confirmation, with name and address of organisation|
|6.4|An organisation can have one-to-many users and logins|Each to be added by the initial organisation account used to sign up|
|7|**Website Hosting**|...|
|7.1|Secure and GDPR compliant|...|
|7.2|Hosted in the EU|...|
|7.3|BCP provision|Business continuity plans, with associated SLAs in place|
|8|**User Documentation**|...|
|8.1|Provide a user support guide (PDF document) outlining how to use the system for new users|...|
|8.2|Provide a knowledge transfer protocol document/BCP when the system is done|This should explain how to maintain (add, edit and delete) the forms, database and UI|
|8.3|User guide can be accessed and downloaded via the UI|Look at WCAG 2.1(WC3) compliance as a guidance|
|9|**Other**|...|
|9.1|Both registration and application forms are available via https://streetsupport.net/nottingham/||

Additional requirements:
|ID|Title/Description|Comments|
|--|--|--|
|A1|Organisations should be able to save the data input into a form and return to complete later|Some of the forms are quite long and may require people to complete them overtime without losing previously input data|
|A2|Organisations should be able to review a completed form prior to submission and make adjustments||
|A3|Forms are device agnostic and can be viewed, completed and submitted via mobile, tablet or desktop computers|See https://www.hobo-web.co.uk/browsers-to-test-your-website-on/|
|A4|NSA admins should be notified of any changes made in the database||
|A5|UI is supported across common website browsers and versions|See https://www.hobo-web.co.uk/browsers-to-test-your-website-on/|
|A6|Predefined reports to be considered at a later date||

> Written with [StackEdit](https://stackedit.io/).
