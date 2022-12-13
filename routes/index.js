let express = require('express');
let router = express.Router();
let user = require("./user")
let product = require("./product")
let fav = require("./fav")
let comment = require ("./comment")
let shoppingCart = require ("./shoppingcart")

router.use('/api/auth', user)
router.use('/api/products', product)
router.use('/api/favs', fav)
router.use('/api/comments', comment)
router.use('/api/shopping', shoppingCart)

module.exports = router;
