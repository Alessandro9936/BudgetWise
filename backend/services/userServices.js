const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const Budget = require("../models/budgetModel");
const hashPassword = require("../utils/hashPassword");
const { REFRESH_TOKEN_SECRET } = process.env;

const registerUserService = async (body) => {
  try {
    const newUser = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      userBudget: body.userBudget,
      password: await hashPassword(body.password),
      currency: body.currency,
    });

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const loginUserService = async (email) => {
  try {
    const user = await User.findOne({ email });

    const accessToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();

    return {
      firstName: user.firstName,
      lastName: user?.lastName,
      refreshToken,
      accessToken,
      currency: user.currency,
      email: user.email,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const refreshTokenService = async (refreshToken) => {
  try {
    const token = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return;
        else {
          const user = await User.findById(decoded.id).select(
            "firstName lastName email currency"
          );
          const accessToken = await user.generateAuthToken();
          return { user, accessToken };
        }
      }
    );
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserService = async (id) => {
  try {
    const user = await User.findById(id).select(
      "firstName lastName email createdAt"
    );
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserService = async (body, id) => {
  try {
    let user = await User.findById(id);
    const properties = Object.keys(body);

    if (properties.includes("password")) {
      user.password = await hashPassword(body.password);
    }

    properties.forEach((property) => {
      if (user[property] !== body[property] && property !== "password") {
        user[property] = body[property];
      }
    });

    await user.save();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUserService = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    await Transaction.deleteMany({ user: deletedUser._id });
    await Budget.deleteMany({ user: deletedUser._id });
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  registerUserService,
  loginUserService,
  refreshTokenService,
  getUserService,
  updateUserService,
  deleteUserService,
};
