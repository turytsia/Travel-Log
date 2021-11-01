const blogModel = require("../models/blog");
const userModel = require("../models/user");

module.exports.likeBlog = async function(req, res) {
    const blogID = req.params.id;
    //the code below needs to be optimized
    try {
        if (!req.user) throw new Error("Unauthorized");
        const userID = req.user.id;
        const user = await userModel.findById(userID);
        await user.likeBlog(blogID);
        await user.save();

        const blog = await blogModel.findById(blogID);

        res.status(200).json({ success: true, blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports.commentBlog = async function(req, res) {
    const { commentBody } = req.body;
    try {
        if (!req.user) throw new Error("Unauthorized");
        if (!commentBody) throw new Error("Text area is empty!");
        const blogID = req.params.id;
        const blog = await blogModel.findById(blogID);
        const user = await userModel.findById(
            req.user.id,
            "-password -followers -following -blogs"
        );
        const comment = {
            body: commentBody,
            user,
        };
        await blog.Comment(comment);
        await blog.save();

        res.status(200).json({ success: true, blog });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports.getBlog = async function(req, res) {
    const blogID = req.params.id;
    try {
        const blog = await blogModel.findById(blogID);
        res.status(200).json({ success: true, blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports.getBlogs = async function(req, res) {
    const filter = {};
    try {
        const blogs = await blogModel.find(filter);
        res.status(200).json({ success: true, blogs });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports.createBlog = async function(req, res) {
    let { title, body, category, tags } = req.body;
    const images = req.files.map((file) => file.filename);
    try {
        if (!req.user) throw new Error("Unauthorized");
        if (tags) tags = tags.split(",");

        if (!title || !body)
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        const blog = new blogModel({
            title,
            body,
            category,
            tags,
            images,
            author: req.user.id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        await blog.save();
        res.status(201).json({ success: true, message: "Blog has been created" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports.updateBlog = async function(req, res) {
    const { title, body, category, tags } = req.body;
    const blogID = req.params.id;

    try {
        if (!req.user) throw new Error("Unauthorized");
        await blogModel.findByIdAndUpdate(blogID, {
            title,
            body,
            category,
            tags,
        });
        res
            .status(200)
            .json({ success: true, message: `Blog with ID(${blogID}) was updated` });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports.deleteBlog = async function(req, res) {
    const blogID = req.params.id;
    try {
        if (!req.user) throw new Error("Unauthorized");
        await blogModel.findByIdAndDelete(blogID);
        res.status(200).json({ success: true, message: "Blog was removed" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};