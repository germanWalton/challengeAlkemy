const { DataTypes } = require("sequelize");
const BaseModel = require('../models/base.model');


class Gender extends BaseModel {
  constructor() {
    const schema =
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          // validate: {
          //   notEmpty: true,
          // },
        },
        // image: {
        //   type: DataTypes.STRING(100),
        //   allowNull: true,
        //   validate: {
        //     notEmpty: true,
        //   },
        // },
      }
      
    
    super("Gender",schema)
 

  }
  async findByName(name) {
    return await this.model.findOne({ where: { name } })
}

}


const gender = new Gender()

module.exports = gender

   gender.model.hasMany(require("./movie.model").model, {
     foreignKey: "genderId",
     sourceKey: "id"
  
   })