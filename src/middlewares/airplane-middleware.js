// const { StatusCodes } = require('http-status-codes');

// function validateAirplane(req, res, next) {
//     const { modelNumber, capacity } = req.body;

//     if (!modelNumber || typeof modelNumber !== 'string') {
//         return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Model number is required and must be a string.' });
//     }

//     if (!capacity  || capacity <= 0) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Capacity is required and must be a positive number.' });
//     }

//     next();
// }

// module.exports = {
//     validateAirplane
// };
