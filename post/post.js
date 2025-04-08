// Create blog post only by authenticated  users

app.post('/posts', authMiddleware, async (req, res) => {
  const { title, content, category } = req.body;
  const author = req.user.id;

  try {
    const post = new BlogPost({ title, content, category, author });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});