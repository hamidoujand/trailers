import express from "express";
let app = express();

app.get("/", (req, res) => {
  res.send({
    msg: "some thing cool",
  });
});

export default app;
