const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const Budget = require("../models/budgetModel");
const { REFRESH_TOKEN_SECRET } = process.env;

const registerUserService = async (body) => {
  try {
    const newUser = await User.create(body);
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

    properties.forEach((property) => {
      if (user[property] !== body[property]) {
        user[property] = body[property];
      }
    });

    /*
  Use save approach instead of findByIdAndUpdate because doing this way 
  when the user is saved the password is automatically hashed with pre hook on save(look user model methods)
  */
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
