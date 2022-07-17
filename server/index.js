const app = require("./app.js");
const startConnection = require("./config/connection");
startConnection();

app.listen(app.get("PORT"), () => {
  console.log("Server on port", app.get("PORT"));
})