const keys = require("../keys");
const regEmail = require("../emails/registration");
const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: keys.SMTP_HOST,
      port: keys.SMTP_PORT,
      auth: {
        user: keys.SMTP_USER,
        pass: keys.SMTP_PASS,
      },
    });
  }
  async sendActivationMail(email, link) {
    await this.transporter.sendMail(
      regEmail(email, `${keys.API_URL}/auth/activate/${link}`)
    );
  }
}

module.exports = new MailService();
