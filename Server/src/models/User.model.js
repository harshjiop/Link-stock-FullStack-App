import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, RESET_EXPIRY_TOKEN } from "../constants.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      minlenth: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      public_id: {
        type: String, // cloudinary
      },
      url: {
        type: String, // cloudinary
      },
    },

    bio: {
      type: String,
      maxlenth: 50,
    },
    theme: {
      type: Schema.Types.ObjectId,
      ref: "Theme",
      default: "65d7509a76325fad6a78c49f",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      // expiresIn: "24h",
    }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
      // expiresIn: "100h",
    }
  );
};
userSchema.methods.GENERATE_RESET_PASSWORD_TOKEN = async function () {
  return await jwt.sign(
    {
      email: this.email,
    },
    process.env.RESET_SECRET_TOKEN,
    {
      expiresIn: RESET_EXPIRY_TOKEN,
    }
  );
};

export const User = mongoose.model("User", userSchema);
