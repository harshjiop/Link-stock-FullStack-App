import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SendEmail, TransPorter } from "../utils/Transpoter.js";

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
    account_email_Verified: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: Schema.Types.ObjectId,
      ref: "Theme",
      default: "67fbc403eadaddb0b3222e1d",
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
      // expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      expiresIn: "5s",
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
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
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
      expiresIn: process.env.RESET_EXPIRY_TOKEN,
    }
  );
};

export const User = mongoose.model("User", userSchema);
