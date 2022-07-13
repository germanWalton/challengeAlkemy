const userModel = require("../models/user.model");

const getAll = async () => {
  return await userModel.getAll();
};

const getById = async (id) => {
  return await userModel.getById(id);
};

const save = async (user) => {
  return await userModel.create(user);
};

const update = async (userId, data) => {
  return await userModel.update(userId, data);
};

const deleteUser = async (userId) => {
  return await userModel.delete(userId);
};

const existByEmail = async (email) => {
  return await userModel.existsByEmail(email)
}

const isPasswordValid = async (email, password) => {
  return await userModel.isPasswordValid(email,password)
}

const getUserByEmail = async (email) => {
  return await userModel.getByEmail(email)
}
module.exports = { getAll, save, getById, update, deleteUser,existByEmail,isPasswordValid,getUserByEmail };
