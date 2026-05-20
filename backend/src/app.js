const express = require("express")
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./router/auth.routes");
const connectDB = require("./config/db");
const { errorMiddleware } = require("./middlewares/error.middleware")
const app = express()
connectDB()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let email = profile.emails[0].value;
        let name = profile.name.givenName;

        // Check if the user already exists (registered manually first)
        let existingUser = await userModel.findOne({ email });

        if (existingUser) {
          // If they registered as 'manage_bank' manually, this keeps that role
          existingUser.isVerified = true;
          if (!existingUser.google_id) existingUser.google_id = profile.id;

          await existingUser.save();
          return cb(null, existingUser);
        }

        // If NO user exists, they are a NEW Google User -> Default to 'find_blood'
        let newregUser = await userModel.create({
          name,
          email,
          password: "google_auth_user",
          userRole: "find_blood", // Hardcoded default for new social logins
          google_id: profile.id,
          isVerified: true,
        });

        return cb(null, newregUser);
      } catch (error) {
        return cb(error, null);
      }
    }
  ),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use(errorMiddleware)
module.exports = app