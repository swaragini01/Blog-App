import exp from "express";
import { authenticate } from "../services/authService.js";
import { UserTypeModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middlewares/verifyToken.js";
export const commonRouter = exp.Router();

//login
commonRouter.post("/login", async (req, res, next) => {
  try {
    //get user cred object
    let userCred = req.body;
    //call authenticate service
    let { token, user } = await authenticate(userCred);
    //save token as httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });
    //send res
    res.status(200).json({ message: "login success", payload: user });
  } catch (err) {
    next(err);
  }
});

//logout for User, Author and Admin
commonRouter.get("/logout", (req, res) => {
  // Clear the cookie named 'token'
  res.clearCookie("token", {
    httpOnly: true, // Must match original  settings
    secure: process.env.NODE_ENV === "production", // Must match original settings
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Must match original settings
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//Change password(Protected route)
commonRouter.put("/change-password", async (req, res) => {
  //get current password and new password
  const { role, email, currentPassword, newPassword } = req.body;
  // Prevent same password
  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "newPassword must be different from currentPassword" });
  }

  // Find user by email (works for USER, AUTHOR, ADMIN — all same collection)
  const account = await UserTypeModel.findOne({ email });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, account.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }
  // Hash and save new password
  account.password = await bcrypt.hash(newPassword, 10);
  await account.save();

  res.status(200).json({ message: "Password changed successfully" });
});

//Page refresh
commonRouter.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const user = await UserTypeModel.findById(req.user.userId).select("-password");

  if (!user || user.isActive === false) {
    return res.status(401).json({ message: "Account is not active. Please login again" });
  }

  res.status(200).json({
    message: "authenticated",
    payload: user,
  });
});

//Read one active article for logged in users/authors/admins
commonRouter.get("/articles/:id", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const article = await ArticleModel.findOne({
    _id: req.params.id,
    isArticleActive: true,
  })
    .populate("author", "firstName lastName email")
    .populate("comments.user", "firstName lastName email");

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({ message: "article", payload: article });
});
