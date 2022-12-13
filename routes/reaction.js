let router = require('express').Router()
let {create, updateReaction, read} = require("../controllers/reaction")
const passport = require('../config/passport')
const validator = require("../middlewares/validator");
const schema = require("../schemas/reaction")



router.post("/",passport.authenticate("jwt", { session: false }), validator(schema), create)
router.get("/", passport.authenticate("jwt", { session: false }),read)
router.put("/", passport.authenticate("jwt", { session: false }),  updateReaction)




module.exports = router;