const { DataTypes } = require("sequelize");
const BaseModel = require('../models/base.model');
const bcrypt = require("bcrypt");

class Usuario extends BaseModel {
  constructor() {
    const schema = 
      {
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: {
            notEmpty: true,
            is:/\S+/
          },
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
            isEmail: true,
          },
        },
        enable: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          validate: {
            notEmpty: true,
          },
        },
         role: {
         type: DataTypes.ENUM({ values: ["ADMIN_ROLE", "USER_ROLE"] }),
         defaultValue: "USER_ROLE",
         }
    }
      super("Users",schema)
      
    
  }

  async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await this.model.create(user);
    return newUser.dataValues;
  }


  async getByEmail(email) {
    const userByEmail = await this.model.findOne({ where: { email: email } });
    return userByEmail.dataValues;
  }
  async existsByEmail(email) {
    const existEmail = await this.model.findOne({ where: { email: email } });
    if (existEmail) {
      return { Error: "Email already exists" };
    }
  }
  async isPasswordValid(email, password) {
    const user = await this.model.findOne({ where: { email: email } });
    return await bcrypt.compare(password, user.password);
  }


}

module.exports = new Usuario();
