const config = {
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || '3500',
  appUrl: process.env.APP_URL || 'http://localhost:3500',
  dbUrl: process.env.DB_URI || 'postgres://postgres:123456@localhost:5432/quiz-app',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRY || '2 days' ,  
  sendGridApiKey: process.env.SENDGRID_APIKEY,
  emailFrom: process.env.EMAIL_FROM || 'from_email@gmail.com',
  admin_email: process.env.ADMIN_EMAIL || 'from_admin@gmail.com',
}

module.exports = config;