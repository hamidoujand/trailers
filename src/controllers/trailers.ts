import ApiError from "../utils/ApiError";
import { catchAsync } from "../utils/catchAsync";

export let getTrailer = catchAsync(async (req, res, next) => {
  res.send({
    msg: "hello",
  });
});
