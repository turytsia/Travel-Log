const { Schema, model } = require("mongoose");
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    category: String,
    tags: [String],
    images: [String],
    comments: {
        type: Array,
    },
    author: {
        type: String,
        required: true,
    },
    likes: [String],
}, { timestamps: true });

blogSchema.methods.comment = function(comment) {
    this.comments.push(comment);
    this.markModified("comments");
};

blogSchema.methods.like = function(id) {
    if (!this.likes.includes(id)) {
        this.likes.push(id);
    } else {
        this.likes = this.likes.filter((like) => like !== id);
    }
    this.markModified("likes");
};

const blogModel = model("blog", blogSchema);
module.exports = blogModel;