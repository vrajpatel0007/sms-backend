const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dhdjyeud9@gmail.com",
    pass: "ukcocjspopwblbbd",
  },
});

// send mail with defined transport object
const send_otp = async (email, Firstname, Lastname, otp) => {
  try {
    return transporter.sendMail({
      from: "vraj.patel@swiftrut.com",
      to: email,
      subject: "Forgot Password OTP",
      html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">Forgot Password OTP</h2>
                    <p>Please use the following OTP to reset your password:</p>
                    <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f7f7f7;">Field</th>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd; background-color: #f7f7f7;">Details</th>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">Name</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${Firstname} ${Lastname}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">Email</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;">OTP</td>
                            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #4CAF50;">${otp}</td>
                        </tr>
                    </table>
                    <p style="margin-top: 20px;">Regards,<br>Your Team</p>
                </div>
            `,
    });
  } catch (error) {
    return false;
  }
};

module.exports = {
  send_otp,
};
