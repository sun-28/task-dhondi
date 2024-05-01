const connection = require('../db');



exports.getAllPosts = (req, res) => {
    connection.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            res.status(500).json({ success: false, error: 'Error retrieving posts' });
        } else {
            connection.query('SELECT name FROM users WHERE id = ?', results[0].user_id, (error, userResults) => {
                if (error) {
                    return res.status(500).json({ success: false, error: 'Error retrieving user' });
                } else {
                    results[0].name = userResults[0].name;
                    res.json({ success: true, data: results });
                }
            });
        }
    });
};

exports.getAllPostsByUserId = (req, res) => {
    const userId = req.userId;
    connection.query('SELECT * FROM posts WHERE user_id = ?', userId, (error, results) => {
        if (error) {
            res.status(500).json({ success: false, error: 'Error retrieving posts' });
        } else {
            connection.query('SELECT name FROM users WHERE id = ?', results[0].user_id, (error, userResults) => {
                if (error) {
                    return res.status(500).json({ success: false, error: 'Error retrieving user' });
                } else {
                    results[0].name = userResults[0].name;
                    res.json({ success: true, data: results });
                }
            });
        }
    });
};


exports.getPostById = (req, res) => {
    const postId = req.params.id;
    connection.query('SELECT * FROM posts WHERE id = ?', postId, (error, results) => {
        if (error) {
            res.status(500).json({ success: false, error: 'Error retrieving post' });
        } else if (results.length === 0) {
            res.status(404).json({ success: false, error: 'Post not found' });
        } else {
            connection.query('SELECT name FROM users WHERE id = ?', results[0].user_id, (error, userResults) => {
                if (error) {
                    return res.status(500).json({ success: false, error: 'Error retrieving user' });
                } else {
                    results[0].name = userResults[0].name;
                    res.json({ success: true, data: results[0]});
                }
            });
        }
    });
};

exports.createPost = (req, res) => {
    const userId = req.userId;
    const { title, content, tags } = req.body;
    const parsedTags = JSON.stringify(tags);
    connection.query('INSERT INTO posts (title, content, tags, user_id) VALUES (?, ?, ?, ?)', [title, content, parsedTags, userId], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ success: false, error: 'Error creating post' });
        } else {
            res.status(201).json({ success: true, message: 'Post created successfully', postId: result.insertId });
        }
    });
};

exports.updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.userId;
    connection.query('UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?', [title, content, postId, userId], (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: 'Error updating post' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ success: false, error: 'Post not found or you do not have permission to update' });
        } else {
            res.json({ success: true, message: 'Post updated successfully' });
        }
    });
};

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;
    connection.query('DELETE FROM posts WHERE id = ? AND user_id = ?', [postId, userId], (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: 'Error deleting post' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ success: false, error: 'Post not found or you do not have permission to delete' });
        } else {
            res.json({ success: true, message: 'Post deleted successfully' });
        }
    });
};
