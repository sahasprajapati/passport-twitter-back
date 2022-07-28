import cors from "cors";
import { config } from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import handleError from "./common/utils/error-handler";
import { appConfig } from "./config/app.config";
import { twitterInitialize } from "./infrastructure/passport/passport.provider";
import { profileRouter } from "./routes";
import { authRouter } from "./routes/auth.route";
import { errorRouter } from "./routes/error.route";
import cookieSession from "cookie-session";
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
  app.use("/", profileRouter);

  // Error handler
  app.use(handleError);

  app.use(errorRouter);
}

function setupMiddleware() {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
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

function setupPassport() {
  app.use(
    cookieSession({
      name: "session",
      keys: [appConfig.cookieKey],
      secure: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  twitterInitialize();
}
async function main() {
  await setupDatabase();
  setupExpress();
  setupPassport();
  setupMiddleware();
  setupRoutes();
  app.listen(appConfig.port, () => {
    console.log(`Server is running at http://localhost:${appConfig.port}`);
  });
}

main();
