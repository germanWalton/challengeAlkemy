
const ModelFactory = require('../models/factory.model');
const movieModel = ModelFactory.getModel('movie');


const getAll = async (query) => {
  return await movieModel.getAll(query)
};

const getById = async (id) => {
  return await movieModel.getById(id)
};

const save = async (movie) => {
  return await movieModel.save(movie)
};

const update = async (movieId, data) => {
  return await movieModel.update(movieId,data)
};
const deleteMovie= async (movieId) => {
  return await movieModel.delete(movieId);
};
module.exports = { getAll, save, getById, update, deleteMovie };
