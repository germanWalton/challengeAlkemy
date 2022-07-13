const userModel = require("../models/user.model");
const moviesModel = require("./movie.model");
const charactersModel = require("./character.model");
const genderModel = require("../models/gender.model");

class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case "user":
        return userModel;
      case "movies":
        return moviesModel;
      case "characters":
        return charactersModel;
      case "gender":
        return genderModel;
      default:
        throw new Error("Model doesnt exit");
    }
  }
}

module.exports = ModelFactory;
