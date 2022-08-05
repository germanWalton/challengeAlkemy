const sequelize = require("../config/sequelize")

class BaseModel {
  constructor(modelName, schema) {
    this.model = sequelize.define(modelName, schema)
  }

  async getAll() {
    const data = await this.model.findAll()
    return data
  }

  async getById(id) {
    const data = await this.model.findByPk(id)
    return data
  }

  async deleteById(id) {
    await this.model.destroy({ where: { id: id } })
  }

  async update(id, data) {
    const updateData = await this.model.update(data, {
      where: {
        id,
      },
    })
    return updateData
  }

  async save(obj) {
    const data = await this.model.create(obj)
    return data.dataValues
  }
}

module.exports = BaseModel
