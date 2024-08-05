import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
      required: [true, "Add Department user  "],
      enum: {
        values: [
          "Company",
          "Inventory",
          "Maintenance",
          "Silo",
          "Production",
          "Procurement",
        ],
        message: "Please select the Dept",
      },
      default: "Company",
    },

    procurement: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);

  return result;
};

const User = mongoose.model("User", userSchema);
export default User;
