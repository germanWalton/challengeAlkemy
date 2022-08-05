const ModelFactory = require("../models/factory.model")

const movieModel = ModelFactory.getModel("movie")
const genderModel = ModelFactory.getModel("gender")
const characterModel = ModelFactory.getModel("character")

const getAll = (query) => movieModel.getAll(query)

const getById = (id) => movieModel.getById(id)

const save = async (movie) => {
  const gender = await genderModel.findByName(movie.gender)
  if (gender) {
    movie.genderId = gender.id
    const newMovie = await movieModel.save(movie)
    return newMovie
  }
  throw new Error("Gender does not exist")
}

const update = (movieId, data) => movieModel.update(movieId, data)

const deleteMovie = (movieId) => movieModel.deleteById(movieId)

const associate = async (movieId, characterId) => {
  const movie = await movieModel.getById(movieId)
  const character = await characterModel.getById(characterId)
  await movie.addCharacter(character)
}
module.exports = {
  getAll,
  save,
  getById,
  update,
  deleteMovie,
  associate,
}
