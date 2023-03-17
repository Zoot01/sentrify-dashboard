const ENV = {
  PORT: process.env.PORT as string,
  NODE_ENV: process.env.NODE_ENV as string,
  ALLOWED_ORGIN: process.env.ALLOWED_ORGIN as string | string[],
  SEED_DATABASE:
    process.env.SEED_DATABASE === "false"
      ? (false as boolean)
      : (true as boolean),
  DATABASE_URL: process.env.DATABASE_URL as string,
  REDIS_URL: process.env.REDIS_URL as string,
  SESSION_SECRET: process.env.SESSION_SECRET as string,
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE as string,
  ALLOW_BULL_DASHBOARD:
    process.env.ALLOW_BULL_DASHBOARD === "false"
      ? (false as boolean)
      : (true as boolean),
  JWT_SECRET: process.env.JWT_SECRET as string,
};

export default ENV;
