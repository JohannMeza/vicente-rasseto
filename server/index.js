const app = require("./app.js");
const startConnection = require("./config/connection");
startConnection();

const fs = require('fs');

fs.readdir("../", function (err, archivos) {
if (err) {
  console.log(err)
return;
}
console.log(archivos);
});

app.listen(app.get("PORT"), () => {
  console.log("Ruta Base ", __dirname);
  console.log("Server on port", app.get("PORT"));
})