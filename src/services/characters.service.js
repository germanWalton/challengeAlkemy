const ModelFactory = require("../models/factory.model")

const characterModel = ModelFactory.getModel("character")

const getAll = (query) => characterModel.getAll(query)

const getById = (id) => characterModel.getById(id)

const save = (character) => characterModel.save(character)

const update = (characterId, data) => characterModel.update(characterId, data)

const deleteCharacter = (characterId) => characterModel.deleteById(characterId)

module.exports = {
  getAll,
  save,
  getById,
  update,
  deleteCharacter,
}
