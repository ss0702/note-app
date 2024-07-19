const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [], maxLength: 9 },
  backgroundColor: { type: String, default: '#ffffff' },
  isArchived: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', NoteSchema);
