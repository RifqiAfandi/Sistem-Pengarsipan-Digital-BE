'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Arsips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal_masuk: {
        type: Sequelize.DATE
      },
      kategori: {
        type: Sequelize.STRING
      },
      identitas_pelapor: {
        type: Sequelize.STRING
      },
      nomor_telepon: {
        type: Sequelize.STRING
      },
      sarana_pengaduan: {
        type: Sequelize.STRING
      },
      sarana_pengajuan: {
        type: Sequelize.STRING
      },
      permasalahan: {
        type: Sequelize.STRING
      },
      permohonan: {
        type: Sequelize.STRING
      },
      substansi_masalah: {
        type: Sequelize.STRING
      },
      tanggal_selesai: {
        type: Sequelize.DATE
      },
      dokumentasiUrl: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Arsips');
  }
};