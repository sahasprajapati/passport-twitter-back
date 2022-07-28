import passport from "passport";
import { twitterConfig } from "../../config/twitter.config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TwitterStrategy = require("passport-twitter");

export const twitterInitialize = () => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: twitterConfig.key,
        consumerSecret: twitterConfig.secret,
        callbackURL: "http://localhost:4000/auth/twitter/redirect",
      },
      (token: any, tokenSecret: any, profile: any, cb: any) => {
        console.log("token", token);
        console.log("token", tokenSecret);
        console.log("token", profile);
        return cb(null, profile);
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user as Express.User);
  });
};
