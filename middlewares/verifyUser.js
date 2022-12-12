const { mustBeTheOwner, activityNotFound } = require("../config/responses");

const verifyUser = model => [
    async (req, res, next) => {
        let item = await model.findOne({ _id: req.params.id });
        if (item) {
            if (Array.isArray(item.userId)) {
                let response = item.userId.find(user => user.equals(req.user.id))
                if (response) {
                    return next()
                } else {
                    return mustBeTheOwner(req, res);
                }
            } else {
                if (item.userId.equals(req.user.id)) {
                    return next()
                } else {
                    return mustBeTheOwner(req, res);
                }
            }
        }
        return activityNotFound(req, res);
    },
];


module.exports = verifyUser;