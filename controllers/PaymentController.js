const axios = require('axios');

const Product = require('../models/Product')

const paymentController = {
    async confirmPayment(req, res) {
        console.log('Payment confirmed', req.query);
        const id = req.query.preference_id;
        const mercadopagoResponse = await axios.get('https://api.mercadopago.com/checkout/preferences/' + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        const items = mercadopagoResponse.data.items;
        for (const item of items) {
            const { quantity, id } = item;
            await Product.findByIdAndUpdate(id, { $inc: { stock: -quantity } });
        }

        return res.redirect(303, `${process.env.FRONTEND_URL}/payment-success`);
    },
    async failedPayment(req, res) {
        console.log('Payment failed', req.query);
        return res.redirect(303, `${process.env.FRONTEND_URL}/payment-failure`);
    },
    async create(req, res) {
        try {
            // const { mail } = req.user;
            const { items } = req.body;
            // sacar billing address y agregarlo en payload
            const products = [];
            for (const item of items) {
                const product = await Product.findById(item.id);
                products.push({
                    title: product.name,
                    category_id: "others",
                    quantity: item.quantity,
                    currency_id: "USD",
                    unit_price: product.price,
                    picture_url: product.photo,
                    id: item.id
                });
            }

            const payload = {
                items: products,
                payer: {
                  mail: "test_user_52503275@testuser.com",
                },
                back_urls: {
                    success: `${process.env.BACKEND_URL2}/payments/success`,
                    failure: `${process.env.BACKEND_URL2}/payments/failure`,
                },
                auto_return: "approved",
                statement_descriptor: "MINDGROW",
            };

            const mercadopagoResponse = await axios.post('https://api.mercadopago.com/checkout/preferences', payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            });

            console.log(mercadopagoResponse);
            return res.status(200).json({ url: mercadopagoResponse.data.init_point, success: true });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: true,
                message: 'Failed to create payment'
            })
        }
    },
};

module.exports = paymentController;