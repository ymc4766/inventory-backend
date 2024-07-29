import User from "../models/userModal.js";
import { asyncHandler } from "../utils/asynchandler.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, dept } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(403);
    throw new Error("user Already Exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    dept,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      dept: user.dept,
      procurement: user.procurement,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("invalid data try again");
  }
});

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dept: user.dept,
      isAdmin: user.isAdmin,
      procurement: user.procurement,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("invalid Email And Password !!");
  }
});
