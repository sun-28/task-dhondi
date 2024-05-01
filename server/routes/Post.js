const express = require('express');
const postController = require('../controllers/postController');
const { userAuthentication } = require('../middlewares/userAuthentication');

const router = express.Router();

// Public Routes ----

router.get('/getAll', postController.getAllPosts);

router.get('/:id', postController.getPostById);



// Protected Routes -----

router.use(userAuthentication);


router.post('/create', postController.createPost);

router.put('/update/:id', postController.updatePost);

router.delete('/del/:id', postController.deletePost);

module.exports = router;
