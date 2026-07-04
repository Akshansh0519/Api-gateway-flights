const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    PORT: process.env.PORT || 5000,
    SALT_ROUNDS: process.env.SALT_ROUNDS || 8
}