const service = require("../services/user.service")
const logger = require("../log")

const getUsers = async (req, res) => {
  try {
    return res.status(200).send(await service.getAll())
  } catch (e) {
    return res.status(500).send({ Error: e.message })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await service.getById(id)
    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }
    return res.status(200).send(user)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ Error: e.message })
  }
}

const createUser = async (req, res) => {
  const { body } = req
  try {
    const user = await service.save(body)
    return res.status(200).send(user)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ Error: e.message })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { body } = req
  try {
    await service.update(id, body)
    return res.sendStatus(200)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ Error: e.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    await service.deleteUser(req.params.id)
    return res.sendStatus(200)
  } catch (e) {
    logger.error(e)
    return res.status(500).send({ Error: e.message })
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
}
