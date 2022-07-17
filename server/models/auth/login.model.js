const { Schema, model } = require("mongoose");
const SeguridadUsuarios = require("../seguridad/seguridad_usuarios.model")

const loginSchema = new Schema({
    EMAIL: {
      type: String,
      required: true, 
      trim: true,
      unique: true
    },
    PASSWORD: {
      type: String,
      required: true,
      trim: true
    }
},{
  versionKey: false,
  timestamps: true
})

// loginSchema.pre('save', async function(next) {
//   console.log(loginSchema)
//   if (true) {
//     console.log('calling next!');
//     // `return next();` will make sure the rest of this function doesn't run
//     /*return*/ next();
//   }
//   // Unless you comment out the `return` above, 'after next' will print
//   console.log('after next');
// });

loginSchema.pre('remove',  function(next) {
  console.log(this);
  SeguridadUsuarios.remove({ ID_LOGIN: { $in: this._id }  }).exec();
  next();
});

const Login = model("Login", loginSchema);
module.exports = Login;
