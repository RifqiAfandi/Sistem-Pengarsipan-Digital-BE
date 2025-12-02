'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Arsip', [
      {
        tanggal_masuk: new Date(),
        kategori: 'Pengaduan',
        identitas_pelapor: 'Rifqi Afandi',
        nomor_telepon: "08123456789",
        sarana_pengaduan: "WhatsApp",
        sarana_pengajuan: "SIP",
        permasalahan: "Hilang",
        permohonan: "KTP",
        substansi_masalah: "Pengajuan Baru",
        tanggal_selesai: new Date(),
        dokumentasiUrl: "https://ik.imagekit.io/dispendukcapil/chatwa1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tanggal_masuk: new Date(),
        kategori: 'Permohonan',
        identitas_pelapor: 'Alya Salsabila',
        nomor_telepon: "08987654321",
        sarana_pengaduan: "Email",
        sarana_pengajuan: "SIP",
        permasalahan: "Revisi",
        permohonan: "KK",
        substansi_masalah: "Pengajuan Baru",
        tanggal_selesai: new Date(),
        dokumentasiUrl: "https://ik.imagekit.io/dispendukcapil/email1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tanggal_masuk: new Date(),
        kategori: 'Lainnya',
        identitas_pelapor: 'Budi Santoso',
        nomor_telepon: "08211234567",
        sarana_pengaduan: "Telepon",
        sarana_pengajuan: "SIP",
        permasalahan: "Hilang",
        permohonan: "KK",
        substansi_masalah: "Pengajuan Baru",
        tanggal_selesai: new Date(),
        dokumentasiUrl: "https://ik.imagekit.io/dispendukcapil/telepon1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tanggal_masuk: new Date(),
        kategori: 'Lainnya',
        identitas_pelapor: 'Muhammad Alief',
        nomor_telepon: "08211234567",
        sarana_pengaduan: "Telepon",
        sarana_pengajuan: "SIP",
        permasalahan: "Revisi",
        permohonan: "KTP",
        substansi_masalah: "Pengajuan Baru",
        tanggal_selesai: new Date(),
        dokumentasiUrl: "https://ik.imagekit.io/dispendukcapil/telepon1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Arsip', null, {});
  }
};
