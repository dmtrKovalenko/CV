import sgMail from "@sendgrid/mail";

process.env.SENDGRID_API_KEY =
  "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";
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY env variable must be provided");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  from: "feedback@dmtrkovalenko.dev",
  to: "dmtr.kovalenko@outlook.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

export async function handler() {
  try {
    await sgMail.send(msg).then(console.log);

    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      ...error.response,
    };
  }
}
