const passport = require('passport')
const { Strategy } = require('passport-jwt')
const { SECRET } = require('../constants')
const db = require('../db')

const cookieExtractor = function  (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts =  {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(opts, async ({ id }, done) => {
        try {
            const { rows } = await db.query(
                'select user_id, username from system_credentials where user_id = $1',
                [id]
            )

            if (!rows.length) {
                return done(null, false, { message: 'User not found' })
            }

            let user = { id: rows[0].id, username: rows[0].username }

            return done(null, user)
        } catch (error) {
            console.log(error.message)
            done(null, false)
        }
    })
)