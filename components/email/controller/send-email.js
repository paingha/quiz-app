const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const CONFIG = require('@CONFIG');

const options = {
  auth: {
    api_key: CONFIG.sendGridApiKey
  }
}

const mailer = nodemailer.createTransport(sgTransport(options));

async function sendEmail(email) {
  try {
    let res = await mailer.sendMail(email);
    return res;
  } catch (error) {
    console.error('ERROR > SENDING MAIL > ', error);
    return error;
  }
}

module.exports = sendEmail;