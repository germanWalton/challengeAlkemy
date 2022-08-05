const compression = require("compression")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")
const http = require("http")
const sequelize = require("./config/sequelize")
const swaggerMiddleware = require("./middlewares/swagger.middleware")
const config = require("./config")
const logger = require("./log/index")

const PORT = config.port
const authRouter = require("./routes/auth.route")
const charactersRouter = require("./routes/characters.route")
const moviesRouter = require("./routes/movies.route")
const userRouter = require("./routes/user.route");

(async () => {
  const app = express()
  const server = http.createServer(app)
  swaggerMiddleware(app)
  app.use((req, res, next) => {
    logger.info(`Request recived ${req.method} method at ${req.url}`)
    next()
  })
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser("Esto es un secreto"))
  app.use("/auth", compression(), authRouter)
  app.use("/users", compression(), userRouter)
  app.use("/characters", compression(), charactersRouter)
  app.use("/movies", compression(), moviesRouter)
  app.get("*", (req, res) => {
    logger.warn(`Request received ${req.method}`)
    logger.warn(`The route http://localhost:${PORT}${req.path} doesn't exist`)
    res.send("Not found")
  })

  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: false })
    logger.info("Connection with database been established successfully.")
    server.listen(PORT, () =>
      logger.info(
        `worker with pid ${process.pid} listening on https://localhost:${PORT}`
      )
    )
  } catch (error) {
    logger.error(error)
  }
})()
