const EnvConstant = require("../utils/EnvConstant");

module.exports = {
  database: {
<<<<<<< HEAD
    MONGODB_URI: process.env.MONGO_URI,
    PORT: process.env.PORT
=======
    MONGODB_URI: EnvConstant.APP_DATABASE_URI,
    PORT: EnvConstant.APP_PORT
>>>>>>> 47824821176af20374c24e6f2f4f5a15bcebdcd3
  },

  jwt: {
    SECRET_KEY: "VICENTERASSETO2022"
  }
}