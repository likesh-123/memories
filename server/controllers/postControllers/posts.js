const { postMessageSchema } = require('../../models/postMessage')
const mongoose = require('mongoose');

const createPosts = async (req, res) => {
    const post = req.body;
    try {
        const newPost = await new postMessageSchema(post).save();
        console.log({ newPost });
        res.status(201).json(newPost);

    } catch (errrr) {
        res.status(409).json({ message: errrr.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.status(200).json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.status(204).json({ message: "Post deleted successfully." });
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.status(200).json(updatedPost);
}

module.exports = {
    createPosts,
    updatePost,
    deletePost,
    likePost
}