const User = require("../models/User");
const { userExistsResponse } = require("../config/responses");

async function accountExistsSignUp(req, res, next) {
    const user = await User.findOne({mail: req.body.mail})
    if (user) {
        return userExistsResponse(req,res)
    }
    return next()
}

module.exports = accountExistsSignUp