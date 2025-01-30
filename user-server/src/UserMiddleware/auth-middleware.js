const passportUser = require('passport')

exports.userAuthen = passportUser.authenticate('jwt', { session: false })