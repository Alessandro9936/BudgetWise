const createHttpError = require("http-errors");
const {
  registerUser,
  loginUser,
  refreshToken,
  getUser,
  updateUser,
  deleteUser,
} = require("../services/userServices");

// @desc Register new user
// @route POST /register
// @access Public
const registerUserHandler = async (req, res, next) => {
  try {
    await registerUser(req.body);

    res.status(201).end();
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Authenticate user
// @route POST /login
// @access Public
const loginUserHandler = async (req, res, next) => {
  try {
    const { refreshToken, accessToken, id } = await loginUser(req.body.email);

    // Assign refresh token in http-only cookie
    // to prevent it from being exposed to client-side
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ id, accessToken });
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Authenticate user
// @route GET /user
// @access Private
const getUserHandler = async (req, res, next) => {
  try {
    const user = await getUser(req.user.id);

    res.status(200).json(user);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Generate new token
// @route POST /refresh
// @access Public
const refreshTokenHandler = async (req, res, next) => {
  try {
    if (req.cookies?.jwt) {
      const refToken = req.cookies.jwt;

      const newAccessToken = await refreshToken(refToken);

      res.status(200).json(newAccessToken);
    } else {
      next(createHttpError(403, "Forbidden"));
    }
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Update user
// @route PUT /user
// @access Private
const updateUserHandler = async (req, res, next) => {
  try {
    await updateUser(req.body, req.user.id);

    res.status(204).end();
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Delete user
// @route POST /user
// @access Private
const deleteUserHandler = async (req, res, next) => {
  try {
    await deleteUser(req.user.id);

    res.status(204).end();
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Logout user
// @route GET /user
// @access Private
const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none" });
    res.status(204).end();
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
  getUserHandler,
  refreshTokenHandler,
  logoutUser,
  deleteUserHandler,
  updateUserHandler,
};
