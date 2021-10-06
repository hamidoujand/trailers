import express from "express";
let app = express();

app.get("/", (req, res) => {
  res.send({
    msg: "some thing cool",
    nodeEnv: process.env.NODE_ENV,
  });
});

export default app;
