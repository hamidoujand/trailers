import { redisClient } from "../redis";

export let redisSet = function (key: string, value: string): Promise<string> {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, (err, ok) => {
      if (err) {
        return reject(err);
      }
      resolve(ok);
    });
  });
};
