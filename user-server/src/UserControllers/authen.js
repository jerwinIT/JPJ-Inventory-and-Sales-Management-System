const { sign } = require('jsonwebtoken')
const  { SECRET } = require('../constants')

exports.login = async (req, res) => {
    let user = req.user
    payload = {
        id: user.user_id,
        username: user.username
    }

    try {
        const token = await sign(payload, SECRET)

        return res.status(200).cookie('Usertoken', token, {httpOnly: true}).json({
          success: true,
          message: 'Logged in successfully!',
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }
}

exports.protected = async (req, res) => {
    try {
        
        return res.status(200).json({
            info: ''
        })
    } catch (error) {
        console.log(error.message)
    }
}

//Log out logic remove kukies
exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('Usertoken', {httpOnly: true}).json({
            success: true,
            message: 'Logged out successfully!',
          })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        });
    }


}