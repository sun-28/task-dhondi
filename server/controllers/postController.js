const connection = require('../db');

exports.getAllPosts = (req, res) => {
    connection.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error retrieving posts' });
        } else {
            res.json(results);
        }
    });
};

exports.getPostById = (req, res) => {
    const postId = req.params.id;
    connection.query('SELECT * FROM posts WHERE id = ?', postId, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error retrieving post' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json(results[0]);
        }
    });
};

exports.createPost = (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    connection.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error creating post' });
        } else {
            res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
        }
    });
};

exports.updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id; 
    connection.query('UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?', [title, content, postId, userId], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error updating post' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Post not found or you do not have permission to update' });
        } else {
            res.json({ message: 'Post updated successfully' });
        }
    });
};

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    connection.query('DELETE FROM posts WHERE id = ? AND user_id = ?', [postId, userId], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error deleting post' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Post not found or you do not have permission to delete' });
        } else {
            res.json({ message: 'Post deleted successfully' });
        }
    });
};
