const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');

const transporter = nodemailer.createTransport(
  smtpPool({
    host: 'smtp.example.com',
    port: 587,
    auth: {
      user: 'user@example.com',
      pass: 'password',
    },
    maxConnections: 10,
    maxMessages: 100,
    rateDelta: 5000,
    rateLimit: 10,
  })
);
