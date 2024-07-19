const router = require('express').Router();
const Note = require('../models/note');
const auth = require('../middleware/auth');

router.post('/create', auth, async (req, res) => {
  const { title, content, tags, backgroundColor } = req.body;
  const note = new Note({
    user: req.user._id,
    title,
    content,
    tags,
    backgroundColor,
  });

  try {
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user._id, isTrashed: false });
  res.send(notes);
});

router.get('/archived', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user._id, isArchived: true });
  res.send(notes);
});

router.get('/trashed', auth, async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
    isTrashed: true,
    createdAt: { $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });
  res.send(notes);
});

router.get('/tag/:tag', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user._id, tags: req.params.tag });
  res.send(notes);
});

module.exports = router;
