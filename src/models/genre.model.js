const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

class Genre {
  constructor() {
    this.model = sequelize.define(
      "Genre",
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

  async create(genre) {
    const newGenre = await this.model.create(genre);
    return newGenre.dataValues;
  }
  async getAll() {
    const genres = await this.model.findAll();
    return genres;
  }
  async getById(genreId) {
    return await this.model.findOne({ where: { id: genreId } });
  }

  async update(genreId, data) {
    const { name, image } = data;
    return await this.model.update(
      {
        name,
        image,
      },
      {
        where: {
          id: genreId,
        },
      }
    );
  }
  async delete(genreId) {
    return await this.model.destroy({ where: { id: genreId } });
  }
}


const genre = new Genre()

module.exports = genre

   genre.model.hasMany(require("./movie.model").model, {
     foreignKey: "genreTypeId",
     sourceKey: "id"
  
   })