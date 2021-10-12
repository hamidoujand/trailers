import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cors from "cors";
import ApiError from "./utils/ApiError";
import trailersRouter from "./routes/trailers";
import { globalErrorHandler } from "./controllers/errorController";
let app = express();

//middlewares
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP please try again in 1 hour",
  })
);
app.use(compression());

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
