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

module.exports = {
    getPosts
}