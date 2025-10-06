const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNewRequestEmail = async (requestData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Assignment Request - Assignly',
    html: `
      <h2>New Assignment Request</h2>
      <p><strong>Name:</strong> ${requestData.full_name}</p>
      <p><strong>Email:</strong> ${requestData.email}</p>
      <p><strong>Phone:</strong> ${requestData.phone}</p>
      <p><strong>Work Type:</strong> ${requestData.work_type}</p>
      <p><strong>Deadline:</strong> ${new Date(requestData.deadline).toLocaleDateString()}</p>
      <p><strong>Notes:</strong> ${requestData.notes || 'None'}</p>
      <br>
      <p>Login to the admin panel to view more details.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('New request email sent to admin');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendConfirmationEmail = async (requestData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: requestData.email,
    subject: 'Your Assignment Request Received - Assignly',
    html: `
      <h2>Thank you for your request, ${requestData.full_name}!</h2>
      <p>We've received your request for <strong>${requestData.work_type}</strong> and our team will review it shortly.</p>
      
      <h3>Request Details:</h3>
      <p><strong>Work Type:</strong> ${requestData.work_type}</p>
      <p><strong>Deadline:</strong> ${new Date(requestData.deadline).toLocaleDateString()}</p>
      <p><strong>Notes:</strong> ${requestData.notes || 'None provided'}</p>
      
      <p>We'll contact you within 24 hours to discuss your requirements in detail.</p>
      
      <br>
      <p>If you have any questions, please don't hesitate to contact us at ${process.env.CONTACT_EMAIL}.</p>
      
      <br>
      <p>Best regards,<br>The Assignly Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to customer');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

module.exports = {
  sendNewRequestEmail,
  sendConfirmationEmail
};