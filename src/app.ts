import express from "express";
import ApiError from "./utils/ApiError";
let app = express();

app.get("/", (req, res) => {
  res.send({
    msg: "some thing cool",
  });
});

app.all("*", (req, res, next) => {
  let err = new ApiError(`Can't find "${req.originalUrl}"`, 404);
  next(err);
});

export default app;
