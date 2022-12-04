const { config } = require("dotenv");
config();

module.exports = {
  database: {
    MONGODB_URI: process.env.MONGO_URI_LOCAL,
    PORT: process.env.PORT
  },

  jwt: {
    SECRET_KEY: "VICENTERASSETO2022"
  }
}