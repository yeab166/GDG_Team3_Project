// Update own blog post by ID only authenticated person

app.put('/posts/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.findById(id);

  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

  const { title, content, category } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (category) post.category = category;

  await post.save();
  res.json(post);
});