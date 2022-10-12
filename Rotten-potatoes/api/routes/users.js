const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const usersController = require('../controllers/usersController')

// Register
router.post('/users/register', usersController.register)

// Login
router.post('/users/login', usersController.login)

// Get User by token
router.get('/users/user', usersController.user)

// Get User by id
router.get('/users/id/:id', usersController.show)

// Get Users
router.get('/users/users', usersController.users)

// Delete
router.delete('/users/:id', config.isAuthenticated, usersController.delete)

// Update
router.put('/users/:id', config.isAuthenticated, usersController.update)

module.exports = router
