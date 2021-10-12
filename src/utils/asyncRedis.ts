import { redisClient } from "../redis";
import { CustomMovie } from "../types";

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

export let redisGet = function (key: string): Promise<CustomMovie | null> {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (data) {
        let movie: CustomMovie = JSON.parse(data);
        resolve(movie);
      } else {
        resolve(null);
      }
    });
  });
};
