const EnvConstant = require("../utils/EnvConstant");

module.exports = {
  database: {
    MONGODB_URI: EnvConstant.APP_DATABASE_URI,
    PORT: EnvConstant.APP_PORT
  },

  jwt: {
    SECRET_KEY: EnvConstant.APP_TOKEN
  }
}