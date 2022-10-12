const Article = require('../models/Article')
const validator = require('express-validator')

// Get all
module.exports.list = function (req, res, next) {
  Article.find({}, function (err, articles) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting records.',
      })
    }
    return res.json(articles)
  })
}

// Get one
module.exports.show = function (req, res) {
  var id = req.params.id
  Article.findOne({ _id: id }, function (err, article) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.',
      })
    }
    if (!article) {
      return res.status(404).json({
        message: 'No such record',
      })
    }
    return res.json(article)
  })
}

// Create
module.exports.create = [
  // validations rules

  validator.body('body', 'Please enter Movie Comment').isLength({ min: 1 }),
  validator.body('note', 'Please enter Note').isFloat({ min: 0, max: 10 }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }

    // initialize record
    var article = new Article({
      movie_id: req.body.movie_id,
      author_id: req.body.author_id,
      author: req.body.author,
      title: req.body.title,
      body: req.body.body,
      note: req.body.note,
      created_at: req.body.created_at,
    })

    // save record
    article.save(function (err, article) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err,
        })
      }
      return res.json({
        message: 'saved',
        _id: article._id,
      })
    })
  },
]
// Update
module.exports.update = [
  // validation rules

  validator.body('body', 'Please enter Movie Comment').isLength({ min: 1 }),
  validator.body('note', 'Please enter Note').isFloat({ min: 0, max: 10 }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    var id = req.params.id
    Article.findOne({ _id: id }, function (err, article) {
      if (err) {
        return res.status(500).json({
          message: 'Error saving record',
          error: err,
        })
      }
      if (!article) {
        return res.status(404).json({
          message: 'No such record',
        })
      }

      // initialize record
      article.movie_id = req.body.movie_id
      article.author_id = req.body.author_id
      article.author = req.body.author
      article.title = req.body.title
      article.body = req.body.body ? req.body.body : article.body
      article.note = req.body.note ? req.body.note : article.note
      article.created_at = req.body.created_at
        ? req.body.created_at
        : article.created_at

      // save record
      article.save(function (err, article) {
        if (err) {
          return res.status(500).json({
            message: 'Error getting record.',
          })
        }
        if (!article) {
          return res.status(404).json({
            message: 'No such record',
          })
        }
        return res.json(article)
      })
    })
  },
]

// Delete
module.exports.delete = function (req, res) {
  var id = req.params.id
  Article.findByIdAndRemove(id, function (err, article) {
    if (err) {
      return res.status(500).json({
        message: 'Error getting record.',
      })
    }
    return res.json(article)
  })
}
