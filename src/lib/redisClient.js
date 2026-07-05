// src/lib/redisClient.js
import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // لو Redis على جهازك المحلي
});

redisClient.connect().catch(console.error);

export default redisClient;