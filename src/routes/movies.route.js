const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/movies.controller");
const { authMiddleware } = require("../middlewares/auth")

router.use(authMiddleware)

router.get("/", controller.getAllMovies);

router.get("/:id", controller.getMovieById);

router.post("/", controller.createMovie);

router.post("/:id", controller.updateMovie);

router.delete("/:id", controller.deleteMovie);


module.exports = router;
