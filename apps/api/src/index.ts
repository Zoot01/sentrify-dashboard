import {
  BullAdapter,
  createBullBoard,
  ExpressAdapter,
} from "@bull-board/express";
import corsConfig from "@config/corsConfig";
import ENV from "@config/envVars";
import expressSession from "@config/expressSession";
import { errorResponder } from "@utils/errorHandler";
import authRoutes from "@v1/routes/auth";
import cors from "cors";
import express, { Application, json } from "express";
import { queue } from "./queues";

const app: Application = express();

app.set("trust proxy", true);
app.use(json());
app.use(cors(corsConfig));
app.use(expressSession);

app.get("/api/v1", async (_req, res) => {
  res.status(200).json({ msg: "Server is live and running. 🎣" });
});

// Bull-board for viewing queues
if (ENV.ALLOW_BULL_DASHBOARD) {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath("/api/v1/bull");

  createBullBoard({
    queues: [new BullAdapter(queue)],
    serverAdapter,
  });

  app.use("/api/v1/bull", serverAdapter.getRouter());
}

// Auth routes
app.use("/api/v1/auth", authRoutes);

// Use error responder middleware
app.use(errorResponder);

// Start Server
app.listen(ENV.PORT, async () => {
  if (ENV.SEED_DATABASE) {
    console.log(
      "Seeding DB 🌱... You should create a seeding script or use the prisma provided seedDB function."
    );
  }
  try {
    console.log(`🥇 Example app listening at http://localhost:${ENV.PORT}.`);
    if (ENV.ALLOW_BULL_DASHBOARD) {
      console.log(
        `🐂 Bull dashboard live at http://localhost:${ENV.PORT}/api/v1/bull.`
      );
    }
  } catch (e) {
    console.log(`🌋 Server failed to start.`);
  }
});
