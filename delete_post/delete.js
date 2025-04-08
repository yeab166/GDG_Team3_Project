// Delete own blog post by ID also only by authenticated person

app.delete('/posts/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const post = await BlogPost.findById(id);

  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

  await post.deleteOne();
  res.json({ message: 'Post deleted successfully' });
});
