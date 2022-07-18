const sequelize = require("../config/sequelize");

class BaseModel {
  constructor(modelName, schema) {
    this.model = sequelize.define(modelName, schema);
  }

  async getAll() {
    return await this.model.findAll();
  }

  async getById(id) {
    return await this.model.findByPk(id);
  }

  async deleteById(id) {
    return await this.model.destroy({ where: { id: id } });
  }

  async update(id, data) {
    return await this.model.update(data, {
      where: {
        id
      }
    });
  }

  async save(obj) {
    const data = await this.model.create(obj);
    return data.dataValues;
  }
}

module.exports = BaseModel;
