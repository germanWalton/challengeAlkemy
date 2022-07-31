const express = require("express");
const compression = require("compression");
const app = express();
const http = require("http");
const server = http.createServer(app);
const sequelize = require("./config/sequelize");
const cors = require("cors");
const swaggerMiddleware = require("./middlewares/swagger.middleware");
swaggerMiddleware(app);
const cookieParser = require("cookie-parser");
const config = require("./config");
const PORT = config.port;
const authRouter = require("./routes/auth.route");
const moviesRouter = require("./routes/movies.route");
const charactersRouter = require("./routes/characters.route");
const userRouter = require("./routes/user.route");
const logger = require("./log/index");

(async () => {
  app.use((req, res, next) => {
    logger.info(`Request recived ${req.method} method at ${req.url}`);
    next();
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser("Esto es un secreto"));

  app.use("/auth", compression(), authRouter);
  app.use("/users", compression(), userRouter);
  app.use("/characters", compression(), charactersRouter);
  app.use("/movies", compression(), moviesRouter);
  
  app.get("*", (req, res) => {
    logger.warn(`Request received ${req.method}`);
    logger.warn(`The route http://localhost:${PORT}${req.path} doesn't exist`);
    res.send("not found");
  });

  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    logger.info("Connection with database been established successfully.");
    server.listen(PORT, () =>
      logger.info(
        `worker with pid ${process.pid} listening on https://localhost:${PORT}`
      )
    );
  } catch (error) {
    logger.error(error);
  }
})();
