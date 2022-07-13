
const moviesModel = require("../models/movie.model");

const getAll = async () => {
  return await moviesModel.getAll()
};

const getById = async (id) => {
  return await moviesModel.getById(id)
};

const save = async (movie) => {
  return await moviesModel.create(movie)
};

const update = async (movieId, data) => {
  return await moviesModel.update(movieId,data)
};

const deleteMovie= async (movieId) => {
  return await moviesModel.delete(movieId);
};
module.exports = { getAll, save, getById, update, deleteMovie };
