const HttpStatusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await req.db.User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found!",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET);

    return res.status(HttpStatusCodes.OK).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happen!",
    });
  }
};

const register = async (req, res) => {
  try {
    const existingUser = await req.db.User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(HttpStatusCodes.CONFLICT).json({
        success: false,
        message: "User already exists!",
      });
    }

    const user = await req.db.User.create(req.body);

    return res.status(HttpStatusCodes.CREATED).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something bad happened!",
    });
  }
};

module.exports = {
  login,
  register,
};
