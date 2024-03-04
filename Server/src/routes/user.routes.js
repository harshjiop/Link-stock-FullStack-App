import { Router } from "express";
import {
  changeCurrentPassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  getCurrentUser,
  UserSetTheme,
  ForgetPassword,
  ForgetPasswordUpdate,
  isEmailVerified,
  SendEmailForVerifacation,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/email-send").get(verifyJWT, SendEmailForVerifacation);

//SECURED ROUTES
router.route("/email-verifide").post(isEmailVerified);
router.route("/lougout").get(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/my-account").get(verifyJWT, getCurrentUser);
router
  .route("/forget-password")
  .post(ForgetPassword)
  .patch(ForgetPasswordUpdate);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/update-theme").patch(verifyJWT, UserSetTheme);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;
