const nodemailer = require("nodemailer");
const config = require('../config/index');
const logger = require('../log/index')
const {GMAIL_PWD, GMAIL_ADDRESS} = config.mail

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: GMAIL_ADDRESS,
        pass: GMAIL_PWD,
      },
      tls: {
        rejectUnauthorized: false
    }
    });
  }

  async send(template,email) {
    const mailOptions = {
      from: 'Notifications <no-reply>@challenge-alkemy.com>',
      subject: 'Welcome to the Alkemy API Challenge ',
      to: email,
      html: template,
    
    }
    const response = await this.transporter.sendMail(mailOptions)
    logger.info(response)
 }
}

module.exports = new MailSender();
