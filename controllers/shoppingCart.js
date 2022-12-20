const ShoppingCart = require("../models/ShoppingCart");
const Product = require("../models/Product");

const controller = {
    addProductCart : async (req, res) => {
        const { name, photo, price, userId, productId } = req.body;
        const isInProducts = await Product.findOne({ name });
        const notEmpty = name !== "" && photo !== "" && price !== "" && userId !== "" && productId !== "";
        const isInTheCart = await ShoppingCart.findOne({ name, userId });
    
        if (!isInProducts) {
          res.status(400).json({
            message: "This product is not in our database",
          });
        } else if (notEmpty && !isInTheCart) {
          const newProductInCart = new ShoppingCart({ name, photo, price, amount: 1, userId, productId });

          let product = await Product.findById(isInProducts._id)
          let newStock = product.stock -1

          await Product.findByIdAndUpdate(
            isInProducts?._id,
            { inCart: true, name, photo, price, stock: newStock},
            { new: true }
            )
            .then((product) => {
                newProductInCart.save();
                res.json({
                    message: `The product was added to the cart`,
                    success:true,
                    product,
                });
           
            })
            .catch((error) => console.error(error));
        } else if (isInTheCart) {
          res.status(400).json({
            message: `The product is already in the cart`,
            success:false
          });
        }
      },
       deleteProduct : async (req, res) => {
        const { id } = req.params;

        let productInCart = await ShoppingCart.findById(id);
        const { name, photo, price, _id, stock } = await Product.findOne({
          name: productInCart.name,
        });

        let newStock = productInCart.amount + stock
      
        await ShoppingCart.findByIdAndDelete(id);
        await Product.findByIdAndUpdate(
          _id,
          { inCart: false, name, photo, price, stock: newStock },
          { new: true }
        )
          .then((product) => {
            res.json({
              message: `The product ${product.name} was removed from cart`,
            });
          })
          .catch((error) => res.json({ message: "There was a mistake" }));
      },
      getProductsCart : async (req, res) => {
        let query = {}; 
        
        if (req.query.userId) {
            query = { userId: req.query.userId };
        }
        const productsCart = await ShoppingCart.find(query);
      
        if (productsCart) {
          res.json({ productsCart });
        } else {
          res.json({ message: "There are no products in the cart" });
        }
      },
       putProduct : async (req, res) => {
        const { id } = req.params;
        const { query } = req.query;
        const body = req.body;

        let product = await Product.findById(body.productId)
        const productSend = await ShoppingCart.findById(id);
      
        if (!query) {
          res.status(404).json({ mensaje: "You must send a query" });
        } else if (productSend && query === "add") {
            if(product.stock > 0){
          body.amount = body.amount + 1; 
          
          
          let newStock = product.stock -1
          await Product.findByIdAndUpdate(
            body.productId,
            {stock: newStock},
            { new: true }
            )
            }else{
              res.status(400).json({
                  message: "No stock"
                 })
            }
      
          await ShoppingCart.findByIdAndUpdate(id, body, {
            new: true,
          }).then((product) => {
            res.json({
              message: `The product: ${product.name} was updated`,
              product,
            });
          });
        }
        
        else if (productSend && query === "del") {
            body.amount = body.amount - 1;
            
            let newStock = product.stock +1
            await Product.findByIdAndUpdate(
                body.productId,
                {stock: newStock},
                { new: true }
                )
          
      
          await ShoppingCart.findByIdAndUpdate(id, body, {
            new: true,
          }).then((product) =>
            res.json({
              message: `The product: ${product.name} was updated`,
              product,
            })
          );
        } else {
          res.status(400).json({ message: "An error occurred" });
        }
      },
}

module.exports = controller;