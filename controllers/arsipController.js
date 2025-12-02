const {Arsip} = require('../models');
const imagekit = require('../lib/imagekit');

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

async function createArsip(req, res) {
    try {
        const {kategori, identitas_pelapor, nomor_telepon, sarana_pengaduan, sarana_pengajuan, permasalahan, permohonan, substansi_masalah} = req.body;
        
        if (!kategori || !identitas_pelapor || !nomor_telepon || !sarana_pengaduan || !sarana_pengajuan || !permasalahan || !permohonan || !substansi_masalah) {
            return res.status(400).json({
                status: 'error',
                message: 'All fields are required',
                isSuccess: false,
                data: null
            });
        }

        let dokumentasiUrl = null;
        
        if (req.file) {
            const file = req.file;
            const split = file.originalname.split('.');
            const ext = split[split.length - 1];

            try {
                const uploadImg = await imagekit.upload({
                    file: file.buffer,
                    fileName: `${split[0]}-${Date.now()}.${ext}`,
                });

                if (!uploadImg.url) return res.status(500).json({
                    status: 'error',
                    message: 'Image upload failed',
                    isSuccess: false,
                    data: null
                });
                dokumentasiUrl = uploadImg.url;
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Image upload error: ' + error.message,
                    isSuccess: false,
                    data: null
                });
            }
        }

        const newArsip = await Arsip.create({
            tanggal_masuk,
            kategori,
            identitas_pelapor,
            nomor_telepon,
            sarana_pengaduan,
            sarana_pengajuan,
            permasalahan,
            permohonan,
            substansi_masalah,
            tanggal_selesai: new Date(),
            dokumentasiUrl
        });

        res.status(201).json({
            status: 'success',
            message: 'Arsip created successfully',
            isSuccess: true,
            data: newArsip
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

async function updateArsip(req, res) {
    try {
        const {id} = req.params;
        const {tanggal_masuk ,kategori, identitas_pelapor, nomor_telepon, sarana_pengaduan, sarana_pengajuan, permasalahan, permohonan, substansi_masalah, tanggal_selesai} = req.body;

        const arsip = await Arsip.findByPk(id);
        if (!arsip) {
            return res.status(404).json({
                status: 'error',
                message: 'Arsip not found',
                isSuccess: false,
                data: null
            });
        }
        
        let updateData = {
            tanggal_masuk: tanggal_masuk,
            kategori : kategori,
            identitas_pelapor: identitas_pelapor,
            nomor_telepon: nomor_telepon,
            sarana_pengaduan: sarana_pengaduan,
            sarana_pengajuan: sarana_pengajuan,
            permasalahan: permasalahan,
            permohonan: permohonan,
            substansi_masalah: substansi_masalah,
            tanggal_selesai: tanggal_selesai
        }

        if (req.file) {
            const file = req.file;
            const split = file.originalname.split('.');
            const ext = split[split.length - 1];
            
            try {
                const uploadImg = await imagekit.upload({
                    file: file.buffer,
                    fileName: `${split[0]}-${Date.now()}.${ext}`,
                });
                if (!uploadImg.url) {
                    return res.status(500).json({
                        status: 'error',
                        message: 'Image upload failed',
                        isSuccess: false,
                        data: null
                    });
                }
                updateData.dokumentasiUrl = uploadImg.url;
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Image upload error: ' + error.message,
                    isSuccess: false,
                    data: null
                });
            }
        }

        await arsip.update(updateData);
        const updatedArsip = await Arsip.findByPk(id);
        return res.status(200).json({
            status: 'success',
            message: 'Arsip updated successfully',
            isSuccess: true,
            data: updatedArsip
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function deleteArsip(req, res) {
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
        await arsip.destroy();
        return res.status(200).json({
            status: 'success',
            message: 'Arsip deleted successfully',
            isSuccess: true,
            data: null
        });
    } catch (error) {
        res.status(500).json({
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
    getAllArsipsPagination,
    createArsip,
    updateArsip,
    deleteArsip
};