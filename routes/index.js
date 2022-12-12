let express = require('express');
let router = express.Router();
let user = require("./user")
let product = require("./product")
let fav = require("./fav")

router.use('/api/auth', user)
router.use('/api/products', product)
router.use('/api/favs', fav)

module.exports = router;
