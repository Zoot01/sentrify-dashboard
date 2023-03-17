import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { SendEmailParams } from "./types";
import ENV from "@config/envVars";

const sendEmail = async <T = any>({
  data,
  recipients,
  subject,
  template,
}: SendEmailParams<T>): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: ENV.EMAIL_SERVICE,
      auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASSWORD,
      },
    });

    const source = fs.readFileSync(
      path.join(__dirname, "/templates/", template),
      "utf8"
    );

    const compiledTemplate = handlebars.compile(source);

    const mailOptions = {
      from: `'Sentrify'<${ENV.EMAIL_USER}>`, // sender address (who sends)
      to: recipients,
      subject,
      html: compiledTemplate(data),
    };

    transporter.sendMail(mailOptions, function (error, info): void {
      if (error) {
        return console.log(error);
      }
      return console.log(info.response);
    });
  } catch (err) {
    return console.log(err);
  }
};

export default sendEmail;
