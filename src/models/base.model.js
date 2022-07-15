const mongoose = require("mongoose");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class BaseModel {
  constructor(modelName,dataTypes) {
    this.model = sequelize.define(modelName,dataTypes);
  }

  async getAll() {
    return await this.model.findAll()
  }
 

  async getById(id) {
    return await this.model.findByPk(id)
  }

  async deleteById(id) {
    return await this.model.destroy({ where: { id: id } });
  }

  async update(id, data) {
    return await this.model.update(
      {
        data
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async save(obj) {
    return await this.model.create(obj);
  }
}

module.exports = BaseModel;
