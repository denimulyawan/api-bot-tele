const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");

var cors = require('cors')

dotenv.config();

const app = express();
const port = 3000;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/message", async (req, res) => {
  const {name, email, message} = req.body

  const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

  const teleMessage = `Hi Deni,\nyou have a new message from\nName: ${name}\nemail: ${email}\n\nThe message is: \n${message}`;

  try {
    await bot.sendMessage(TELEGRAM_CHAT_ID, teleMessage);
    return res.send({ message: "Message sent to telegram"});
  } catch (error) {
    console.log(error);
    return res.send({ message: "Error sending message to telegram"}).status(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
