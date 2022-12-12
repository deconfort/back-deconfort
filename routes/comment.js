let router = require('express').Router()
const schema = require("../schemas/comment");
const validator = require("../middlewares/validator");
const passport = require('../config/passport') 
const isTheSameUser = require('../middlewares/isTheSameUser')
const Comment = require("../models/Comment");


const {read, create, update, destroy} = require('../controllers/comment')

router.get('/', read)
router.post('/',   passport.authenticate('jwt', {session: false}),    validator(schema), create)
router.put("/:id", passport.authenticate("jwt", { session: false }),isTheSameUser(Comment) , validator(schema), update);
router.delete("/:id", passport.authenticate("jwt", { session: false }),isTheSameUser(Comment), destroy);

module.exports = router;