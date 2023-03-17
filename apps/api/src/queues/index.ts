import Bull, { Job } from "bull";

import envVars from "@config/envVars";
import { SendEmailParams } from "@utils/emails/types";
import sendEmail from "@utils/emails";

export const queue = new Bull("email", {
  redis: envVars.REDIS_URL,
});

export const sendUserEmail = async <DataType = any>(
  payload: SendEmailParams<DataType>
) => {
  await queue.add({
    data: payload.data,
    recipients: payload.recipients,
    subject: payload.subject,
    template: payload.template,
  });
};

queue.process((job: Job) => {
  sendEmail(job.data);
});
