// View all blog posts by any user

app.get('/posts', async (req, res) => {
  const posts = await BlogPost.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(posts);
});