const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Gender {
  constructor() {
    this.model = sequelize.define(
      "GenderType",
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        image: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {},
    
    )
 

  }

  async create(gender) {
    const newGender = await this.model.create(gender);
    return newGender.dataValues;
  }
  async getAll() {
    const genders = await this.model.findAll();
    return genders;
  }
  async getById(genderId) {
    // return await this.model.findOne({ where: { id: genderId } });
    return await this.model.findByPk(genderId)

  }

  async update(genderId, data) {
    const { name, image } = data;
    return await this.model.update(
      {
        name,
        image,
      },
      {
        where: {
          id: genderId,
        },
      }
    );
  }
  async delete(genderId) {
    return await this.model.destroy({ where: { id: genderId } });
  }
}


const gender = new Gender()

module.exports = gender

   gender.model.hasMany(require("./movie.model").model, {
     foreignKey: "genderTypeId",
     sourceKey: "id"
  
   })