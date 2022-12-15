const Product = require("../models/Product");

const controller = {
  create: async (req, res) => {
    try {
      let new_product = await Product.create(req.body);
      res.status(201).json({
        response: new_product,
        success: true,
        message: "the product was successfully created",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  read: async (req, res) => {
    let query = {};
    let order = {};

    if (req.query.userId) {
      query = { userId: req.query.userId };
    }
    if (req.query.category) {
      query = { category: req.query.category };
    }
    if (req.query.name) {
      query = {
        ...query,
        name: { $regex: req.query.name, $options: "i" },
      };
    }
    if (req.query.order) {
      order = {
        name: req.query.order,
      };
    }

    try {
      let all_products = await Product.find(query).sort(order);
      if (all_products) {
        res.status(200).json({
          success: true,
          message: "the products were successfully found",
          response: all_products,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "there are no products",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  readOne: async (req, res) => {
    let id = req.params.id;
    try {
      let product = await Product.findOne({ _id: id }).populate({
        path: "userId",
        select: "name photo -_id",
      });
      if (product) {
        res.status(200).json({
          success: true,
          message: "the product was successfully found",
          response: product,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "there is no product",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    let { id } = req.params;
    try {
      let product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      if (product) {
        res.status(200).json({
          id: product._id,
          response: product,
          success: true,
          message: "The product was successfully modified",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "The product was not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  destroy: async (req, res) => {
    let { id } = req.params;
    try {
      let product = await Product.findOneAndDelete({ _id: id });
      if (product) {
        res.status(200).json({
          res: product,
          success: true,
          message: "The product was successfully deleted",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "The product was not found",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
module.exports = controller;
