let express = require('express');
let router = express.Router();
let user = require("./user")
router.use('/api/auth', user)

module.exports = router;
