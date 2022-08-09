const service = require("../services/characters.service")
const logger = require("../log")

const getAllCharacters = async (req, res) => {
  try {
    return res.status(200).send(await service.getAll(req.query))
  } catch (e) {
    return res.status(500).send({ Error: e.message })
  }
}

const getCharacterById = async (req, res) => {
  const { id } = req.params
  try {
    const character = await service.getById(id)
    if (!character) {
      return res.status(404).send({ error: "Character not found" })
    }
    return res.status(200).send(character)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ Error: e.message })
  }
}

const createCharacter = async (req, res) => {
  const { body } = req
  try {
    const character = await service.save(body)
    return res.status(200).send(character)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ Error: e.message })
  }
}

const updateCharacter = async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    const character = await service.getById(id)
    if (!character) {
      return res.status(404).send({ error: "Character not found" })
    }
    await service.update(id, body)
    return res.sendStatus(201)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ Error: e.message })
  }
}

const deleteCharacter = async (req, res) => {
  try {
    const character = await service.getById(req.params.id)
    if (!character) {
      return res.status(404).send({ Error: "Character not found" })
    }
    await service.deleteCharacter(req.params.id)
    return res.sendStatus(202)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ Error: e.message })
  }
}

module.exports = {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
}
