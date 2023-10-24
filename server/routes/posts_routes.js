const express = require('express');
const router = express.Router();

const getPostsController = require('../controllers/getControllers/posts');
const postPostsController = require('../controllers/postControllers/posts');

router.get('/', getPostsController.getPosts);
router.post('/', postPostsController.createPosts);
router.get('/:id', getPostsController.getPost);
router.patch('/:id', postPostsController.updatePost);
router.delete('/:id', postPostsController.deletePost);
router.patch('/:id/likePost', postPostsController.likePost);

module.exports = router;