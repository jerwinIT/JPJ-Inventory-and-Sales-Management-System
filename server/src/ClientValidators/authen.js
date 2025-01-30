const { check } = require('express-validator')
const db = require('../db')
const { compare } = require ('bcryptjs')

//Registration
//password - validation
const password  = check('password')
    .isLength({min: 6, max: 15})
    .withMessage('Password has to be between 6 and 15 characters')

//username - validation
const username  = check('username')
    .isLength({min: 5, max: 15})
    .withMessage('Username has to be between 5 and 15 characters')

//check if username exists
const usernameExist = check('username').custom(async (value) => {
    const { rows } = await db.query('select * from system_credentials where username = $1', [value]);

    if (rows.length) {
        throw new Error('Username already exists.');
    }
});

//check if username exists-user
const usernameExistUser = check('username').custom(async (value) => {
    const { rows } = await db.query('select * from user_credentials where username = $1', [value]);

    if (rows.length) {
        throw new Error('Username already exists.');
    }
});


//login validator
const loginFieldsCheck = check('username').custom(async (value, { req }) => {
    const username = value.trim(); 

    const user = await db.query('SELECT * FROM system_credentials WHERE username = $1', [username]);

    if (!user.rows.length) {
        throw new Error('Username does not exist.');
    }

    const validPassword = await compare(req.body.password, user.rows[0].password);

    if (!validPassword) {
        throw new Error('Incorrect Password');
    }

    req.user = user.rows[0];
})

//change password validator
const changePasswordValidation = [
    //old password validation
    check('oldPassword')
        .exists()
        .withMessage('Old password is required.')
        .isLength({ min: 6, max: 15 })
        .withMessage('Old password must be between 6 and 15 characters.'),

    //new password validation
    check('newPassword')
        .exists()
        .withMessage('New password is required.')
        .isLength({ min: 6, max: 15 })
        .withMessage('New password must be between 6 and 15 characters.'),

    //confirm new password validation
    check('confirmNewPassword')
        .exists()
        .withMessage('Confirm new password is required.')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error('Passwords do not match.');
            }
            return true;
        })
];

//delete account validator
const deleteAccountValidation = [
    // username validation
    check('username')
        .exists()
        .withMessage('Username is required.')
        .isLength({ min: 5, max: 15 })
        .withMessage('Username must be between 5 and 15 characters.')
];





module.exports = {
    registerValidation: [username, password, usernameExist],
    registerValidationUser: [username, password, usernameExistUser],
    loginValidation: [loginFieldsCheck],
    changePasswordValidation: changePasswordValidation,
    deleteAccountValidation: deleteAccountValidation
}