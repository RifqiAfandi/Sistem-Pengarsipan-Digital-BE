'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arsip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Arsip.init({
    tanggal_masuk: DataTypes.DATE,
    kategori: DataTypes.STRING,
    identitas_pelapor: DataTypes.STRING,
    nomor_telepon: DataTypes.STRING,
    sarana_pengaduan: DataTypes.STRING,
    sarana_pengajuan: DataTypes.STRING,
    permasalahan: DataTypes.STRING,
    permohonan: DataTypes.STRING,
    substansi_masalah: DataTypes.STRING,
    tanggal_selesai: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Arsip',
  });
  return Arsip;
};