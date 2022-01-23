const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blogModel = require("../models/blog");
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    ava: String,
    bio: String,
    followers: [String],
    following: [String],
    blogs: [String]
}, { timestamps: true });

userSchema.pre("save", async function() {
    if (!this.isModified(this.password))
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(12));
});

userSchema.methods.getToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.followUser = function(id) {
    if (!this.following.includes(id)) {
        this.following.push(id);
    } else {
        this.following = this.following.filter((userID) => userID !== id);
    }
    this.markModified("following");
};

userSchema.methods.addFollower = function(id) {
    if (!this.followers.includes(id)) {
        this.followers.push(id);
    } else {
        this.followers = this.followers.filter((userID) => userID != id);
    }
    this.markModified("followers");
};

const userModel = model("user", userSchema);
module.exports = userModel;