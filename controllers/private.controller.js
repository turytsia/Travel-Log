const userModel = require("../models/user");

module.exports.getUser = async function(req, res) {
    if (!req.user) return res.status(401).json(`User is unauthorized`);
    userModel
        .findById(req.user.id, "-password")
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.status(400).json(`Error: ${error}`);
        });
};