const blogModel = require("../models/blog");

module.exports.likeBlog = async function(req, res) {
    if (!req.user)
        return res.status(401).json("You are unauthorized");

    const userID = req.user.id;
    const blogID = req.params.id;

    blogModel
        .findById(blogID)
        .then((blog) => {
            blog.like(userID);
            blog
                .save()
                .then(() => res.json({ success: true, blog }))
                .catch((error) =>
                    res.status(400).json({ success: false, message: error })
                );
        })
        .catch((error) => res.status(400).json({ success: false, message: error }));
};

module.exports.commentBlog = async function(req, res) {
    const { commentBody } = req.body;
    if (!req.user.id)
        return res.status(400).json({ success: false, message: "Unauthorized" });
    if (!commentBody)
        return res
            .status(400)
            .json({ success: false, message: "Text area is empty" });
    const blogID = req.params.id;
    const userID = req.user.id;

    blogModel
        .findById(blogID)
        .then((blog) => {
            const comment = {
                body: commentBody,
                user: userID,
            };
            blog.comment(comment);
            blog
                .save()
                .then(() => res.json({ success: true, blog }))
                .catch((error) =>
                    res.status(400).json({ success: false, message: error })
                );
        })
        .catch((error) => res.status(400).json({ success: false, message: error }));
};

module.exports.getBlog = async function(req, res) {
    const blogID = req.params.id;
    blogModel
        .findById(blogID)
        .then((blog) => res.json({ success: true, blog }))
        .catch((error) => res.status(400).json({ success: false, message: error }));
};

module.exports.getBlogs = async function(req, res) {
    const filter = {};
    try {
        const blogs = await blogModel.find(filter).sort({ createdAt: -1 });
        const tags = await blogModel.distinct("tags");
        res.status(200).json({ success: true, blogs, tags });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

module.exports.createBlog = async function(req, res) {
    let { title, body, category, tags } = req.body;
    const images = req.files.map((file) => file.filename);

    if (!req.user)
        return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!title || !body || !category)
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });
    if (tags) tags = tags.split(","); //??
    const blog = new blogModel({
        title,
        body,
        category,
        tags,
        images,
        author: req.user.id,
    });

    blog
        .save()
        .then(() =>
            res
            .status(201)
            .json({ success: true, message: "Blog was created successfuly" })
        )
        .catch((error) => res.status(400).json({ success: false, message: error }));
};

module.exports.updateBlog = async function(req, res) {
    const { title, body, category, tags } = req.body;
    const blogID = req.params.id;

    if (!req.user)
        return res.status(400).json({ success: false, message: "Unauthorized" });

    blogModel
        .findById(blogID)
        .then((blog) => {
            blog.title = title;
            blog.body = body;
            blog.category = category;
            blog.tags = tags;

            blog
                .save()
                .then(() =>
                    res.json({
                        success: true,
                        message: `Blog '${blog.title}' was updated`,
                    })
                )
                .catch((error) =>
                    res.json({
                        success: false,
                        message: `Unable to update blog: ${error}`,
                    })
                );
        })
        .catch((error) =>
            res.json({ success: false, message: `Unable to update blog: ${error}` })
        );
};

module.exports.deleteBlog = async function(req, res) {
    const blogID = req.params.id;
    if (!req.user)
        return res.status(400).json({ success: false, message: "Unauthorized" });

    blogModel
        .findByIdAndDelete(blogID)
        .then(() =>
            res.json({ success: true, message: "Blog was removed successfuly" })
        )
        .catch((error) => res.status(400).json({ success: false, message: error }));
};