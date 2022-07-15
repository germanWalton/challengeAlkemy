const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Character {
  constructor() {
    this.model = sequelize.define(
      "Character",
      {
        image: {
          type: DataTypes.STRING(250),
          allowNull: false,
          validate: {
            isUrl: true,
            notEmpty: true,
          },
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
            isInt: true,
          },
        },
        weight: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: true,
            isInt: true,
          },
        },
        history: {
          type: DataTypes.STRING(1000),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {},
      

 
    )
 

  }

  async create(character) {
    const newCharacter = await this.model.create(character);
    return newCharacter.dataValues;
  }
  async getAll(query) {
    return await this.model.findAll({
      where: query,
      attributes:['image','name']
    });
  }
  async getById(characterId) {
    // return await this.model.findOne({ where: { id: characterId } });
    return await this.model.findByPk(characterId, {
      include: {
        model: require("./movie.model").model ,
        as: 'movies'
      }
    });

  }

  async update(characterId, data) {
    const { image, name, age, weight, history } = data;
    return await this.model.update(
      {
        image,
        name,
        age,
        weight,
        history,
      },
      {
        where: {
          id: characterId,
        },
      }
    );
  }
  async delete(characterId) {
    return await this.model.destroy({ where: { id: characterId } });
  }
}
const character = new Character();


module.exports = character

character.model.belongsToMany(require("./movie.model").model, {
  through: "charactersMovies",
  as: "movies",
  foreignKey: "characterId",
})