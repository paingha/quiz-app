const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  appUrl: process.env.APP_URL,
  dbUrl: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY,
  sendGridApiKey: process.env.SENDGRID_APIKEY,
  MailGunKey: process.env.MAILGUN_APIKEY,
  emailFrom: process.env.EMAIL_FROM,
  admin_email: process.env.ADMIN_EMAIL,
}

module.exports = config;