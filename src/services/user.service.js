const ModelFactory = require("../models/factory.model")

const userModel = ModelFactory.getModel("user")

const getAll = () => userModel.getAll()

const getById = (id) => userModel.getById(id)

const save = (user) => userModel.create(user)

const update = (userId, data) => userModel.update(userId, data)

const deleteUser = (userId) => userModel.deleteById(userId)

const existByEmail = (email) => userModel.existsByEmail(email)

const isPasswordValid = (email, password) =>
  userModel.isPasswordValid(email, password)

const getUserByEmail = (email) => userModel.getByEmail(email)

module.exports = {
  getAll,
  save,
  getById,
  update,
  deleteUser,
  existByEmail,
  isPasswordValid,
  getUserByEmail,
}
