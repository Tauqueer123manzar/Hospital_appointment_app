const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// SMS configuration
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendEmailNotification = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
      html: `<p>${message}</p>` // Optional HTML version
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error.message 
    });
  }
};

exports.sendSMSNotification = async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    const smsResponse = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'SMS sent successfully',
      sid: smsResponse.sid 
    });
  } catch (error) {
    console.error('SMS sending error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send SMS',
      error: error.message 
    });
  }
};