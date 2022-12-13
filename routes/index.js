let express = require('express');
let router = express.Router();
let user = require("./user")
let product = require("./product")
let fav = require("./fav")
let comment = require ("./comment")
let reaction = require("./reaction")


router.use("/api/reactions", reaction)
router.use('/api/auth', user)
router.use('/api/products', product)
router.use('/api/favs', fav)
router.use('/api/comments', comment)


module.exports = router;
