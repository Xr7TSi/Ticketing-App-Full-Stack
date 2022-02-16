// see https://nodemailer.com/about/ for more info

const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// TTo Do: use .env for host, port, user, pass for security
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "susana.stanton63@ethereal.email",
    pass: "3GJsJ8zXNuNTUZYRgX",
  },
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      resolve(result);
    } catch (error) {
      console.log("Error at nodemailer send / " + error);
    }
  });
};

const notifyPinEmail = (email, pin) => {
  const info = {
    from: '"CMR Company" <susana.stanton63@ethereal.email>', // sender address
    to: email,
    subject: "Password reset PIN ", // Subject line
    text:
      "Here is your password reset PIN: " +
      pin +
      ".  This pin will expire in one day.", // plain text body
    html: `<h2>Here is your password reset PIN: ${pin}</h2>
        <h4>This PIN will expire in one day.</h4>`,
  };
  send(info);
};

const notifyPasswordReset = (email) => {
  const info = {
    from: '"CMR Company" <susana.stanton63@ethereal.email>', // sender address
    to: email,
    subject: "Password updates ", // Subject line
    text: "Your password has been updated.",

    html: `<h2>Your password has been updated.</h2>`,
  };
  send(info);
};


// reminder: make verificationURL function as a link
// reminder: test that user is getting email
const newUserConfirmation = (email, verificationURL) => {
  const info = {
    from: '"CMR Company" <susana.stanton63@ethereal.email>', // sender address
    to: email,
    subject: "New User Confirmation ", // Subject line
    text: "Follow the link to verify your account.",

    html: `<h2>Follow the link to verify your account.</h2>
    <a href="${verificationURL}">Verification Link</a>`,

  };
  send(info);
};




module.exports = {
  notifyPinEmail,
  notifyPasswordReset,
  newUserConfirmation,
};
