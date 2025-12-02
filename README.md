# Sistem Pengarsipan Digital - Backend API

A robust backend REST API for digital archiving system built with Node.js and Express.js. This application provides comprehensive document management with secure authentication, file upload capabilities, and PostgreSQL database integration.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Token)
- **File Storage:** ImageKit
- **File Upload:** Multer
- **Password Hashing:** bcrypt
- **View Engine:** EJS with Express-EJS-Layouts
- **Other Libraries:**
  - `cors` - Cross-Origin Resource Sharing
  - `dotenv` - Environment variables management
  - `morgan` - HTTP request logger
  - `pg` & `pg-hstore` - PostgreSQL client

## ✨ Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Token-based access control
  
- 📁 **Digital Archive Management**
  - Create, read, update, and delete archives
  - File upload with ImageKit integration
  - Archive metadata tracking (category, reporter identity, contact info)
  - Pagination support for large datasets
  
- 👥 **User Management**
  - User login and logout
  - User profile retrieval
  - Protected routes with middleware

- 🛡️ **Security**
  - Authentication middleware
  - Password encryption
  - Secure token verification

- 📊 **API Features**
  - RESTful API architecture
  - Consistent response format
  - Error handling middleware
  - Request logging

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn** package manager
- **ImageKit account** (for file uploads)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RifqiAfandi/Sistem-Pengarsipan-Digital-BE.git
   cd Sistem-Pengarsipan-Digital-BE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables) section)

4. **Set up the database**
   
   See [Database Setup](#-database-setup) section below

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database Configuration
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=sistem_pengarsipan_db
DB_HOST=localhost
DB_PORT=5432

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# Environment
NODE_ENV=development
```

## 🗄️ Database Setup

1. **Create PostgreSQL database**
   ```bash
   createdb sistem_pengarsipan_db
   ```
   
   Or using PostgreSQL shell:
   ```sql
   CREATE DATABASE sistem_pengarsipan_db;
   ```

2. **Run migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

3. **Seed database with demo data** (optional)
   ```bash
   npx sequelize-cli db:seed:all
   ```

### Available Migrations

- `20251128123913-create-users.js` - Creates users table
- `20251128125737-create-arsip.js` - Creates arsip (archive) table

### Available Seeders

- `20251202162857-demo-users.js` - Seeds demo user accounts
- `20251202163646-demo-arsip.js` - Seeds demo archive records

## ▶️ Running the Application

### Development Mode

```bash
npm start
```

Or with nodemon for auto-restart:

```bash
npm install -g nodemon
nodemon bin/www
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`)

### Production Mode

```bash
NODE_ENV=production node bin/www
```

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Response Format

All API responses follow this standard format:

```json
{
  "status": "success" | "error",
  "message": "Response message",
  "isSuccess": true | false,
  "data": {} | [] | null
}
```

---

### 🔐 Authentication Endpoints

#### 1. Login

**POST** `/api/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "isSuccess": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "nama": "Administrator",
      "username": "admin"
    }
  }
}
```

**Error Response (401):**
```json
{
  "status": "error",
  "message": "Invalid username or password",
  "isSuccess": false,
  "data": null
}
```

---

#### 2. Logout

**POST** `/api/logout`

🔒 **Requires Authentication**

Logout user and clear cookies.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Logout successful",
  "isSuccess": true,
  "data": null
}
```

---

### 👥 User Management Endpoints

#### 3. Get All Users

**GET** `/api/users`

🔒 **Requires Authentication**

Retrieve all users.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Users retrieved successfully",
  "isSuccess": true,
  "data": [
    {
      "id": 1,
      "nama": "Administrator",
      "username": "admin"
    },
    {
      "id": 2,
      "nama": "John Doe",
      "username": "johndoe"
    }
  ]
}
```

---

#### 4. Get User by ID

**GET** `/api/users/:id`

🔒 **Requires Authentication**

Retrieve specific user by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (integer) - User ID

**Success Response (200):**
```json
{
  "status": "success",
  "message": "User retrieved successfully",
  "isSuccess": true,
  "data": {
    "id": 1,
    "nama": "Administrator",
    "username": "admin"
  }
}
```

**Error Response (404):**
```json
{
  "status": "error",
  "message": "User not found",
  "isSuccess": false,
  "data": null
}
```

---

### 📁 Archive (Arsip) Endpoints

#### 5. Create Archive

**POST** `/api/arsip`

🔒 **Requires Authentication**

Create a new archive with optional file upload.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
kategori: "Pengaduan"
identitas_pelapor: "John Doe"
nomor_telepon: "081234567890"
sarana_pengaduan: "Email"
sarana_pengajuan: "Website"
permasalahan: "Masalah teknis pada sistem"
permohonan: "Perbaikan sistem"
substansi_masalah: "Detail permasalahan..."
file: [file upload] (optional)
```

