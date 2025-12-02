const {Users} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

async function login(req, res) {
    try {
        const {username, password} = req.body;
        const user = await Users.findOne({where: {username}});
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password',
                isSuccess: false,
                data: null
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password',
                isSuccess: false,
                data: null
            });
        }
        
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            }, JWT_SECRET, {expiresIn: '24h'});

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            isSuccess: true,
            data: {
                token,
                user: {
                    id: user.id,
                    nama: user.nama,
                    username: user.username
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' });
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none' });
        res.clearCookie('connect.sid', { httpOnly: true, secure: true, sameSite: 'none' });

        return res.status(200).json({
            status: 'success',
            message: 'Logout successful',
            isSuccess: true,
            data: null
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'nama', 'username']
        });
        return res.status(200).json({
            status: 'success',
            message: 'Users retrieved successfully',
            isSuccess: true,
            data: users
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function getUserById(req, res) {
    try {
        const {id} = req.params;
        const user = await Users.findByPk(id, {
            attributes: ['id', 'nama', 'username']
        });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
                isSuccess: false,
                data: null
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'User retrieved successfully',
            isSuccess: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

module.exports = {
    login,
    getAllUsers,
    getUserById,
    logout
};