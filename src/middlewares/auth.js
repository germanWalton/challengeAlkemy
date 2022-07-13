const jwt = require("jsonwebtoken");
const config = require("../config/index");
const SECRET = config.jwt


const generateToken = (user) => {
  return jwt.sign(user, SECRET, {
    expiresIn: "180s",
  });
};

const verifyToken = (token) => {
  try {
    jwt.verify(token, SECRET);
    return true;
  } catch (e) {
    return false;
  }
};

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).send({ error: "unauthorized" });
  }

  //Authorization: Bearer <token>

  const token = header.split(" ")[1];
  const payload = verifyToken(token);
  console.log(token);
  if (!payload) {
    return res.status(401).send({
      error: "unauthorized",
    });
  }
  return next();
};
module.exports = { authMiddleware, generateToken };
