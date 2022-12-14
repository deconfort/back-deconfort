// primero requiero el modelo que necesito controlar
const User = require("../models/User.js");
const bcryptjs = require("bcryptjs"); //de esta libreria vamos a utilizar el método hashSync para encriptar la contraseña
const crypto = require("crypto"); //de este modulo vamos a requerir el método randomBytes
const accountVerificationEmail = require("./accountVerificationEmail");
const {
  userSignedUpResponse,
  userNotFoundResponse,
  invalidCredentialsResponse,
  userSignedOutResponse,
} = require("../config/responses");
const jwt = require("jsonwebtoken");

const controller = {
  register: async (req, res, next) => {
    let { name, lastName, role, photo, age, mail, password, country } = req.body;
    let verified = false;
    let logged = false;
    let code = crypto.randomBytes(10).toString("hex");
    //encripto o hasheo la contraseña
    password = bcryptjs.hashSync(password, 10);

    try {
      //crea el usuario
      await User.create({
        name,
        lastName,
        role,
        photo,
        age,
        mail,
        password,
        verified,
        logged,
        code,
        country
      });
      //envía mail de verificación (con transportador)
      await accountVerificationEmail(mail, code);
      return userSignedUpResponse(req, res);
    } catch (error) {
      next(error);
    }
  },

  verified: async (req, res, next) => {
    //método para que un usuario verifique su cuenta
    //requiere por params el código a verificar

    const { code } = req.params;

    try {
      //busca un usuario que coincida el código
      //y cambia verificado de false a true
      let user = await User.findOneAndUpdate(
        { code: code },
        { verified: true },
        { new: true }
      );
      if (user) {
        //si tiene éxito debe redirigir a alguna página (home, welcome, login)
        //con el metodo redirect, redirijo automaticamente al usuario (en el front)
        //hacia la pagina que quiero que se "mueva"
        return res.redirect("http://localhost:3000/index");
      } //si no tiene éxito debe responder con el error
      return userNotFoundResponse(req, res);
    } catch (error) {
      next(error);
    }
  },

  enter: async (req, res, next) => {
    const { password } = req.body;
    const { user } = req;
    try {
      const verifiedPassword = bcryptjs.compareSync(password, user.password);

      if (verifiedPassword) {
        const userDb = await User.findOneAndUpdate(
          { _id: user.id },
          { logged: true },
          { new: true }
        );
        let userProctected = {
          id: userDb._id,
          name: userDb.name,
          photo: userDb.photo,
          logged: userDb.logged,
        };
        const token = jwt.sign(userProctected, process.env.KEY_JWT, {
          expiresIn: 60 * 60 * 24 * 365 ,
        });

        return res.status(200).json({
          response: {
            user: {
              name: user.name,
              lastname: user.lastName,
              photo: user.photo,
              role: user.role,
              id: user.id,
            },
            token,
          },
          success: true,
          message: "Welcome " + user.name,
        });
      }

      return invalidCredentialsResponse(req, res);
    } catch (error) {
      next(error);
    }
  },

  enterWithToken: async (req, res, next) => {
    let { user } = req;
    try {
      return res.json({
        response: {
          user,
        },
        success: true,
        message: "Welcome " + user.name,
      });
    } catch (error) {
      next(error);
    }
  },

  leave: async (req, res, next) => {
    //método para que un usuario cierre sesión (cambia online de true a false)
    //si tiene éxito debe cambiar online de true a false
    //si no tiene éxito debe responder con el error
    const { id } = req.user;

    try {
      let user = await User.findOneAndUpdate(
        { _id: id },
        { logged: false },
        { new: true }
      );
     
      return userSignedOutResponse(req, res);
    } catch (error) {
      next(error);
    }
  },
  read: async (req, res, next) => {
    let id = req.params.id;
    try {
      let user = await User.findById({ _id: id })
    
      if (user) {
        res.status(200).json({
          success: true,
          message: "the user was successfully found",
          response: user,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "there is no user",
        });
      }
    } catch (error) {
      next(error)
    }
  },
  update: async (req, res) => {
    let { id } = req.params;
    if (req.body.password) {
      let { password } = req.body;
      password = bcryptjs.hashSync(password, 10);
      req.body.password = password;
  }
    try {
      let one = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (one) {
        res.status(200).json({
          data: one,
          id: one._id,
          success: true,
          message: "The user was successfully modified",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "The user was not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

// tercero exporto el controlador
module.exports = controller;
