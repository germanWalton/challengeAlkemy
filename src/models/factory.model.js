const userModel = require("./user.model");
const movieModel = require("./movie.model");
const characterModel = require("./character.model");
const genderModel = require("../models/gender.model");

class ModelFactory {
  static getModel(modelName) {
    switch (modelName) {
      case "user":
        return userModel;
      case "movie":
        return movieModel;
      case "character":
        return characterModel;
      case "gender":
        return genderModel;
      default:
        throw new Error("Model doesnt exit");
    }
  }
}

module.exports = ModelFactory;
