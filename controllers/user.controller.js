const userModel = require("../models/user");
const fs = require("fs");

module.exports.updateUser = async function(req, res) {
    const { name, bio } = req.body;
    const userID = req.params.id;
    let ava = req.body.image;
    if (req.file) ava = req.file.filename;
    try {
        if (!req.user) throw new Error("Unauthorized");
        const user = await userModel.findById(userID);
        if (ava !== user.ava) {
            fs.unlink("./images/" + user.ava, (err) => {
                if (err) return console.error(err);
            });
        }

        await user.updateOne({
            name,
            bio,
            ava,
        });

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
module.exports.getUser = async function(req, res) {
    const id = req.params.id;
    userModel
        .findById(id, "-password")
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            res.status(400).json(`Error: ${error}`);
        });
};
module.exports.getUsers = async function(req, res) {
    try {
        const users = await userModel.find();
        res.json({ success: true, users });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
module.exports.Follow = async function(req, res) {
    //the code below needs to be optimized
    try {
        if (!req.user) throw new Error("Unauthorized");
        const userID = req.params.id;
        const currentUser = await userModel.findById(req.user.id, "-password");
        const user = await userModel.findById(userID, "-password");
        //!!!
        await currentUser.followUser(userID);
        await user.addFollower(currentUser._id);
        await currentUser.save();
        await user.save();

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports.Register = async function(req, res) {
    const { name, email, password, passwordConfirm } = req.body;

    if (!name || !email || !password || !passwordConfirm)
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });
    if (password !== passwordConfirm)
        return res
            .status(400)
            .json({ success: false, message: "Passwords don't match" });

    const user = await userModel.findOne({ email });

    if (user)
        return res.status(400).json({
            success: false,
            message: "Account with this email already exists",
        });

    const User = new userModel({
        name,
        email,
        password,
    });
    await User.save();
    res
        .status(201)
        .cookie("token", await User.getToken())
        .json({ success: true, message: "User was created" });
};
module.exports.Login = async function(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });

    const user = await userModel.findOne({ email });
    if (!user)
        return res
            .status(400)
            .json({ success: false, message: "Wrong email or password" });
    if (!(await user.matchPasswords(password)))
        return res
            .status(400)
            .json({ success: false, message: "Wrong email or password" });
    res
        .status(201)
        .cookie("token", await user.getToken())
        .json({ success: true, message: "User was logged in" });
};
module.exports.Logout = async function(req, res) {
    req.user = null;
    res
        .cookie("token", "", { expire: new Date(0) })
        .status(202)
        .json("User was logged out");
};