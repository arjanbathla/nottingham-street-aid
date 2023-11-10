import { React, useRef } from 'react';
import classes from './emailForm.module.css';

// import emailjs from '@emailjs/browser';
import Button from "../../components/button/button"

const EmailForm = () => {
    const form = useRef();

    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs.sendForm('service_h2feohr', 'template_bmfymdi', form.current, 'irCIHAiikHeGXZj-4')
    //     .then((result) => {
    //         console.log(result.text);
    //     }, (error) => {
    //         console.log(error.text);
    //     });

    //     e.target.reset();
    // };

    return (
        <div className={classes.emailForm}>
            <h2 className={classes.mainTitle}>Send A Message To Our Team</h2>
            <form ref={form} className={classes.form}>
                <input className={classes.input} type='text' name='fullname' placeholder='Full Name *' required/>
                <input className={classes.input} type='integer' name='phone' placeholder='Phone Number *' pattern="(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}" required/>
                <input className={classes.input} type='text' name='email' placeholder='Email *' pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required/>
                <select className={classes.input} name='subject' required>
                    <option className={classes.option} value="Select_A_Subject" default hidden>Select A Subject *</option>
                    <option className={classes.option} value="Registration">Registration</option>
                    <option className={classes.option} value="Grant Application">Grant Application</option>
                    <option className={classes.option} value="Other">Other</option>
                </select>
                <textarea className={classes.input} style={{minHeight:'11rem'}} maxLength={256} type='text' name='message' placeholder='Message *' required/>
                {/* <div className={classes.checkboxBlock}>
                    <input type="checkbox" id="Policy_Check" name="Policy_Check" className={classes.checkbox} required/>
                    <label for="Policy_Check">Share Form Information With Our Admin Team.</label>
                </div> */}
                <Button value="Send">Submit Form</Button>
            </form>
        </div>
    )
}

export default EmailForm;