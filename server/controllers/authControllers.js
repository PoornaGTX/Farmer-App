const User = require("../modal/Users");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors/index");
//register
const register = async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  return res.status(StatusCodes.CREATED).json({ user, token });
};
//login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all details");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};
//update User
const updateUser = async (req, res) => {
  // res.send("updateUser");
  const { name, email, mobile } = req.body;
  if (!email || !name || !mobile) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.mobile = mobile;

  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

module.exports = { register, login, updateUser };
