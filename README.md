# Solvify Technologies — Official Website

**Production-quality website for Solvify Technologies Pvt. Ltd.**

Stack: React + Vite + Tailwind CSS (frontend) · Node.js + Express + MongoDB (backend)

---

## Project Structure

```
solvify/
├── backend/
│   ├── controllers/
│   │   ├── leadController.js
│   │   └── mediaController.js
│   ├── models/
│   │   ├── Lead.js
│   │   └── Media.js
│   ├── routes/
│   │   ├── leadRoutes.js
│   │   └── mediaRoutes.js
│   ├── updates/
│   │   ├── quickturf logo
│   │   ├── solvify logo
│   │   └── STC logo       
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── Join.jsx
    │   │   └── Admin.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

---

### 1. Backend Setup

```bash
cd solvify/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your values:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/solvify
# ADMIN_PASSWORD=solvify@admin2024

# Create uploads folder
mkdir -p uploads

# Start development server
npm run dev
```

Backend runs on: **http://localhost:5000**

---

### 2. Frontend Setup

```bash
cd solvify/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

> The Vite proxy config in `vite.config.js` forwards `/api` and `/uploads` requests to the backend automatically — no CORS issues in development.

---

### 3. MongoDB Setup (Local)

```bash
# Install MongoDB on Ubuntu/macOS then start:
mongod --dbpath /data/db

# Or use MongoDB Atlas (cloud):
# Replace MONGODB_URI in .env with your Atlas connection string
# mongodb+srv://<user>:<password>@cluster.mongodb.net/solvify
```

---

## API Reference

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Submit a new lead |
| GET | `/api/leads` | Get all leads (supports `?role=&city=&page=&limit=`) |
| DELETE | `/api/leads/:id` | Delete a lead |

**POST /api/leads — Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "city": "Hyderabad",
  "role": "Turf Owner",
  "turfName": "Green Park Turf",
  "location": "Banjara Hills",
  "interest": "",
  "message": "Looking forward to listing my turf."
}
```

### Media

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/media/upload` | Upload an image (multipart/form-data) |
| GET | `/api/media` | Get all media (supports `?type=logo\|partner\|turf\|product`) |
| DELETE | `/api/media/:id` | Delete media |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page — Hero, About, Products, How We Build, Impact, CTA |
| `/products` | Products detail — QuickTurf & STC deep dives |
| `/join` | Lead capture form with conditional fields per role |
| `/admin` | Admin panel — view leads, manage media, upload images |

---

## Admin Panel

Access at: **http://localhost:5173/admin**

Default password: `solvify@admin2024`

> ⚠️ Change the password in `frontend/src/pages/Admin.jsx` and move to a JWT-based auth system before deploying to production.

**Admin features:**
- View all submitted leads with role/city filter
- Delete individual leads
- Upload partner logos, company logo, turf images, product visuals
- View and delete uploaded media

---

## Design System

| Token | Value |
|-------|-------|
| Primary Green | `#1DB954` |
| Dark Background | `#0a0a0a` |
| Card Background | `#161616` |
| Charcoal | `#111111` |
| Border | `#222222` |
| Muted Text | `#888888` |
| Display Font | Cabinet Grotesk |
| Body Font | Satoshi |
| Mono Font | JetBrains Mono |

---

## Production Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy the `dist/` folder
# Set environment variable: VITE_API_URL=https://your-api.com
```

Update `vite.config.js` proxy target to your production API URL, or use `axios.defaults.baseURL` set from `import.meta.env.VITE_API_URL`.

### Backend (Railway / Render / VPS)
```bash
cd backend
npm install
npm start

# Set environment variables on your platform:
# PORT, MONGODB_URI, NODE_ENV=production
```

For file uploads in production, replace the local `uploads/` folder with **AWS S3** or **Cloudinary** using `multer-s3` or `multer-storage-cloudinary`.

---

## Customization

- **Logo**: Upload via Admin Panel → Upload tab → type: "logo"
- **Partner logos**: Upload via Admin Panel → type: "partner" — appears on Home page
- **Turf images**: Upload via Admin Panel → type: "turf" — appears on Products page
- **Admin password**: Change in `frontend/src/pages/Admin.jsx` line 7
- **Company email**: Update in `frontend/src/components/Footer.jsx`
- **CIN number**: Update in `frontend/src/components/Footer.jsx`

---

## License

© 2024 Solvify Technologies Pvt. Ltd. All rights reserved.
