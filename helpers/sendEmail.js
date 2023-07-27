const nodemailer = require("nodemailer");
require("dotenv").config();

const META_PASSWORD = process.env.META_PASSWORD;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "v.novytskyi@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "v.novytskyi@meta.ua" };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;

// const email = {
//   to: "vinem10460@weizixu.com",
//   from: "v.novytskyi@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// transport.sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//     const email = { ...data, from: "v.novytskyi@meta.ua" };
//     await sgMail.send(email);
//     return true;
// }

// module.exports = sendEmail;
