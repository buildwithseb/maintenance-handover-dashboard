const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY.trim());

exports.sendMail = async (to, subject, text) => {
    
    return sgMail.send({
        to,
        from: process.env.SENDGRID_FROM_EMAIL.trim(),
        subject,
        text
    });
  
};