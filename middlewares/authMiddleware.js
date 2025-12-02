const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({ 
                status: 'error'
,                message: 'Access Token Required'
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await Users.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'User not found'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({
            status: 'error',
            message: 'Invalid Access Token'
        });
    }
}

module.exports = { authenticateToken };