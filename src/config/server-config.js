const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	PORT : process.env.PORT || 5000,
	SALT_ROUNDS : process.env.SALT_ROUNDS || 8,
	JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
	JWT_EXPIRATION : process.env.JWT_EXPIRATION || '1h'
};