const passport = require('passport')
const passportJwt = require('passport-jwt')

const {KEY_JWT} = process.env
const User = require('../models/User')

passport.use(
    new passportJwt.Strategy( //definimos la estrategia de extraccion de jwt
        {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(), // de tipo bearer
            secretOrKey: KEY_JWT //con la clave secreta
        }, //la estrategia devuelve la extraccion en un objeto: jwt_payload
        async (jwt_payload,done) => {
            try {
                let user = await User.findOne({ _id :jwt_payload.id }) //buscamos el usuario
                if (user) {
                    user = { //este es el objeto user que se "inyecta" al req
                        //aqui es donde protejo los datos del usuario
                         id: user._id,
                        name: user.name,
                        mail: user.mail,
                        role: user.role, 
                        photo: user.photo,
                        country: user.country
                    }
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                console.log(error)
                return done(error,false)
            }
        }
    )
)

module.exports = passport