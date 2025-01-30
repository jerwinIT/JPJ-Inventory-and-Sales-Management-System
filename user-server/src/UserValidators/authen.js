const { check } = require('express-validator')
const db = require('../db')
const { compare } = require ('bcryptjs')


//login validator
const loginFieldsCheck = check('username').custom(async (value, { req }) => {
    const username = value.trim(); 

    const user = await db.query('SELECT * FROM user_credentials WHERE username = $1', [username]);

    if (!user.rows.length) {
        throw new Error('Username does not exist.');
    }

    const validPassword = await compare(req.body.password, user.rows[0].password);

    if (!validPassword) {
        throw new Error('Incorrect Password');
    }

    req.user = user.rows[0];
})

module.exports = {
    loginValidation: [loginFieldsCheck]

}