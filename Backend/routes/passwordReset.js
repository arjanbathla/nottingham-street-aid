const express = require('express');
const router = express.Router();
const Auth = require('../models/authModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'streetaidnottingham@gmail.com',
    pass: 'pucmckappwutsuwr'
  }
});

router.post('/request-reset', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Auth.findOne({ username: email });
    if (!user) return res.status(404).json({ error: 'Email not found' });

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    user.resetCode = resetCode;
    user.resetCodeExpires = expires;
    await user.save();

    await transporter.sendMail({
      from: '"StreetAid Support" <streetaidnottingham@gmail.com>',
      to: email,
      subject: 'Reset Your Password',
      text: `Your reset code is: ${resetCode}\nIt will expire in 10 minutes.`
    });

    res.json({ message: 'Reset code sent to your email.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await Auth.findOne({ username: email, resetCode: code });
    if (!user || user.resetCodeExpires < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    res.json({ message: 'Code verified. You may now reset your password.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    const user = await Auth.findOne({ username: email, resetCode: code });
    if (!user || user.resetCodeExpires < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
