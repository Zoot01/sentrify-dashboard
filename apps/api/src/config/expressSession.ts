import connectRedis from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import ENV from "./envVars";

const RedisStore = connectRedis(session);

const redisClient = createClient({
  url: ENV.REDIS_URL,
  legacyMode: true,
});

redisClient
  .connect()
  .then(() => {
    console.log("⏩ Connected to redis successfully");
  })
  .catch((err) => {
    console.log("🌋 Could not establish a connection with redis. " + err);
  });

const expressSession = session({
  store: new RedisStore({ client: redisClient }),
  secret: ENV.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 12, // 12 hour long session
  },
});

export default expressSession;
