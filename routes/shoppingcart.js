let router = require('express').Router()
let {addProductCart,  deleteProduct, getProductsCart, putProduct } = require("../controllers/shoppingCart")
const validator = require("../middlewares/validator")
 const passport = require('../config/passport') 
const Product = require("../models/Product");
const ShoppingCart = require("../models/ShoppingCart");
const isTheSameUser = require('../middlewares/isTheSameUser')


router.post("/",  addProductCart)
router.get("/",  getProductsCart)
router.put("/:id", passport.authenticate("jwt", { session: false }), isTheSameUser(ShoppingCart), putProduct)
router.delete("/:id", passport.authenticate("jwt", { session: false }), isTheSameUser(ShoppingCart), deleteProduct)
module.exports = router;