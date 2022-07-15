const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const bcrypt = require("bcrypt");

class Usuario {
  constructor() {
    this.model = sequelize.define(
      "Users",
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
      },
      {}
    );
  }

  async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await this.model.create(user);
    return newUser.dataValues;
  }
  async getAll() {
    const users = await this.model.findAll();
    return users;
  }
  async getById(userId) {
    // return await this.model.findOne({ where: { id: userId } });
    return await this.model.findByPk(userId);

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
  async update(userId, data) {
    const { password, name, email, enable } = data;
    return await this.model.update(
      {
        // username,
        password,
        name,
        email,
        enable,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }
  async delete(userId) {
    return await this.model.destroy({ where: { id: userId } });
  }
}

module.exports = new Usuario();
