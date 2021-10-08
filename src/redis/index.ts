import redis from "redis";

export let redisClient = redis.createClient({ host: "redis" });
