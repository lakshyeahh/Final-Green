import nodemailer from 'nodemailer';

const sendEmail = async (to,text, html) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' (all lowercase)
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Reward from Green',
        text,
        html
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
      throw new Error('Failed to send email');
    }
  };

export default sendEmail;

