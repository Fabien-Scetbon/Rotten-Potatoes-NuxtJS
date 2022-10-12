const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = new Schema({
  movie_id: { type: String, required: true },
  author_id: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  note: { type: Number, required: true, min: 0, max: 10 },
  created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Article', Article)
