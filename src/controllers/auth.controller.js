const { generateToken } = require("../middlewares/auth.middleware");
const nodemailer = require("../notifications/mail");
const service = require("../services/user.service");
const logger = require("../log");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //chequear que exista el email
    if (!(await service.existByEmail(email))) {
      logger.log("email doesn't exist");

      return res.status(400).send({ message: "user does not exist!!!" });
    } // chequear que el password coincida
    if (!(await service.isPasswordValid(email, password))) {
      return res.status(401).send({ message: "incorrect password!!!" });
    }
    //obtener el usuario
    const user = await service.getUserByEmail(email);
    const token = generateToken(user);
    return res.status(200).send({
      message: "successfully logged in",
      user: { id: user.id, username: user.email },
      token,
    });
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
};

const register = async (req, res) => {
  const { body } = req;
  try {
    if (!(await service.existByEmail(body.email))) {
      const newUser = await service.save(body);
      await nodemailer.send(`<h4>Welcome ${newUser.name} to the Alkemy API Challenge.Thank you for registering</h4>`, newUser.email)

      return res.status(201).send({
        message: "Registered successfully.Now you can go to login",
      }); 
    } else{res.status(500).send({error:'The user email already exist'})}
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
module.exports = { login, register };
