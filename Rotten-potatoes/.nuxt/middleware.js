const middleware = {}

middleware['isAdmin'] = require('../middleware/isAdmin.js')
middleware['isAdmin'] = middleware['isAdmin'].default || middleware['isAdmin']

export default middleware
