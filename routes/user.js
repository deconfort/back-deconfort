// el primer paso de caulquier enrutador especifico es requerir el metodo Router() del modulo express
let router = require('express').Router()
const schema = require("../schemas/user")
const schemaSignIn = require("../schemas/userSignIn")
const validator = require("../middlewares/validator")
const accountExistsSignUp = require('../middlewares/accountExistsSignUp')
const accountExistsSignIn = require('../middlewares/accountExistsSignIn')
const accountHasBeenVerified = require('../middlewares/accountHasBeenVerified')
const mustSignIn = require('../middlewares/mustSignIn')
const { register,verified, enter, enterWithToken, leave, read, update } = require('../controllers/user')
const passport = require('../config/passport')

// ,,read,

router.post('/sign-up', validator(schema), accountExistsSignUp, register)
router.get('/verify/:code', verified)
router.post('/sign-in', validator(schemaSignIn),accountExistsSignIn, accountHasBeenVerified, enter)
router.post('/token', passport.authenticate('jwt', { session:false }), mustSignIn, enterWithToken)
router.post('/sign-out', passport.authenticate('jwt', { session:false }), leave)
router.get('/me/:id',read)
router.patch("/me/:id", update)


module.exports = router;
