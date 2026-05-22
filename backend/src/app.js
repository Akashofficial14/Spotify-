const express = require("express")
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRoutes = require("./router/auth.routes");
const userRoutes = require("./router/user.routes")
const connectDB = require("./config/db");
const { errorMiddleware } = require("./middlewares/error.middleware");
const userModel = require("./models/user.model");
const app = express()
connectDB()
const allowedOrigins = [
  "http://localhost:5173",
  "https://spotify-ikov.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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
app.use("/api/user", userRoutes)
app.use(errorMiddleware)
module.exports = app