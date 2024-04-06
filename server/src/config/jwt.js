const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token)
    return next(res.status(401).json({ message: "Unauthorized access" }));
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return next(res.status(400).json({ message: "Invalid Token" }));
    req.userId = payload.id;
    next();
  });
};

module.exports = verifyToken;
