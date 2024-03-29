const express = require("express")

const { Router } = express
const router = Router()
const controller = require("../controllers/characters.controller")
const { authMiddleware } = require("../middlewares/auth.middleware")

router.use(authMiddleware)

router.get("/", controller.getAllCharacters)

router.get("/:id", controller.getCharacterById)

router.post("/", controller.createCharacter)

router.put("/:id", controller.updateCharacter)

router.delete("/:id", controller.deleteCharacter)

module.exports = router
