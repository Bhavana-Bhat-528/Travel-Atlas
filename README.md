# 🌍 TravelAtlas — Community-Driven Travel Knowledge Platform

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-4.21.2-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20Ready-green.svg)](https://www.mongodb.com/cloud/atlas)
[![Deployed on Render](https://img.shields.io/badge/Render-Deployed-purple.svg)](https://render.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> **TravelAtlas** is a community-driven travel knowledge platform built to solve the frustration of scattered, fragmented travel information across blogs, forums, and video logs. Every sightseeing destination on Earth has **one single canonical page** where real travelers aggregate practical travel metrics—such as parking availability, crowd levels, best visiting seasons, ideal time spent, and food options.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Installation & Local Setup](#-installation--local-setup)
- [Environment Variables](#-environment-variables)
- [MongoDB Atlas Configuration](#-mongodb-atlas-configuration)
- [Render Deployment](#-render-deployment)
- [Project Structure](#-project-structure)
- [Usage](#-usage)

---

## 📖 Project Overview

Planning a trip today often requires opening dozens of browser tabs across maps, travel blogs, social media, and forums. Despite all that research, simple and vital questions often go unanswered:

- *Is parking actually available on-site?*
- *Is the location overwhelmed by crowds during weekends?*
- *Which season offers the best weather and visibility?*
- *Are there hygienic food stalls nearby or should you pack your own meal?*

**TravelAtlas** replaces fragmented travel blogs with structured community consensus. Instead of creating duplicate posts for the same location, TravelAtlas enforces single canonical pages per destination where travelers submit structured reviews and authentic travel tips.

---

## ✨ Features

- **Single Canonical Destination Pages**: Prevents duplicate entries using title, state, and country matching logic.
- **Structured Community Metrics**: Aggregates crowd levels, parking availability, food options, best visiting seasons, and family-friendliness into visual metrics badges.
- **Interactive Maps & Geocoding**: Integrated **Leaflet.js** map rendered on destination show and explore pages, automatically geocoded using **Geoapify API** (with built-in offline regional fallbacks).
- **Multi-Attribute Reviews & Ratings**: Travelers can rate destinations (1–5 stars), share tips, specify travel modes, and attach photos.
- **Category & Keyword Filtering**: Filter destinations across 11 categories (*Waterfalls, Mountains, Beaches, Temples, Historical Places, Adventure, Camping, Museums, Wildlife, Lakes, Road Trips*) or search by title, state, or country.
- **User Authentication & Profile Management**: Secure signup/login using **Passport.js**, featuring user bio management, custom avatars, and a personal travel contribution dashboard.
- **Robust Security Infrastructure**: Protected by **Helmet** Content Security Policy (CSP), **Express Mongo Sanitize** (NoSQL injection defense), **express-rate-limit** (brute-force protection), and **Joi** schema validation.
- **Cloudinary Image Uploads**: Seamless cover photo and review image uploads via **Multer** and Cloudinary integration (with Unsplash fallback support).

---

## 🛠️ Tech Stack

### **Backend & Core Engine**
- **Node.js** — Asynchronous JavaScript runtime
- **Express.js** — Fast, unopinionated web framework
- **EJS & EJS-Mate** — Embedded JavaScript templates with layout engine support

### **Database & Session Management**
- **MongoDB** — NoSQL document database
- **Mongoose ODM** — Schema-based modeling for MongoDB
- **connect-mongo** — MongoDB-backed session store for persistent logins

### **Authentication & Security**
- **Passport.js & Passport-Local** — Authentication middleware with username/password strategy
- **Passport-Local-Mongoose** — Mongoose plugin for secure password hashing and salting
- **Helmet** — HTTP security headers and Content Security Policy (CSP)
- **express-mongo-sanitize** — Sanitizes user inputs to prevent NoSQL query injection
- **express-rate-limit** — Rate limiting for auth and API endpoints
- **sanitize-html** — XSS protection for review and description inputs
- **Joi** — Data validation for destination and review inputs

### **Map & Geocoding Services**
- **Leaflet.js** — Interactive open-source JavaScript map library
- **Geoapify API** — Forward geocoding service with custom regional coordinate fallback dictionary
- **Axios** — Promise-based HTTP client for geocoding requests

### **Media Storage & Styling**
- **Cloudinary & Multer-Storage-Cloudinary** — Image cloud upload management
- **Bootstrap 5 & Custom CSS** — Responsive layout and glassmorphism styling
- **FontAwesome 6** — Modern icon set

---

## 🚀 How It Works

```
 ┌────────────────┐     ┌──────────────────┐     ┌──────────────────┐
 │  Landing Page  ├────►│ Explore Catalog  ├────►│  Canonical Page  │
 │  (Overview)    │     │ (Filter & Search)│     │(Stats & Map View)│
 └────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                          │
                                                 ┌────────┴─────────┐
                                                 │ Add Community    │
                                                 │ Review & Metrics │
                                                 └──────────────────┘
```

1. **Discover**: Browse top-rated sightseeing locations on the Explore page or filter by category and location keyword.
2. **Explore**: View destination details, live Leaflet map coordinates, aggregated crowd/parking badges, and traveler reviews.
3. **Contribute**: Registered users can submit new destinations or leave detailed reviews and practical tips for existing locations.
4. **Consolidate**: If a user attempts to create a duplicate location (e.g., *Taj Mahal* in *Uttar Pradesh*), TravelAtlas automatically redirects them to the existing canonical page to preserve centralized knowledge.

---

## 💻 Installation & Local Setup

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MongoDB** (Local instance running on `mongodb://127.0.0.1:27017` OR a free **MongoDB Atlas** cluster URI)

### Step-by-Step Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/TravelAtlas.git
   cd TravelAtlas
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to create a `.env` file:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` and fill in your database connection string and session secret (see below).*

4. **Seed the Database** *(Recommended for initial data)*:
   Populate MongoDB with 15 pre-configured destinations and community reviews:
   ```bash
   npm run seed
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to: `http://localhost:3000`

---

## 🔑 Environment Variables

The application reads configuration from environment variables defined in `.env`:

| Variable | Required | Description | Example / Default |
| :--- | :---: | :--- | :--- |
| `PORT` | No | Port for Express web server | `3000` |
| `MONGODB_URI` | **Yes** | Connection string for MongoDB / MongoDB Atlas | `mongodb://127.0.0.1:27017/travelatlas` |
| `SESSION_SECRET` | **Yes** | Secret string for signing session cookies | `super_secret_travelatlas_key_2026` |
| `NODE_ENV` | No | Environment mode (`development` or `production`) | `development` |
| `GEOAPIFY_API_KEY` | Optional | Geoapify API key for dynamic geocoding | `your_geoapify_key` |
| `CLOUDINARY_CLOUD_NAME` | Optional | Cloudinary cloud name for image uploads | `your_cloud_name` |
| `CLOUDINARY_KEY` | Optional | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_SECRET` | Optional | Cloudinary API secret | `your_api_secret` |

*Note: If Cloudinary or Geoapify credentials are unconfigured, TravelAtlas automatically falls back to curated Unsplash cover images and an offline coordinate lookup dictionary.*

---

## 🍃 MongoDB Atlas Configuration

To connect TravelAtlas to a cloud-hosted **MongoDB Atlas** database:

1. **Create a MongoDB Atlas Account & Cluster**:
   - Register at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a free **M0 Shared Cluster**.

2. **Configure Network Access**:
   - In MongoDB Atlas sidebar, navigate to **Network Access** under *Security*.
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) so that your Render deployment can connect seamlessly.

3. **Create Database User Credentials**:
   - Navigate to **Database Access** under *Security*.
   - Click **Add New Database User**.
   - Choose **Password** authentication, set a username and strong password, and assign **Read and write to any database** privilege.

4. **Obtain Connection String**:
   - Go to **Database** -> Click **Connect** on your cluster.
   - Choose **Drivers** (Node.js).
   - Copy the connection string format:
     ```text
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/travelatlas?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials.

5. **Set `MONGODB_URI`**:
   - Use this connection string as your `MONGODB_URI` in `.env` locally and in Render Environment settings.

---

## 🚀 Render Deployment

Deploying TravelAtlas to **Render** as a Node.js Web Service takes only a few minutes:

### Step 1: Push Code to GitHub
Ensure your repository is updated on GitHub:
```bash
git add .
git commit -m "Prepare TravelAtlas for Render deployment"
git push origin main
```

### Step 2: Create a Web Service on Render
1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> Select **Web Service**.
3. Connect your GitHub repository (`TravelAtlas`).

### Step 3: Configure Build and Start Commands
Set the service configuration as follows:

- **Name**: `travelatlas` (or your preferred app name)
- **Environment**: `Node`
- **Region**: Choose the region closest to your users
- **Branch**: `main`
- **Build Command**:
  ```bash
  npm install
  ```
- **Start Command**:
  ```bash
  node app.js
  ```
- **Instance Type**: `Free`

### Step 4: Configure Environment Variables on Render
In the **Environment** tab of your Render Web Service, add the following key-value pairs:

| Key | Value |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/travelatlas?retryWrites=true&w=majority` |
| `SESSION_SECRET` | *Generates a strong random string (e.g. `d8f92a4...`)* |
| `GEOAPIFY_API_KEY` | *(Optional) Your Geoapify key* |
| `CLOUDINARY_CLOUD_NAME` | *(Optional) Your Cloudinary Cloud Name* |
| `CLOUDINARY_KEY` | *(Optional) Your Cloudinary Key* |
| `CLOUDINARY_SECRET` | *(Optional) Your Cloudinary Secret* |

### Step 5: (Optional) Seed the Render Database
To populate your production database on MongoDB Atlas with default destinations:
- You can temporarily set the **Build Command** on Render to:
  ```bash
  npm install && node seed.js
  ```
  OR run `node seed.js` locally while `.env` points to your MongoDB Atlas connection string.

### Step 6: Deploy
Click **Create Web Service**. Render will build the app, install dependencies, connect to MongoDB Atlas, and publish your site at `https://travelatlas-xxxx.onrender.com`.

---

## 📁 Project Structure

```text
TravelAtlas/
├── config/
│   ├── cloudinary.js        # Multer & Cloudinary storage configuration
│   └── db.js                # Mongoose connection runner with database case handling
├── controllers/
│   ├── authController.js    # Login, signup, logout, and profile management handlers
│   ├── destinationController.js # Index, show, create, edit, delete & duplicate check API
│   └── reviewController.js # Add review & delete review handlers
├── middleware/
│   ├── auth.js              # Authentication check & author authorization middleware
│   ├── security.js          # Helmet CSP, Mongo sanitize & Rate limiting configuration
│   └── validate.js          # Joi schema validation middleware for forms
├── models/
│   ├── Destination.js       # Destination schema with rating sub-documents & indexes
│   ├── Review.js            # Review schema with travel metrics fields
│   └── User.js              # User schema integrated with passport-local-mongoose
├── public/
│   ├── css/
│   │   └── custom.css       # Custom styling, badges, glassmorphism & cards
│   └── js/
│       ├── map.js           # Leaflet interactive map rendering logic
│       └── validation.js    # Client-side form validation & live duplicate checker
├── routes/
│   ├── authRoutes.js        # Authentication endpoints (/signup, /login, /logout, /profile)
│   ├── destinationRoutes.js # Destination CRUD routes & check-duplicate API
│   └── reviewRoutes.js     # Review creation and deletion routes
├── utils/
│   ├── ExpressError.js      # Custom error class for HTTP status codes
│   ├── catchAsync.js        # Wrapper function to eliminate try-catch boilerplate
│   ├── geocoder.js          # Geoapify geocoder with regional fallback dictionary
│   ├── schemas.js           # Joi validation schemas for destinations & reviews
│   └── seedData.js          # Seed dataset with 15 verified destinations & reviews
├── views/
│   ├── auth/                # Login, signup, and profile view templates
│   ├── destinations/        # Landing page, explore grid, show detail, new & edit forms
│   ├── layouts/
│   │   └── boilerplate.ejs  # Master layout shell with navbar and footer
│   ├── partials/
│   │   ├── flash.ejs        # Flash message alerts partial
│   │   ├── footer.ejs       # App footer partial
│   │   └── navbar.ejs       # Responsive navigation bar partial
│   └── error.ejs            # Centralized error display view
├── .env.example             # Template for environment variables
├── app.js                   # Main application entry point & Express middleware setup
├── package.json             # NPM dependencies & scripts manifest
└── seed.js                  # Database seed script for initial user & destination data
```

---

## 💡 Usage

1. **Viewing Destinations**: Go to `/destinations` to view all available locations. Filter by categories like *Waterfalls*, *Beaches*, or *Historical Places*.
2. **Interactive Map**: Click on any destination to view its precise location on an interactive Leaflet map along with aggregated crowd level, parking, and season metrics.
3. **Checking Duplicate Locations**: When filling out the *Add Destination* form at `/destinations/new`, type a destination name to see real-time duplicate checks powered by the `/api/destinations/check-duplicate` endpoint.
4. **Submitting Reviews**: Register or log in to submit reviews. Pick travel modes (*Car, Bike, Trekking*), rate parking (*Available, Limited, Paid*), set crowd level, and add practical tips.

### 🔑 Demo User Credentials (from `npm run seed`)

You can log in using either of the pre-seeded traveler accounts:

| User | Username | Email | Password |
| :--- | :--- | :--- | :--- |
| **Traveler 1** | `jane_doe` | `janedoe@example.com` | `Password123!` |
| **Traveler 2** | `traveler_sam` | `sam@travelatlas.com` | `Password123!` |


---

## 📜 License

This project is licensed under the **ISC License**.

---

<p center>
  Made with ❤️ by the <strong>TravelAtlas Team</strong>
</p>
