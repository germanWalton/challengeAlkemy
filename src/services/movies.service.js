const ModelFactory = require("../models/factory.model");
const movieModel = ModelFactory.getModel("movie");
const genderModel = ModelFactory.getModel("gender");
const characterModel = ModelFactory.getModel("character");


const getAll = async (query) => {
  return await movieModel.getAll(query);
};

const getById = async (id) => {
  return await movieModel.getById(id);
};

const save = async (movie) => {
  const gender = await genderModel.findByName(movie.gender);
  if (gender) {
    movie.genderId = gender.id;
    return await movieModel.create(movie);
  } else {
    throw new Error("Gender does not exist");
  }
};

const update = async (movieId, data) => {
  return await movieModel.update(movieId, data);
};
const deleteMovie = async (movieId) => {
  return await movieModel.deleteById(movieId);
};

const associate = async (movieId, characterId) => {
  const movie = await movieModel.getById(movieId)
  const character = await characterModel.getById(characterId)
  await movie.addCharacter(character)
}
module.exports = { getAll, save, getById, update, deleteMovie,associate };
