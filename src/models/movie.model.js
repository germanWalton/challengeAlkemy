const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

class Movie {
  constructor() {
   this.model = sequelize.define(
      "Movie",
      {
        image: {
          type: DataTypes.STRING(250),
          allowNull: false,
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
      },
      {}
    )


  }

  async create(movie) {
    const newMovie = await this.model.create(movie);
    return newMovie.dataValues;
  }
  async getAll() {
    const movies = await this.model.findAll();
    return movies;
  }
  async getById(movieId) {
    return await this.model.findOne({ where: { id: movieId } });
  }

  async update(movieId, data) {
    const { image, title, creationDate, calification } = data;
    return await this.model.update(
      {
        image,
        title,
        creationDate,
        calification,
      },
      {
        where: {
          id: movieId,
        },
      }
    );
  }
  async delete(movieId) {
    return await this.model.destroy({ where: { id: movieId } });
  }
}
const movie = new Movie()

module.exports = movie


movie.model.belongsToMany(require("./character.model").model, {
  through: "charactersMovies",
  as: "characters",
  foreignKey: "movieId",
}),
 movie.model.belongsTo(require("./genre.model").model, {
    foreignKey: "genreTypeId",
    targetKey: "id",
  });
