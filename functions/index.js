const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

// Cloud Function to send email notification when a new request is created
exports.sendRequestNotification = functions.firestore
  .document('requests/{requestId}')
  .onCreate(async (snapshot, context) => {
    const requestData = snapshot.data();
    const adminEmail = functions.config().admin.email || process.env.ADMIN_EMAIL;

    // Email content
    const mailOptions = {
      from: `Assignly <${functions.config().gmail.email}>`,
      to: adminEmail,
      subject: `New Request: ${requestData.workType} from ${requestData.fullName}`,
      html: `
        <h2>New Request Received</h2>
        <p><strong>Name:</strong> ${requestData.fullName}</p>
        <p><strong>Email:</strong> ${requestData.email}</p>
        <p><strong>Phone:</strong> ${requestData.phone}</p>
        <p><strong>Type of Work:</strong> ${requestData.workType}</p>
        <p><strong>Deadline:</strong> ${new Date(requestData.deadline).toLocaleDateString()}</p>
        <p><strong>Notes:</strong> ${requestData.notes || 'None'}</p>
        <p><strong>Amount:</strong> $${requestData.amount}</p>
        <p><strong>Request ID:</strong> ${context.params.requestId}</p>
        <p><strong>Submitted at:</strong> ${new Date(requestData.createdAt?.toDate()).toLocaleString()}</p>
        <br>
        <p>Login to the admin dashboard to view more details.</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Notification email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });

// Cloud Function to send confirmation email when payment is completed
exports.sendPaymentConfirmation = functions.firestore
  .document('requests/{requestId}')
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();

    // Check if payment status changed to true
    if (!beforeData.paid && afterData.paid) {
      // Email content
      const mailOptions = {
        from: `Assignly <${functions.config().gmail.email}>`,
        to: afterData.email,
        subject: `Payment Confirmed - Request #${context.params.requestId}`,
        html: `
          <h2>Payment Confirmed</h2>
          <p>Dear ${afterData.fullName},</p>
          <p>Thank you for your payment. Your request has been confirmed and is now being processed.</p>
          <br>
          <p><strong>Request Details:</strong></p>
          <p><strong>Type of Work:</strong> ${afterData.workType}</p>
          <p><strong>Deadline:</strong> ${new Date(afterData.deadline).toLocaleDateString()}</p>
          <p><strong>Amount Paid:</strong> $${afterData.amount}</p>
          <p><strong>Request ID:</strong> ${context.params.requestId}</p>
          <br>
          <p>Our team will begin working on your request immediately. You will receive updates on the progress.</p>
          <br>
          <p>If you have any questions, please contact us at support@assignly.com</p>
          <br>
          <p>Best regards,<br>The Assignly Team</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully');
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }
    }
  });