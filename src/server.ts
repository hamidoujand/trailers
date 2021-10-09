import app from "./app";
import config from "./config/index";
import { redisClient } from "./redis";

let server = app.listen(config.port, () =>
  console.log(`listening on ${config.port}`)
);

//shutdown gracefully
process.on("SIGTERM", () => {
  server.close(() => {
    redisClient.flushall();
  });
});
