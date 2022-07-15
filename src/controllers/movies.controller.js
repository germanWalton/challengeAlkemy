const service = require("../services/movies.service");
const logger = require("../log");

const getAllMovies= async (req, res) => {
  try {
    return res.send(await service.getAll(req.query));
  } catch (e) {
    return res.status(500).send({ Error: e.message });
  }
};

const getMovieById= async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await service.getById(id);
    if (!movie) {
      return res.status(404).send({ error: "Movie not found" });
    }
    return res.status(200).send(movie);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({ Error: e.message });
  }
};

const createMovie = async (req, res) => {
  const { body } = req;
  try {
    const movie = await service.save(body);
    return res.status(200).send(movie);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({ Error: e.message });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await service.update(id, body);
    return res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    return res.status(500).send({ Error: e.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await service.getById(req.params.id)
    if (!movie) {
      return res.status(404).send({Error:"Movie not found"})
    }
    await service.deleteMovie(req.params.id);
      return res.sendStatus(200)
  } catch (e) {
    logger.error(e);
    return res.status(500).send({ Error: e.message });
  }
};

module.exports = {getAllMovies,getMovieById,createMovie,updateMovie,deleteMovie};
