const { DataTypes } = require("sequelize")
const BaseModel = require("./base.model")

class Movie extends BaseModel {
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
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: {
          name: "title",
          msg: "This title exists on the DB, please select another one",
        },
        validate: {
          notEmpty: { args: true, msg: "The field title could not be empty" },
        },
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "The field creationDate could not be empty",
          },
        },
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: true,
          isFloat: true,
          is: {
            args: /^[1-5]+$/,
            msg: "The field score must be a number between 1 and 5",
          },
        },
      },
    }
    super("Movie", schema)
  }

  async getAll(query) {
    const { title, genderId, order } = query
    const queryToFind = {}
    const titleOrder = []
    if (title) {
      queryToFind.title = title
    }
    if (genderId) {
      queryToFind.genderId = genderId
    }
    if (order) {
      if (query.order === "ASC") {
        titleOrder.push(["creationDate", "ASC"])
      } else {
        titleOrder.push(["creationDate", "DESC"])
      }
    }
    const movies = await this.model.findAll({
      where: queryToFind,
      order: titleOrder,
      attributes: ["title", "image", "creationDate"],
    })
    return movies
  }

  async getById(movieId) {
    const movie = await this.model.findByPk(movieId, {
      include: [
        {
          model: require("./character.model").model,
          as: "characters",
        },
        "gender",
      ],
    })
    return movie
  }
}
const movie = new Movie()

module.exports = movie

movie.model.belongsToMany(require("./character.model").model, {
  through: "charactersMovies",
  as: "characters",
  foreignKey: "movieId",
})
movie.model.belongsTo(require("./gender.model").model, {
  foreignKey: "genderId",
  targetKey: "id",
  as: "gender",
})
