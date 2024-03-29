const jwt = require("jsonwebtoken")
const config = require("../config/index")

const SECRET = config.jwt

const generateToken = (user) => jwt.sign(user, SECRET, { expiresIn: "300s" })

const verifyToken = (token) => {
  try {
    jwt.verify(token, SECRET)
    return true
  } catch (e) {
    return false
  }
}

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header) {
    return res.status(401).send({ error: "Unauthorized" })
  }
  const token = header.split(" ")[1]
  const payload = verifyToken(token)
  if (!payload) {
    return res.status(401).send({
      error: "Unauthorized",
    })
  }
  return next()
}
module.exports = { authMiddleware, generateToken }
