const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; 
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};
