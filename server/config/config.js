const { config } = require("dotenv");
config();

module.exports = {
  database: {
    MONGODB_URI: process.env.MONGO_URI,
    PORT: process.env.PORT
  },

  jwt: {
    SECRET_KEY: "VICENTERASSETO2022"
  }
}