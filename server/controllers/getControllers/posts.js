const { postMessageSchema } = require('../../models/postMessage')

const getPosts = async (req, res) => {
    try {

        const postMessages = await postMessageSchema.find({});
        console.log({ postMessages });
        res.status(200).json(postMessages);

    } catch (errrr) {
        res.status(404).json({ message: errrr.message });
    };
}

const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getPosts,
    getPost
}