import { config } from "dotenv";

config();

export const twitterConfig = {
  key: process.env.TWITTER_API_KEY,
  secret: process.env.TWITTER_API_SECRET,
};
