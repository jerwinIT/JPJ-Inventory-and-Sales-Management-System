const{config} = require('dotenv')
config()

module.exports = {
    PORT: process.env.PORT,
    USER_URL: process.env.USER_URL,
    SERVER_URL: process.env.SERVER_URL,
    SECRET: process.env.SECRET,
};