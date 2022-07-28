import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/auth.route";
import handleError from "./common/utils/error-handler";
import { errorRouter } from "./routes/error.route";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/auth.middleware";
import { appConfig } from "./config/app.config";

config();
let app: Express;

function setupExpress() {
  app = express();
}

function setupRoutes() {
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use("/auth", authRouter);

  // Error handler
  app.use(handleError);

  app.use(errorRouter);
}

function setupMiddleware() {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(authMiddleware);
}

async function setupDatabase() {
  await mongoose
    .connect(appConfig.mongoURI)
    .then(() => {
      console.log("Connection to database established");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function main() {
  await setupDatabase();
  setupExpress();
  setupMiddleware();
  setupRoutes();
  app.listen(appConfig.port, () => {
    console.log(`Server is running at http://localhost:${appConfig.port}`);
  });
}

main();
