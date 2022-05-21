const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userScheme = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
      minlength: 4,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email address."],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email address",
      },
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "Please provide mobile."],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Please provide ac type."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password."],
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

//hash the password before create the instance
userScheme.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//method for create jSON web token
//after creating the instance in the server
userScheme.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
//compare password
userScheme.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userScheme);

module.exports = User;
