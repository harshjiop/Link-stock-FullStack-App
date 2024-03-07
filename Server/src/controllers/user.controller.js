import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { Page } from "../models/Page.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { TransPorter, SendEmail } from "../utils/Transpoter.js";
import { ResetPasswordTemplate } from "../utils/EmailTemplate/ResetPasswordTemplate.js";
import { PasswordUpdateTemplate } from "../utils/EmailTemplate/PasswordUpdateTemplate.js";
import { AccountVerifactionSucessFull } from "../utils/EmailTemplate/AccountVerifactionSucessFull.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Somthing went wrong while generating referesh and access token "
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  //   console.log("email: ", email);

  if (!fullName || !email || !username || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const FullNameSplite = fullName.split(" ");
  const FistName = FullNameSplite[0];
  const LastName = FullNameSplite[1];
  const avtar = `https://cloud.appwrite.io/v1/avatars/initials?name=${FistName}+${LastName}&width=80&height=80&project=console`;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    fullName,
    email,
    avatar: {
      public_id: "",
      url: avtar,
    },
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const createStoreLink = await Page.create({
    owner: user._id,
    title: "Store",
    url: `/store/@${username.toLowerCase()}`,
    thumbnail: {
      url: "https://ik.imagekit.io/8fgpvoiai/Link%20Stock/icons8-store-50_V9zSkurcu.png?updatedAt=1708748358266",
    },
  });

  if (!createStoreLink) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie
  const { email, username, password } = req.body;
  if (!email && !username) {
    throw new ApiError(400, "Username or email is requair");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User Does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "Password inCorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user loggin Succesfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingrefreshAccessToken =
    res.cookie.refreshToken || req.body.refreshToken;

  if (!incomingrefreshAccessToken) {
    throw new ApiError(401, "unauthorized request");
  }
  try {
    const decodedToken = await jwt.verify(
      incomingrefreshAccessToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid request token ");
    }
    if (incomingrefreshAccessToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used ");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newrefreshToken } =
      await generateAccessAndRefereshTokens(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("newrefreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Refresh token genrated error");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email, bio } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        bio,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  const Get_User_avtar = await User.findById(req.user);
  const deleteCloudanariy = await deleteFromCloudinary(
    Get_User_avtar?.avatar?.public_id
  );
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: {
          public_id: avatar.public_id,
          url: avatar.url,
        },
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

const UserSetTheme = asyncHandler(async (req, res) => {
  const { theme } = req.body;

  if (!theme) {
    throw new ApiError(400, "Theme Id is required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        theme,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Theme updated successfully"));
});

const ForgetPasswordUpdate = asyncHandler(async (req, res) => {
  // const { token } = req.params;
  const { password, token } = req.body;
  // const password = "s123";
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ikt1bWFyaGFyc2h2YXJkaGFuNDI2QGdtYWlsLmNvbSIsImlhdCI6MTcwODY3MTUxNSwiZXhwIjoxNzA4NjcxODE1fQ.qajC4qz2jvkuTdxVbsULOtT7DGEbRl7jgdRfyyeulZc";
  if (!token || !password) {
    throw new ApiError(401, "All Field Are Required");
  }
  const { email } = jwt.verify(token, process.env.RESET_SECRET_TOKEN);
  const hasPassword = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { password: hasPassword } }
  );
  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }
  await SendEmail(email, "Password Update SucessFull", PasswordUpdateTemplate);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Email Send successfully"));
});
const ForgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // const email = "Kumarharshvardhan426@gmail.com"

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  // const user = await User.findOne({email}).select("-password");
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new ApiError(400, `User Does not exist from this ${email} `);
  }

  const Forget_Token = await user.GENERATE_RESET_PASSWORD_TOKEN();
  if (!Forget_Token) {
    throw new ApiError(400, "Somthing Went Worng For Genrating Forget Token");
  }

  const test = SendEmail(
    email,
    "Reset Pasword",

    `

    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                        align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                              <a href="https://rakeshmandal.com" title="logo" target="_blank">
                                <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                              </a>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>
                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0 35px;">
                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                requested to reset your password</h1>
                                            <span
                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                We cannot simply send you your old password. A unique link to reset your
                                                password has been generated for you. To reset your password, click the
                                                following link and follow the instructions.
                                            </p>
                                            <a href="${process.env.Cors_Origin}/password-reset-confirm?token=${Forget_Token}"
                                                style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                Password</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:40px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        <tr>
                            <td style="height:20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">
                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.Harshji.com</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:80px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>

    </html>`
  );

  return res.status(200).json(new ApiResponse(200, "Email Send successfully"));
});

const SendEmailForVerifacation = asyncHandler(async (req, res) => {
  const Account_VeriFecation_Token = await jwt.sign(
    {
      _id: req.user._id,
      email: req.user.email,
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
    req.user.email,
    "Account Verifecation",
    `<!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Email Confirmation</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }
      /**
       * Avoid browser level font resizing.
       * 1. Windows Mobile
       * 2. iOS / OSX
       */
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }
      /**
       * Remove extra space added to tables and cells in Outlook.
       */
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
      /**
       * Better fluid images in Internet Explorer.
       */
      img {
        -ms-interpolation-mode: bicubic;
      }
      /**
       * Remove blue links for iOS devices.
       */
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
      /**
       * Fix centering issues in Android 4.4.
       */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      /**
       * Collapse table borders to avoid space between cells.
       */
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
      </style>
    
    </head>
    <body style="background-color: #e9ecef;">
    
      <!-- start preheader -->
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
      </div>
      <!-- end preheader -->
    
      <!-- start body -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
        <!-- start logo -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                    <img src="https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                  </a>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end logo -->
    
        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end hero -->
    
        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p>
              Hello Sir! <br><br>It looks like you just signed up for The App, that’s awesome! Can we ask you for email confirmation? Just click the button bellow.
            </p>
    
                </td>
              </tr>
              <!-- end copy -->
    
              <!-- start button -->
              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                              <a href="${process.env.Cors_Origin}/account-verification?token=${Account_VeriFecation_Token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Confirm Email Adress</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- end button -->
    
              <!-- start copy -->
    <!--           <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                  <p style="margin: 0;"><a href="https://blogdesire.com" target="_blank">https://blogdesire.com/xxx-xxx-xxxx</a></p>
                </td>
              </tr> -->
              <!-- end copy -->
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                 <div class="content__footer mt-8 text-center text-grey-darker">
            <h3 class="text-base sm:text-lg mb-4">Thanks for using The App!</h3>
            <p>https://www.lets-start-code.com/</p>
          </div>
                </td>
              </tr>
    
            </table>
           
          </td>
        </tr>
    
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
           
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
             
    
            </table>
          
          </td>
        </tr>
    
      </table>
    
    </body>
    </html>`
  );

  return res
    .status(200)
    .json(new ApiResponse(200, SendEmailinuser, "Email Send Successfully"));
});

const isEmailVerified = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(401, "All Field Are Required");
  }
  const { _id, email } = jwt.verify(
    token,
    process.env.ACCOUNT_VERIFECATION_SECRET_TOKEN
  );
  const user = await User.findOneAndUpdate(
    { _id },
    { $set: { account_email_Verified: "true" } },
    { new: true }
  );
  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }
  await SendEmail(
    email,
    "Password Update SucessFull",
    AccountVerifactionSucessFull
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Your Account Verified successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  getCurrentUser,
  UserSetTheme,
  ForgetPassword,
  ForgetPasswordUpdate,
  SendEmailForVerifacation,
  isEmailVerified,
};
