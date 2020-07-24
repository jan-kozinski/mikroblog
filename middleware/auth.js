const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for token
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Access denied: no token",
    });
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Access denied: invalid token",
    });
  }
}

module.exports = auth;
