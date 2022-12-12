const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nombre: {type: String,required: true},
    apellido: {type: String,required: true},
    rol: {type: String,  required: true },
    foto:{type: String, required:true},
    edad: {type: Number,required: true},
    mail: {type: String,required: true},
    contraseña: {type: String,required: true},
    // confirmPassword: {type: String,required: true},
    codigo: {type: String,required: true},
    verificado: {type: Boolean},
    logueado: {type: Boolean}
});


const Usuario = mongoose.model('usuarios', schema);
module.exports = Usuario;