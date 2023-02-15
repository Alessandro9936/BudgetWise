const createHttpError = require("http-errors");
const {
  registerUserService,
  loginUserService,
  refreshTokenService,
  getUserService,
  updateUserService,
  deleteUserService,
} = require("../services/userServices");

// @desc Register new user
// @route POST /api/register
// @access Public
const registerUser = async (req, res, next) => {
  try {
    await registerUserService(req.body);

    res.status(201).end();
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Authenticate user
// @route POST /api/login
// @access Public
const loginUser = async (req, res, next) => {
  try {
    const { refreshToken, accessToken, ...user } = await loginUserService(
      req.body.email
    );

    // Assign refresh token in http-only cookie
    // to prevent it from being exposed to client-side
    res.cookie("jwt", refreshToken, {
      httpOnly: true,

      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ ...user, accessToken });
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Authenticate user
// @route GET /api/user
// @access Private
const getUser = async (req, res, next) => {
  try {
    const user = await getUserService(req.user.id);

    res.status(200).json(user);
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Generate new token
// @route POST /api/refresh
// @access Public
const refreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (cookies.jwt) {
      const refToken = cookies.jwt;

      const { user, accessToken } = await refreshTokenService(refToken);

      const formatUser = {
        firstName: user.firstName,
        lastName: user?.lastName,
        email: user.email,
        currency: user.currency,
        accessToken: accessToken,
      };

      res.status(200).json(formatUser);
    } else {
      next(createHttpError(403, "Forbidden"));
    }
  } catch (error) {
    error.message === "TokenExpiredError: jwt expired"
      ? next(createHttpError(403, "TokenExpiredError"))
      : next(createHttpError(error));
  }
};

// @desc Update user
// @route PUT /api/user
// @access Private
const updateUser = async (req, res, next) => {
  try {
    await updateUserService(req.body, req.user.id);

    res.clearCookie("jwt", { httpOnly: true }).status(201).end();
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Delete user
// @route POST /api/user
// @access Private
const deleteUser = async (req, res, next) => {
  try {
    await deleteUserService(req.user.id);

    res.clearCookie("jwt", { httpOnly: true }).status(204).end();
  } catch (error) {
    next(createHttpError(error));
  }
};

// @desc Logout user
// @route GET /api/user/logout
// @access Private
const logoutUser = async (req, res, next) => {
  try {
    res
      .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
      .status(204)
      .end();
  } catch (error) {
    next(createHttpError(error));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  refreshToken,
  logoutUser,
  deleteUser,
  updateUser,
};
