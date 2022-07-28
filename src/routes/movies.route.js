const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/movies.controller");
const { authMiddleware } = require("../middlewares/auth.middleware")

router.use(authMiddleware)

router.get("/", controller.getAllMovies);

router.get("/:id", controller.getMovieById);

router.post("/", controller.createMovie);

router.put("/:id", controller.updateMovie);

router.put("/:movieId/characters/:characterId",controller.associateCharacter)

router.delete("/:id", controller.deleteMovie);


module.exports = router;
