const User = require("../models/User");
const { invalidCredentialsResponse } = require("../config/responses");

async function accountExistsSignIn(req, res, next) {
  const user = await User.findOne({ mail: req.body.mail });
  if (user) {
    req.user = {
      //inyecto al req la propiedad user con los datos que necesito
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      photo: user.photo,
      mail: user.mail,
      role: user.role,
      verified: user.verified,
      password: user.password
    };
    //console.log(req.user)
    return next();
  }
  return invalidCredentialsResponse(req, res);
}

module.exports = accountExistsSignIn;
