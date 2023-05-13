const app = require("./app.js");
const startConnection = require("./config/connection");
startConnection();

app.listen(app.get("PORT"), () => {
  console.log("Ruta Base ", __dirname);
  console.log("Server on port", app.get("PORT"));
})