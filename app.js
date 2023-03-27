import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import line, { Client } from "@line/bot-sdk";

const LINE_CHANNEL_SECRET = "589e1b6501a00711d18899c36eec1120";

const config = {
  channelAccessToken:
    "dljKvlI/jiuRbHjMspYBBJ9GRETmA+QCbh2R8pjjqDw/8uaL4xuZN+IWNFujdYwCysO2DVSwiFoDfHMPa2Xwx0NfU8I/l0xHiCwbhZTlZnuHsd+3cNfKgDn61KDBg0VGsV5byrEDhj+5RNN3XR2c1QdB04t89/1O/w1cDnyilFU=",
  channelSecret: process.env.LINE_CHANNEL_SECRET || LINE_CHANNEL_SECRET,
};

const client = new Client(config);

// import corsOptions from "./src/config/corsOptions.js";
// import credentials from "./src/middleware/credentials.js";

// import userRoutes from "./src/routes/user.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import otpRoutes from "./src/routes/otpRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("My Serser is running");
});

app.use("/images", express.static("public/images"));

app.use("/service", serviceRoutes);
// app.use("/user", userRoutes);
app.use("/otp", otpRoutes);

// LINE OA

app.post("/webhook", line.middleware(config), async (req, res) => {
  try {
    const result = await Promise.all(req.body.events.map(handleEvent));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

const handleEvent = async (event) => {
  if (event.type !== "message" || event.message.type !== "text") {
    // Ignore non-text messages
    return null;
  }

  const message = {
    type: "flex",
    altText: "This is a Flex Message",
    contents: {
      type: "bubble",
      direction: "ltr",
      header: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "Hello, World!",
            weight: "bold",
            size: "xl",
          },
        ],
      },
      hero: {
        type: "image",
        url: "https://example.com/image.jpg",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: "This is a Flex Message",
            wrap: true,
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "button",
            action: {
              type: "uri",
              label: "Go to website",
              uri: "https://example.com",
            },
          },
        ],
      },
    },
  };

  return client.replyMessage(event.replyToken, message);
};

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
