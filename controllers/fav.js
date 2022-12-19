const Fav = require('../models/Fav');

const controller = {
    createFav: async (req, res) => {
        try {
            let new_fav = await Fav.create(req.body);
            res.status(201).json({
                id: new_fav._id,
                success: true,
                message: 'Fav created',
                response: new_fav,
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
        if (req.query.productId) {
            query = { productId: req.query.productId };
        }
        if (req.query.userId) {
            query = { userId: req.query.userId };
        }
        try {
            let favs = await Fav.find(query)
                .populate({ path: 'userId', select: 'name lastName photo' })
                .populate({ path: 'productId', select: 'name photo price category _id' })

            if (favs.length > 0) {
                let lengthOfFavs = {}
                favs.forEach(favs => lengthOfFavs[favs.name] = favs.userId.length)
                res.status(200).json({
                    lengthOfFavs,
                    data: favs,
                    success: true,
                    message: `All favs found`,
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No favs found',
                    data: [],
                });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                data: error
            })
        }
    },
    updateFav: async (req, res) => {
        let query = {};
        let Id = req.user.id

        if (req.query.productId) {
            query = {
                productId: req.query.productId
            };
        }
        if (req.query.name)
            query = {
                ...query,
                name: req.query.name
            };
        try {

            let favs = await Fav.findOne(query)
            if (favs) {
                if (favs.userId.includes(Id)) {
                    await Fav.findOneAndUpdate({ _id: favs._id }, { $pull: { userId: Id } }, { new: true })
                    res.status(200).json({
                        message: `Product was removed from favs`,
                        success: true,
                        reactioned: false
                    })
                } else {
                    await Fav.findOneAndUpdate({ _id: favs._id }, { $push: { userId: Id } }, { new: true })
                    res.status(200).json({
                        message: `Product was added to favs`,
                        success: true,
                        reactioned: true
                    })
                }
            } else {
                res.status(404).json({
                    message: 'The fav dont exist in the product',
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },

    destroy: async (req, res) => {
        let { id } = req.params

        try {
            let response = await Fav.findOneAndUpdate({ _id: id }, { $pull: { userId: req.user.id } }, { new: true })
            res.status(200).json({
                response,
                message: `fav deleted`,
                success: true,
            })
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            })
        }
    },
}

module.exports = controller;    