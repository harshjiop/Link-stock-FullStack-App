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
  const Account_VeriFecation_Token = await jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCOUNT_VERIFECATION_SECRET_TOKEN,
    {
      expiresIn: process.env.ACCOUNT_VERIFECATION_EXPIRY_TOKEN,
    }
  );
  if (!Account_VeriFecation_Token) {
    throw new ApiError(
      400,
      "Somthing Went Worng For Genrating Account VeriFecation Token"
    );
  }
  const SendEmailinuser = await SendEmail(
    this.email,
    "Account Verifecation",
    `<div class="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">

  <div class="mail__wrapper max-w-md mx-auto">
  
    <div class="mail__content bg-white p-8 shadow-md">
  
      <div class="content__header text-center tracking-wide border-b">
        <div class="text-red text-sm font-bold">lets-start-code.com</div>
        <h1 class="text-3xl h-48 flex items-center justify-center">E-mail Confirmation</h1>
      </div>
  
      <div class="content__body py-8 border-b">
        <p>
          Hello Sir! <br><br>It looks like you just signed up for The App, that’s awesome! Can we ask you for email confirmation? Just click the button bellow.
        </p>
        <button  class="  bg-red rounded w-full my-8 p-4 ">
        <a href="${process.env.Cors_Origin}/account-verifecation?token=${Account_VeriFecation_Token}"  class="text-white no-underline " >CONFIRM EMAIL ADRESS</a>
          </button>
        <p class="text-sm">
          Keep Rockin!<br> lets-start-code.com
        </p>
      </div>
  
      <div class="content__footer mt-8 text-center text-grey-darker">
        <h3 class="text-base sm:text-lg mb-4">Thanks for using The App!</h3>
        <p>https://www.lets-start-code.com/</p>
      </div>
  
    </div>
  
  <!--     <div class="mail__meta text-center text-sm text-grey-darker mt-8">
  
      <div class="meta__social flex justify-center my-4">
        <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-instagram"></i></a>
        <a href="#" class="flex items-center justify-center bg-black text-white rounded-full w-8 h-8 no-underline"><i class="fab fa-twitter"></i></a>
      </div>
  
      <div class="meta__help">
        <p class="leading-loose">
          Questions or concerns? <a href="#" class="text-grey-darkest">help@theapp.io</a>
  
          <br> Want to quit getting updates? <a href="#" class="text-grey-darkest">Unsubscribe</a>
        </p>
      </div>
  
    </div>
  
  </div> -->
  
  </div>`
  );
  console.log(Account_VeriFecation_Token);

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
userSchema.methods.generateAccountVerificationToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCOUNT_VERIFECATION_SECRET_TOKEN,
    {
      expiresIn: process.env.ACCOUNT_VERIFECATION_EXPIRY_TOKEN,
    }
  );
};

// const isEmailVerified = asyncHandler(async (req, res) => {
 
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU1N2I2ZTllMDkyYjcyZWQ4MWJlYTgiLCJlbWFpbCI6Imt1bWFyaW1hZGh1cmk5Nzk4QGdtYWlsLmNvbSIsImlhdCI6MTcwOTUzODE1OCwiZXhwIjo2MTcwOTUzODE1OH0.2styo_rIyRgDsX7Jz9ICJK6yhrK2Ft5ZjFKTjmJ9ux0";

//   if (!token) {
//     throw new ApiError(401, "All Field Are Required");
//   }
//   const { _id, email } = jwt.verify(
//     token,
//     process.env.ACCOUNT_VERIFECATION_SECRET_TOKEN
//   );
//   const user = await User.findOneAndUpdate(
//     { _id },
//     { $set: { account_email_Verified: "true" } }
//   );
//   if (!user) {
//     throw new ApiError(401, "Invalid Access Token");
//   }
//   await SendEmail(email, "Password Update SucessFull", PasswordUpdateTemplate);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Your Account Verified successfully"));
// });

export const User = mongoose.model("User", userSchema);
