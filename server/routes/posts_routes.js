const express = require('express');
const router = express.Router();

const getPostsController = require('../controllers/getControllers/posts');
const postPostsController = require('../controllers/postControllers/posts');

router.get('/', getPostsController.getPosts)
router.post('/', postPostsController.createPosts)

module.exports = router;