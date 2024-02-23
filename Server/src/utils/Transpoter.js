import nodemailer from "nodemailer";

const TransPorter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "hk8051871496@gmail.com",
    pass: "erhl lhmf onwi ljgv",
  },
});

export { TransPorter };
