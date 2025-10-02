# Healthcare Backend (Node.js + Express + Sequelize)

This is the backend service for a simple healthcare application. It provides APIs for managing users, patients, doctors, and the relationships between patients and doctors.  
Built using **Node.js**, **Express**, **Sequelize (PostgreSQL ORM)**, and **JWT** authentication.

---

## 🧩 Project Overview

- **Authentication**: Registration & login using JWT (jsonwebtoken)  
- **Models**:
  - **User**: Basic user (login credentials + metadata)  
  - **Patient**: Represents a patient, associated with a user  
  - **Doctor**: Represents a doctor  
  - **PatientDoctor**: Many-to-many mapping between patients and doctors  
- **API Modules / Routes**:
  - `auth` — register, login  
  - `patients` — CRUD for patients (protected)  
  - `doctors` — CRUD for doctors (protected)  
  - `mappings` — associate patients and doctors (protected)  
- **Middleware**:
  - JWT verification / authentication  
  - Error handling  
  - Request validation (as needed)  
- **Configuration**:
  - Environment variables via `.env`  
  - Database config in `config/database.js`  
  - Sequelize models & associations in `models/`  
- **Server Entry Points**:
  - `app.js` — sets up Express, middleware, routes  
  - `server.js` — starts the HTTP server  

---

## 🛠 Setup Instructions

### Prerequisites

- Node.js  
- PostgreSQL  
- Git  

### Installation Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/yourusername/healthcare-backend.git
   cd healthcare-backend
