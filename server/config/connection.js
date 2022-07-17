const { connect } = require("mongoose");
const config = require("./config");

const startConnection = async () => {
  try {
    await connect(config.database.MONGODB_URI)
    console.log("Database is conected successfully");
  } catch (err) {
    console.log("Error in the database:", err)
  }
}

module.exports = startConnection
