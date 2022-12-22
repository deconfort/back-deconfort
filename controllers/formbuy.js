const FormBuy = require("../models/FormBuy");
const sendmail = require("./sendmail");
const crypto = require("crypto");

const controller = {
  sendmail: async (req, res) => {
    let {
      mail,
      name,
      lastName,
      country,
      state,
      adress,
      phone,
      productName,
      productPrice
    } = req.body;
 
    try {
      await FormBuy.create({
        mail,
        name,
        lastName,
        country,
        state,
        adress,
        phone,
        productName,
        productPrice,
    
      });
      console.log(productName);
      await sendmail(mail,  name, lastName, country, state, adress, phone, productName, productPrice);
     return res.status(201).json({
        message: "purchase created",
        success: true,
      });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({
        message: "could't create purchase",
        success: false,
      });
    }
  },
  readAll: async (req, res) => {
    let query = {};
    if (req.query.user) {
      query.user = req.query.user;
    }
    try {
      let purchases = await FormBuy.find(query)
        .populate("user", ["id"])
        .populate("product", ["name", "price", "category"]);
      res.status(200).json({
        message: "you get purchases",
        response: purchases,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json();
    }
  },
};
module.exports = controller;