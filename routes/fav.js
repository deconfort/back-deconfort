let router = require('express').Router();
let { createFav, updateFav, read, destroy, destroyFav } = require('../controllers/fav');
const validator = require('../middlewares/validator');
const schema = require('../schemas/fav');
const passport = require('passport');
const Fav = require('../models/Fav');
const verifyUser = require('../middlewares/verifyUser');


router.get('/', read);
router.post('/', validator(schema), createFav);
router.put('/', passport.authenticate("jwt", { session: false }), updateFav);
router.put('/:id', passport.authenticate("jwt", { session: false }), verifyUser(Fav), destroy);
router.put('/delete/:id', destroyFav);

module.exports = router;
