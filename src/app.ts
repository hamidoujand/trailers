import express from "express";
import ApiError from "./utils/ApiError";
import trailersRouter from "./routes/trailers";
import { globalErrorHandler } from "./controllers/errorController";
let app = express();

//api
app.use("/api/v1/trailers", trailersRouter);

//404
app.all("*", (req, res, next) => {
  let err = new ApiError(`Can't find "${req.originalUrl}"`, 404);
  next(err);
});

//global error handler
app.use(globalErrorHandler);

export default app;