**Success Response (201):**
```json
{
  "status": "success",
  "message": "Arsip created successfully",
  "isSuccess": true,
  "data": {
    "id": 1,
    "tanggal_masuk": "2025-12-03T00:00:00.000Z",
    "kategori": "Pengaduan",
    "identitas_pelapor": "John Doe",
    "nomor_telepon": "081234567890",
    "sarana_pengaduan": "Email",
    "sarana_pengajuan": "Website",
    "permasalahan": "Masalah teknis pada sistem",
    "permohonan": "Perbaikan sistem",
    "substansi_masalah": "Detail permasalahan...",
    "dokumentasiUrl": "https://ik.imagekit.io/...",
    "createdAt": "2025-12-03T10:00:00.000Z",
    "updatedAt": "2025-12-03T10:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "status": "error",
  "message": "All fields are required",
  "isSuccess": false,
  "data": null
}
```

---

#### 6. Get All Archives

**GET** `/api/arsip`

🔒 **Requires Authentication**

Retrieve all archives.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Fetched all arsips successfully",
  "isSuccess": true,
  "data": [
    {
      "id": 1,
      "tanggal_masuk": "2025-12-03T00:00:00.000Z",
      "kategori": "Pengaduan",
      "identitas_pelapor": "John Doe",
      "nomor_telepon": "081234567890",
      "sarana_pengaduan": "Email",
      "sarana_pengajuan": "Website",
      "permasalahan": "Masalah teknis pada sistem",
      "permohonan": "Perbaikan sistem",
      "substansi_masalah": "Detail permasalahan...",
      "tanggal_selesai": null,
      "dokumentasiUrl": "https://ik.imagekit.io/..."
    }
  ]
}
```

---

#### 7. Get Archive by ID

**GET** `/api/arsip/:id`

🔒 **Requires Authentication**

Retrieve specific archive by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (integer) - Archive ID

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Arsip retrieved successfully",
  "isSuccess": true,
  "data": {
    "id": 1,
    "tanggal_masuk": "2025-12-03T00:00:00.000Z",
    "kategori": "Pengaduan",
    "identitas_pelapor": "John Doe",
    "nomor_telepon": "081234567890",
    "sarana_pengaduan": "Email",
    "sarana_pengajuan": "Website",
    "permasalahan": "Masalah teknis pada sistem",
    "permohonan": "Perbaikan sistem",
    "substansi_masalah": "Detail permasalahan...",
    "tanggal_selesai": null,
    "dokumentasiUrl": "https://ik.imagekit.io/..."
  }
}
```

**Error Response (404):**
```json
{
  "status": "error",
  "message": "Arsip not found",
  "isSuccess": false,
  "data": null
}
```

---

#### 8. Update Archive

**PUT** `/api/arsip/:id`

🔒 **Requires Authentication**

Update existing archive with optional file upload.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**URL Parameters:**
- `id` (integer) - Archive ID

**Request Body (Form Data):**
```
kategori: "Pengaduan" (optional)
identitas_pelapor: "John Doe" (optional)
nomor_telepon: "081234567890" (optional)
sarana_pengaduan: "Email" (optional)
sarana_pengajuan: "Website" (optional)
permasalahan: "Masalah teknis pada sistem" (optional)
permohonan: "Perbaikan sistem" (optional)
substansi_masalah: "Detail permasalahan..." (optional)
file: [file upload] (optional)
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Arsip updated successfully",
  "isSuccess": true,
  "data": {
    "id": 1,
    "tanggal_masuk": "2025-12-03T00:00:00.000Z",
    "kategori": "Pengaduan",
    "identitas_pelapor": "John Doe Updated",
    "nomor_telepon": "081234567890",
    "dokumentasiUrl": "https://ik.imagekit.io/...",
    "updatedAt": "2025-12-03T11:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "status": "error",
  "message": "Arsip not found",
  "isSuccess": false,
  "data": null
}
```

