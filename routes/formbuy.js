var express = require("express");
var router = express.Router();

const { readAll, sendmail } = require("../controllers/formbuy");

router.get("/", readAll);
router.post("/", sendmail);

module.exports = router;