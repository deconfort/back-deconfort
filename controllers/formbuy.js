const FormBuy = require("../models/FormBuy");
const sendmail = require("./sendmail");
const crypto = require("crypto");

const controller = {
    create: async (req, res) => {
        try {
            await new FormBuy(req.body).save()
            let code = crypto.randomBytes(8).toString("hex");
            sendmail(
                req.body.mail, 
                req.body.name,
                req.body.lastName,
                req.body.country,
                req.body.state,
                req.body.shippingadress,
                req.body.phone,
                req.body.productName,
                req.body.productPrice,
                code
                );
            res.status(201).json({
                message: 'purchase created',
                success: true
            })
        } catch (error) {
            console.log(error.message)
            res.status(400).json({
                message: "could't create purchase",
                success: false
            })
        }
    },
    readAll: async (req, res) => {
        let query = {}
        if (req.query.user) {
            query.user = req.query.user
        }
        try {
            let purchases = await FormBuy.find(query)
                .populate("user", ["id"])
                .populate("product", ["name", "price", "category"])
            res.status(200).json({
                message: "you get purchases",
                response: purchases,
                success: true
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).json()
        }
    },
}
module.exports = controller;