---

#### 9. Delete Archive

**DELETE** `/api/arsip/:id`

🔒 **Requires Authentication**

Delete specific archive by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` (integer) - Archive ID

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Arsip deleted successfully",
  "isSuccess": true,
  "data": null
}
```

**Error Response (404):**
```json
{
  "status": "error",
  "message": "Arsip not found",
  "isSuccess": false,
  "data": null
}
```

---

### 📄 Pagination Support

The archive endpoints also support pagination (available in controller):

**GET** `/api/arsip?page=1&limit=10`

**Query Parameters:**
- `page` (integer) - Page number (default: 1)
- `limit` (integer) - Items per page (default: 10)

**Success Response:**
```json
{
  "status": "success",
  "message": "Fetched arsips with pagination successfully",
  "isSuccess": true,
  "data": {
    "totalItems": 50,
    "totalPages": 5,
    "currentPage": 1,
    "arsips": [...]
  }
}
```

---

## 📁 Project Structure

```
Sistem-Pengarsipan-Digital-BE/
│
├── bin/
│   └── www                          # Server entry point
│
├── config/
│   └── database.js                  # Sequelize database configuration
│
├── controllers/
│   ├── arsipController.js           # Archive CRUD operations
│   └── authController.js            # Authentication & user management
│
├── lib/
│   └── imagekit.js                  # ImageKit SDK configuration
│
├── middlewares/
│   ├── authMiddleware.js            # JWT authentication middleware
│   └── uploader.js                  # Multer file upload middleware
│
├── migrations/
│   ├── 20251128123913-create-users.js
│   └── 20251128125737-create-arsip.js
│
├── models/
│   ├── index.js                     # Sequelize models initialization
│   ├── users.js                     # Users model
│   └── arsip.js                     # Arsip (Archive) model
│
├── routes/
│   ├── index.js                     # Main router
│   ├── authRoute.js                 # Authentication routes
│   └── arsipRoute.js                # Archive routes
│
├── seeders/
│   ├── 20251202162857-demo-users.js
│   └── 20251202163646-demo-arsip.js
│
├── .env                             # Environment variables (not in repo)
├── .gitignore                       # Git ignore file
├── index.js                         # Express app configuration
├── package.json                     # Project dependencies
└── README.md                        # Project documentation
```

## 🗃️ Database Schema

### Users Table

| Column    | Type    | Constraints                 |
|-----------|---------|-----------------------------|
| id        | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| nama      | STRING  |                             |
| username  | STRING  | UNIQUE, NOT NULL            |
| password  | STRING  | NOT NULL (hashed)           |
| createdAt | DATE    |                             |
| updatedAt | DATE    |                             |

### Arsip Table

| Column              | Type    | Constraints                 |
|---------------------|---------|-----------------------------|
| id                  | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| tanggal_masuk       | DATE    |                             |
| kategori            | STRING  |                             |
| identitas_pelapor   | STRING  |                             |
| nomor_telepon       | STRING  |                             |
| sarana_pengaduan    | STRING  |                             |
| sarana_pengajuan    | STRING  |                             |
| permasalahan        | STRING  |                             |
| permohonan          | STRING  |                             |
| substansi_masalah   | STRING  |                             |
| tanggal_selesai     | DATE    |                             |
| dokumentasiUrl      | TEXT    |                             |
| createdAt           | DATE    |                             |
| updatedAt           | DATE    |                             |


### Example with cURL:

```bash
# Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'

# Get all archives (with token)
curl -X GET http://localhost:5000/api/arsip \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rifqi Afandi**

- GitHub: [@RifqiAfandi](https://github.com/RifqiAfandi)
- Repository: [Sistem-Pengarsipan-Digital-BE](https://github.com/RifqiAfandi/Sistem-Pengarsipan-Digital-BE)

## 🙏 Acknowledgments

- Express.js for the excellent web framework
- Sequelize for powerful ORM capabilities
- ImageKit for reliable file storage
- PostgreSQL for robust database solution

---

**Made with ❤️ by Rifqi Afandi**