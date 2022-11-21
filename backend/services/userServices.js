const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { REFRESH_TOKEN_SECRET } = process.env;

const registerUser = async (body) => {
  try {
    const newUser = await User.create(body);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (email) => {
  try {
    const user = await User.findOne({ email });

    const accessToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const refreshToken = async (refreshToken) => {
  try {
    const newAccessToken = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return;
        else {
          const user = await User.findById(decoded.id);
          return await user.generateAuthToken();
        }
      }
    );
    return newAccessToken;
  } catch (error) {
    throw new Error(error);
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findById(id).select("-password");
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (body, id) => {
  try {
    let user = await User.findById(id);
    const properties = Object.keys(body);

    properties.forEach((property) => {
      if (user[property] !== body[property]) {
        console.log(user[property]);
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

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  getUser,
  updateUser,
  deleteUser,
};
