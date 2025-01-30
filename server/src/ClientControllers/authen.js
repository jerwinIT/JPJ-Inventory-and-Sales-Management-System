const db = require('../db')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const  { SECRET } = require('../constants')

//FOR LOG IN SYSTEM

//displaying only user_id and username (client-admin)
exports.getCred = async (req, res) => {
    try {
        const { rows } = await db.query('select user_id, username, is_admin from system_credentials');
        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}

//displaying only user_id and username (user)
exports.getCredUser = async (req, res) => {
    try {
        const { rows } = await db.query('select user_id, username, is_user from user_credentials');
        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}


//registering  account will be insert into system_credentials table
exports.register = async (req, res) => {
    const {username, password} = req.body
    try {
        const  hashedPassword = await  hash(password, 10)

        await db.query('insert into system_credentials(username, password) values($1, $2)', [username, hashedPassword])
        return res.status(201).json({
            success:true,
            message:'The registration was successful'

        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error:error.message,
        })
    }
}

//registering  account will be insert into system_credentials table
exports.registerUser = async (req, res) => {
    const {username, password} = req.body
    try {
        const  hashedPassword = await  hash(password, 10)

        await db.query('insert into user_credentials(username, password) values($1, $2)', [username, hashedPassword])
        return res.status(201).json({
            success:true,
            message:'The registration was successful'

        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error:error.message,
        })
    }
}

//login logic
exports.login = async (req, res) => {
    let user = req.user
    payload = {
        id: user.user_id,
        username: user.username
    }

    try {
        const token = await sign(payload, SECRET)

        return res.status(200).cookie('token', token, {httpOnly: true}).json({
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
            info: 'protected info'
        })
    } catch (error) {
        console.log(error.message)
    }
}

//Log out logic remove kukies
exports.logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly: true}).json({
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

//change password logic
exports.changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        //check if exist si user
        const userResult = await db.query('SELECT * FROM system_credentials WHERE username = $1', [username]);
        const user = userResult.rows[0];
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        //compare old password
        const isPasswordMatched = await compare(oldPassword, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ success: false, message: 'Old password is incorrect.' });
        }

        //hash new password
        const hashedPassword = await hash(newPassword, 10);

        // Update password in the database
        await db.query('UPDATE system_credentials SET password = $1 WHERE username = $2', [hashedPassword, username]);

        return res.status(200).json({ success: true, message: 'Password changed successfully.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

//change password logic user
exports.changePasswordUser = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        //check if exist si user
        const userResult = await db.query('SELECT * FROM user_credentials WHERE username = $1', [username]);
        const user = userResult.rows[0];
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        //compare old password
        const isPasswordMatched = await compare(oldPassword, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ success: false, message: 'Old password is incorrect.' });
        }

        //hash new password
        const hashedPassword = await hash(newPassword, 10);

        // Update password in the database
        await db.query('UPDATE user_credentials SET password = $1 WHERE username = $2', [hashedPassword, username]);

        return res.status(200).json({ success: true, message: 'Password changed successfully.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

//delete account logic
exports.deleteAccount = async (req, res) => {
    const { username } = req.body;

    try {
        // Check if the user exists
        const userResult = await db.query('SELECT * FROM system_credentials WHERE username = $1', [username]);
        const user = userResult.rows[0];
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Delete user account from the database
        await db.query('DELETE FROM system_credentials WHERE username = $1', [username]);

        return res.status(200).json({ success: true, message: 'User account deleted successfully.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

//delete account logic user
exports.deleteAccountUser = async (req, res) => {
    const { username } = req.body;

    try {
        // Check if the user exists
        const userResult = await db.query('SELECT * FROM user_credentials WHERE username = $1', [username]);
        const user = userResult.rows[0];
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Delete user account from the database
        await db.query('DELETE FROM user_credentials WHERE username = $1', [username]);

        return res.status(200).json({ success: true, message: 'User account deleted successfully.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};