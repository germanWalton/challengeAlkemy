const { DataTypes } = require("sequelize");
const BaseModel = require('../models/base.model');


class Character extends BaseModel {
  constructor() {
    const schema = 
      
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
      }
      

 
    
    super('Character',schema)

  }


  async getAll(query) {
 
     return await this.model.findAll({
       where: query,
       attributes: ['image', 'name'],
       
      
     });
   }
   async getById(characterId) {
     return await this.model.findByPk(characterId, {
       include: {
         model: require("./movie.model").model ,
         as: 'movies'
       }
     });

   }


}
const character = new Character();


module.exports = character

character.model.belongsToMany(require("./movie.model").model, {
  through: "charactersMovies",
  as: "movies",
  foreignKey: "characterId",
})