let express = require('express');
let router = express.Router();
let user = require("./user")
let product = require("./product")

router.use('/api/auth', user)
router.use('/api/products', product)

module.exports = router;
