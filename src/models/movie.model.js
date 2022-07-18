const { DataTypes } = require("sequelize");
const BaseModel = require("../models/base.model");

class Movie extends BaseModel {
  constructor() {
    const schema = {
      image: {
        type: DataTypes.STRING(250),
        allowNull: true,
        validate: {
          isUrl: true,
          notEmpty: true,
        },
      },
      title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
          is: /^[1-5]+$/,
        },
      },
    };
    super("Movie", schema);
  }

  async getAll(query) {
    const { title, genderTypeId, order } = query;
    let queryToFind = {};
    let titleOrder = [];
    if (title) {
      queryToFind.title = title;
    }
    if (genderTypeId) {
      queryToFind.genderTypeId = genderTypeId;
    }
    if (order) {
      if (query.order === "ASC") {
        titleOrder.push(["creationDate", "ASC"]);
      } else {
        titleOrder.push(["creationDate", "DESC"]);
      }
    }
    return await this.model.findAll({
      where: queryToFind,
      order: titleOrder,
      attributes: ["title", "image", "creationDate"],
    });
  }
  async getById(movieId) {
    return await this.model.findByPk(movieId, {
      include: {
        model: require("./character.model").model,
        as: "characters",
      },
    });
  }
  async save(obj) {
    const data = await this.model.create(obj,{include:[require("./gender.model").model]});
    return data.dataValues;
  }
}
const movie = new Movie();

module.exports = movie;

movie.model.belongsToMany(require("./character.model").model, {
  through: "charactersMovies",
  as: "characters",
  foreignKey: "movieId",
}),
  movie.model.belongsTo(require("./gender.model").model, {
    foreignKey: "genderId",
    targetKey: "id",
    as: "gender",
  });
