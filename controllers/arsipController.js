const {Arsip} = require('../models');

async function getAllArsips(req, res) {
    try {
        const arsips = await Arsip.findAll();
        return res.status(200).json({
            status: 'success',
            message: 'Fetched all arsips successfully',
            isSuccess: true,
            data: arsips
        });
    }   catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function getArsipById(req, res) {
    try {
        const {id} = req.params;
        const arsip = await Arsip.findByPk(id);
        if (!arsip) {
            return res.status(404).json({
                status: 'error',
                message: 'Arsip not found',
                isSuccess: false,
                data: null
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Arsip retrieved successfully',
            isSuccess: true,
            data: arsip
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

async function getAllArsipsPagination(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const {count, rows} = await Arsip.findAndCountAll({
            limit,
            offset
        });

        return res.status(200).json({
            status: 'success',
            message: 'Fetched arsips with pagination successfully',
            isSuccess: true,
            data: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                arsips: rows
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

module.exports = {
    getAllArsips,
    getArsipById,
    getAllArsipsPagination
};