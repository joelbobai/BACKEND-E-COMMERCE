const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
  let cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(403).send("Access Denied, Token is required! ",cookies);
  }
  let token = cookies.split("=")[1];

  try {
    if (!token)
      return res.status(403).send("Access Denied, Token is required!");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // console.log("old", token);
    const verified = await jwt.verify(String(token), JWT_SECRET);
    req.currenUser = verified;
  } catch (err) {
    return res
      .status(401)
      .json({ error: err.message, message: "Invalid Token provided!" });
  }

  // procceed with request
  return next();
};

module.exports = verifyToken;
