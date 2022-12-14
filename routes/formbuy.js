var express = require("express");
var router = express.Router();

const { readAll, create } = require("../controllers/formbuy");

router.get("/", readAll);
router.post("/", create);

module.exports = router;