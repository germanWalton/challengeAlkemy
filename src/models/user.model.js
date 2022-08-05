const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")
const BaseModel = require("./base.model")

class User extends BaseModel {
  constructor() {
    const schema = {
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "The field name could not be empty" },
          len: {
            min: 3,
            msg: "The field name should have at least 3 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { args: true, msg: "The field email could not be empty" },
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
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }
    super("Users", schema)
  }

  async create(user) {
    if (user.password.trim() === "") {
      throw new Error("The field password cannot be empty")
    }
    if (user.password.length <= 5) {
      throw new Error("The password must have at least 6 characters")
    }
    user.password = await bcrypt.hash(user.password, 10)
    const newUser = await this.model.create(user)
    return newUser.dataValues
  }

  async getByEmail(email) {
    const userByEmail = await this.model.findOne({ where: { email: email } })
    return userByEmail.dataValues
  }

  async existsByEmail(email) {
    const existEmail = await this.model.findOne({ where: { email: email } })
    if (existEmail) {
      return { Error: "Email already exists" }
    }
  }

  async isPasswordValid(email, password) {
    const user = await this.model.findOne({ where: { email: email } })
    return await bcrypt.compare(password, user.password)
  }
}
const user = new User()

module.exports = user
