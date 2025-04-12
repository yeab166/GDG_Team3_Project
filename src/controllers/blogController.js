const BlogPost = require('../models/BlogPost');  // Assuming your BlogPost model is correctly imported

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const author = req.user._id; // Ensure the 'author' field is set to the authenticated user's ID

    // Create a new blog post
    const newPost = new BlogPost({ title, content, category, author });

    await newPost.save();
    res.status(201).json({ message: 'Blog post created successfully', newPost });
  } catch (error) {
    res.status(500).json({ error: 'Error creating blog post', message: error.message });
  }
};

module.exports = { createBlogPost };
