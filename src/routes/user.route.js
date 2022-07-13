const express = require("express");
const { Router } = express;
const router = Router();
const controller = require("../controllers/user.controller")
const { authMiddleware } = require("../middlewares/auth")

// router.use(authMiddleware)


router.get("/", controller.getUsers);

router.get("/:id", controller.getUserById);

router.post("/", controller.createUser)

router.post("/:id", controller.updateUser)

router.delete("/:id",controller.deleteUser)



module.exports = router;