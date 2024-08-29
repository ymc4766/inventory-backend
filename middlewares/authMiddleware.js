import User from "../models/userModal.js";

import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asynchandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read JWT FROM the "jwt" cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(403);
      throw new Error("Not Authorized or Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("No token , Login Please");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("U have No Clearance To Do this Functionality");
  }
});
