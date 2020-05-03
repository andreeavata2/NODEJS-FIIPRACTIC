const jwt = require("jsonwebtoken");

const getToken = (req) => req.header("Authorization").replace("Bearer ", "");

const requireAuth = (req, res, next) => {
  const token = getToken(req);

  try {
    const tokenData = jwt.verify(token, process.env.SECRET);
    req.user = tokenData;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ success: false, message: "JWT is invalid" });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.type !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You must be admin",
    });
  }

  next();
};

module.exports = {
  requireAuth,
  requireAdmin,
};
