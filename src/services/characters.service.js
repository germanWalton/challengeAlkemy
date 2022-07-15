

const characterModel = require("../models/character.model");



const getAll = async (query) => {
  return await characterModel.getAll(query)
};

const getById = async (id) => {
  return await characterModel.getById(id)
};

const save = async (character) => {
  return await characterModel.create(character)
};

const update = async (characterId, data) => {
  return await characterModel.update(characterId,data)
};

const deleteCharacter= async (characterId) => {
  return await characterModel.delete(characterId);
};
module.exports = { getAll, save, getById, update, deleteCharacter };
