const postMessageSchema = require('../../models/postMessage')

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

module.exports = {
    createPosts
}