const ModelFactory = require('../models/factory.model');
const characterModel = ModelFactory.getModel('character');




const getAll = async (query) => {
  return await characterModel.getAll(query)
};

const getById = async (id) => {
  return await characterModel.getById(id)
};

const save = async (character) => {
  return await characterModel.save(character)
};

const update = async (characterId, data) => {
  return await characterModel.update(characterId,data)
};

const deleteCharacter= async (characterId) => {
  return await characterModel.deleteById(characterId);
};
module.exports = { getAll, save, getById, update, deleteCharacter };
