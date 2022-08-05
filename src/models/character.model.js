const { DataTypes } = require("sequelize")
const BaseModel = require("./base.model")

class Character extends BaseModel {
  constructor() {
    const schema = {
      image: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
          isUrl: { args: true, msg: "The field image must be a url" },
          notEmpty: { args: true, msg: "The field image could not be empty" },
        },
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { args: true, msg: "The field name could not be empty" },
          len: {
            min: 3,
            msg: "The field name should have at least 3 characters",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "The field age could not be empty" },
          isInt: { args: true, msg: "The field age must be a number" },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "The field weight could not be empty" },
          isInt: { args: true, msg: "The field weight must be a number" },
        },
      },
      history: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "The field history could not be empty" },
          len: {
            min: 50,
            max: 1000,
            msg: "The field history should have at least 50 characters",
          },
        },
      },
    }

    super("Character", schema)
  }

  async getAll(query) {
    const characters = await this.model.findAll({
      where: query,
      attributes: ["image", "name"],
    })
    return characters
  }

  async getById(characterId) {
    const character = await this.model.findByPk(characterId, {
      include: {
        model: require("./movie.model").model,
        as: "movies",
      },
    })
    return character
  }
}

const character = new Character()

module.exports = character

character.model.belongsToMany(require("./movie.model").model, {
  through: "charactersMovies",
  as: "movies",
  foreignKey: "characterId",
})
