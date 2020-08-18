import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY env variable must be provided");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

type HandlerEvent = {
  path: string;
  httpMethod: string;
  body: string;
};

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function handler(event: HandlerEvent) {
  if (event.httpMethod === "OPTIONS") {
    return {
      headers,
      statusCode: 200,
      body: "",
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      throw new Error("message must be provided with body");
    }

    await sgMail.send({
      from: {
        name: "Dmitriy Kovalenko",
        email: "note@dmtrkovalenko.dev",
      },
      to: "neroquint@gmail.com",
      subject: `Personal feedback of ${new Intl.DateTimeFormat("ru", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date())}`,
      text: message,
    });

    console.log("Feedback sent: ", message);

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false }),
    };
  }
}
