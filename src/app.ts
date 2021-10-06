import express from "express";
import ApiError from "./utils/ApiError";
import trailersRouter from "./routes/trailers";
let app = express();

//api
app.use("/api/v1/trailers", trailersRouter);

//404
app.all("*", (req, res, next) => {
  let err = new ApiError(`Can't find "${req.originalUrl}"`, 404);
  next(err);
});

export default app;
