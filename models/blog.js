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
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});

blogSchema.methods.Comment = function(comment) {
    this.comments.push(comment);
    this.markModified("comments");
};

const blogModel = model("blog", blogSchema);
module.exports = blogModel;