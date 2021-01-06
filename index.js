const express = require("express");
const Expo = require("expo-server-sdk").default;
const cors = require("cors");

const expo = new Expo();
const expressServer = express();

expressServer.use(cors());
expressServer.listen(process.env.PORT, () => {
  expressServer.get("/", function (req, res) {
    const token = req.query.token;
    if (!Expo.isExpoPushToken(token)) {
      res.send({ err: "Token invalid" });
    } else {
      let messages = [
        {
          to: token,
          sound: "default",
          body: "Notification test",
          data: { test: "Aztèque" },
        },
      ];

      expo
        .sendPushNotificationsAsync(messages)
        .then((ticket) => {
          res.send({ ticket: ticket });
        })
        .catch((err) => {
          console.log("Error when sent");
          res.send({ err: "err when sent" });
        });
    }
  });
});
