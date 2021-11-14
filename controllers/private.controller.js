const userModel = require("../models/user");

module.exports.getUser = async function(req, res) {
    try {
        const { id } = req.user;
        const user = await userModel.findById(id, "-password");
        res.json({ success: true, user });
    } catch (err) {
        res.json({ success: false });
    }
};