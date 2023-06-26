const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    let decode = jwt.verify(token, process.env.jwt_secret);
    req.user = decode.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Invalid Token");
  }
};
