import TelegramBot from "node-telegram-bot-api";
import type { NextApiResponse, NextApiRequest } from "next";

if (!process.env.TELEGRAM_TOKEN || !process.env.TELEGRAM_CHAT) {
  throw new Error("Missing required environment variables.");
}

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: false,
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { message } = req.query;

  if (typeof message !== "string") {
    res.status(400);
    res.end("?message= query param is required and must be a string");
    return;
  }

  bot
    .sendMessage(Number(process.env.TELEGRAM_CHAT), `New feedback: ${message}`)
    .then((msg) => {
      console.log("Sent telegram message", msg)

      res.status(200);
      res.end("");
    })
    .catch(e => {
      console.error("Telegram error", e)
      res.status(500)
      res.end(JSON.stringify({ error: "Can not send feedback"}))
    })
};
