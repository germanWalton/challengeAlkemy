const dotenv = require("dotenv")

const envFound = dotenv.config()

if (!envFound) {
  throw new Error("Couldn't found the .env file")
}

module.exports = {
  mail: {
    GMAIL_PWD: process.env.GMAIL_PASSWORD,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
  },
  port: process.env.PORT,
  database: {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  jwt: process.env.SECRET,
}
