let router = require('express').Router()
let {create, read, readOne, update, destroy} = require("../controllers/product")
const schema = require("../schemas/product")
const validator = require("../middlewares/validator")
const passport = require('../config/passport')
const Product = require("../models/Product");
const isTheSameUser = require('../middlewares/isTheSameUser')


router.post("/", passport.authenticate("jwt", { session: false }), validator(schema), create)
router.get("/", read)
router.get("/:id", readOne)
router.put("/:id", passport.authenticate("jwt", { session: false }), isTheSameUser(Product), update)
router.delete("/:id", passport.authenticate("jwt", { session: false }), isTheSameUser(Product), destroy)
module.exports = router;
