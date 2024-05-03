const connection = require('../db');



exports.getAllPosts = async (req, res) => {
    try {
        const posts = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM posts ORDER BY created_at DESC', async (error, results) => {
                if (error) {
                    reject({ success: false, message: 'Error retrieving posts' });
                } else {
                    if (results.length !== 0) {
                        for (let i = 0; i < results.length; i++) {
                            try {
                                const userResults = await new Promise((resolve, reject) => {
                                    connection.query('SELECT name,image FROM users WHERE id = ?', results[i].user_id, (error, userResults) => {
                                        if (error) {
                                            reject({ success: false, message: 'Error retrieving user' });
                                        } else {
                                            resolve(userResults);
                                        }
                                    });
                                });
                                results[i].name = userResults[0].name;
                                results[i].image = userResults[0].image;
                            } catch (error) {
                                reject(error);
                            }
                        }
                        resolve(results);
                    } else {
                        resolve([]);
                    }
                }
            });
        });
        res.json({ success: true, data: posts });
    } catch (error) {
        res.json(error);
    }
};

exports.getAllPostsByUserId = async (req, res) => {
    const userId = req.userId;
    try {
        const posts = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', userId, async (error, results) => {
                if (error) {
                    reject({ success: false, message: 'Error retrieving posts' });
                } else {
                    if (results.length !== 0) {
                        for (let i = 0; i < results.length; i++) {
                            try {
                                const userResults = await new Promise((resolve, reject) => {
                                    connection.query('SELECT name,image FROM users WHERE id = ?', results[i].user_id, (error, userResults) => {
                                        if (error) {
                                            reject({ success: false, message: 'Error retrieving user' });
                                        } else {
                                            resolve(userResults);
                                        }
                                    });
                                });
                                results[i].name = userResults[0].name;
                                results[i].image = userResults[0].image;
                            } catch (error) {
                                reject(error);
                            }
                        }
                        resolve(results);
                    } else {
                        resolve([]);
                    }
                }
            });
        });
        res.json({ success: true, data: posts });
    } catch (error) {
        res.json(error);
    }
};


exports.getPostById = (req, res) => {
    const postId = req.params.id;
    connection.query('SELECT * FROM posts WHERE id = ?', postId, (error, results) => {
        if (error) {
            res.json({ success: false, message: 'Error retrieving post' });
        } else if (results.length === 0) {
            res.json({ success: false, message: 'Post not found' });
        } else {
            connection.query('SELECT name , image FROM users WHERE id = ?', results[0].user_id, (error, userResults) => {
                if (error) {
                    return res.json({ success: false, message: 'Error retrieving user' });
                } else {
                    results[0].name = userResults[0].name;
                    results[0].image = userResults[0].image;
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
            res.json({ success: false, message: 'Error creating post' });
        } else {
            res.json({ success: true, message: 'Post created successfully', postId: result.insertId });
        }
    });
};

exports.updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, content ,tags} = req.body;
    const parsedTags = JSON.stringify(tags);
    const userId = req.userId;
    connection.query('UPDATE posts SET title = ?, content = ?, tags = ? WHERE id = ? AND user_id = ?', [title, content, parsedTags,postId, userId], (error, result) => {
        if (error) {
            res.json({ success: false, message: 'Error updating post' });
        } else if (result.affectedRows === 0) {
            res.json({ success: false, message: 'Post not found or you do not have permission to update' });
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
            console.log(error)
            res.json({ success: false, message: 'Error deleting post' });
        } else if (result.affectedRows === 0) {
            res.json({ success: false, message: 'Post not found or you do not have permission to delete' });
        } else {
            res.json({ success: true, message: 'Post deleted successfully' });
        }
    });
};
