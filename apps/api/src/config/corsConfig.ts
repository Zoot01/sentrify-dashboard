const whitelist = [
  "http://127.0.0.1:3987",
  "http://127.0.0.1:3987/",
  "http://localhost:3987",
  "http://localhost:4173",
  "http://localhost:4173/",
];

const corsConfig = {
  origin: function (
    origin: string,
    callback: (arg0: any, arg1: boolean) => void
  ) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};

export default corsConfig;
