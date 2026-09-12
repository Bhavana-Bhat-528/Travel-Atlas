# 🌍 TravelAtlas

> **A Community-Driven Travel Knowledge Platform** for discovering destinations, exploring practical travel insights, and sharing experiences through structured community reviews.

**[Live Demo](https://travelatlas.onrender.com)**

---

## 📌 Overview

Planning a trip often means searching through travel blogs, social media, maps, and forums to find practical information about a destination.

**TravelAtlas** brings this information together into a centralized platform where each destination has a dedicated page containing community-driven travel insights, ratings, practical metrics, images, and location information.

The platform focuses on making destination information easier to discover, compare, and contribute to.

---

## 📸 Screenshots

### 🏠 Landing Page

The TravelAtlas landing page introduces the platform and provides quick access to destination discovery and community participation.

![TravelAtlas Landing Page](screenshots/landing-page.png)

---

### 🌍 Explore Destinations

Browse destinations through a centralized catalog with destination categories, ratings, locations, reviews, and quick access to individual destination pages.

![Explore Destinations](screenshots/explore-destinations.png)

---

### 📍 Destination Details

Each destination has a single dedicated page containing its core information, rating, category, location, and community-driven travel insights.

![Destination Details](screenshots/destination-details.png)

---

### 🤝 Community Insights, Map & Weather

The destination page brings together practical travel information, an interactive map, live weather information, and a form for users to contribute their own travel experiences.

![Community Insights and Weather](screenshots/destination-contribution.png)

---

### 👤 User Profile

Users can manage their profiles and view destinations they have added and reviews they have written.

![User Profile](screenshots/profile.png)

---

### ➕ Add a Destination

Authenticated users can contribute new sightseeing destinations to the TravelAtlas community.

![Add New Destination](screenshots/add-destination.png)


## ✨ Key Features

* **🗺️ Destination Discovery** — Browse and explore destinations through a centralized catalog.
* **🔎 Search & Filtering** — Search destinations and filter them by categories and location.
* **📍 Interactive Maps** — View destination locations using Leaflet.js with Geoapify-based geocoding.
* **⭐ Reviews & Ratings** — Share experiences, ratings, and practical travel tips.
* **📊 Travel Metrics** — Community-driven information such as crowd levels, parking availability, visiting season, and family-friendliness.
- **🌦️ Live Weather Information** — View destination-specific current weather information including temperature, feels-like temperature, humidity, wind speed, and weather conditions using the Open-Meteo API.
* **👤 User Authentication & Profiles** — User registration, login, profile management, and contribution tracking.
* **🖼️ Image Uploads** — Upload destination and review images using Cloudinary.
* **🛡️ Security & Validation** — Authentication, request validation, rate limiting, security headers, and input sanitization.
* **🔄 Duplicate Prevention** — Helps prevent duplicate destination entries and keeps destination information centralized.
* **📱 Responsive UI** — Built with Bootstrap and custom CSS for responsive usage across devices.

---

## 🛠️ Tech Stack

| Category       | Technologies                                       |
| -------------- | -------------------------------------------------- |
| Backend        | Node.js, Express.js                                |
| Templating     | EJS, EJS-Mate                                      |
| Frontend       | Bootstrap 5, Custom CSS, JavaScript                |
| Database       | MongoDB Atlas, Mongoose                            |
| Authentication | Passport.js, Passport-Local-Mongoose               |
| Maps           | Leaflet.js                                         |
| Geocoding      | Geoapify API, Axios                                |
| Weather API    | Open-Meteo API                                     |
| Image Storage  | Cloudinary, Multer                                 |
| Security       | Helmet, express-mongo-sanitize, express-rate-limit |
| Deployment     | Render                                             |

---

## 🔄 How It Works

```text
┌─────────────────┐
│   Discover      │
│  Destinations   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Explore     │
│ Search & Filter │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Destination   │
│      Page       │
│ Map • Metrics   │
│ Reviews • Tips  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Contribute   │
│ Reviews & New   │
│   Destinations  │
└─────────────────┘
```

1. **Discover** — Browse destinations through the main catalog.
2. **Explore** — Search and filter destinations based on category or location.
3. **View** — Open a destination page to see its details, map, travel metrics, ratings, and reviews.
4. **Contribute** — Authenticated users can add destinations and share reviews and travel tips.
5. **Consolidate** — Duplicate destination checks help keep information organized around a single destination page.

---

## 📁 Project Structure

```text
TravelAtlas/
│
├── config/              # Database and Cloudinary configuration
├── controllers/         # Application logic
├── middleware/          # Authentication, security and validation middleware
├── models/              # Mongoose schemas
├── public/              # CSS, JavaScript and static assets
├── routes/              # Express route modules
├── utils/               # Error handling, geocoding, weather and utilities
├── views/               # EJS templates, layouts and partials
├── screenshots/         # README project screenshots
│
├── app.js               # Main Express application
├── seed.js              # Initial database seed script
├── package.json         # Dependencies and project scripts
└── .env.example         # Environment variable template
```

---
## 🗄️ Database

TravelAtlas uses **MongoDB Atlas** as its persistent database with **Mongoose** for data modeling and database interaction.

The application stores its core application data in MongoDB Atlas, including destination, user, and review-related data.

The project also includes a `seed.js` script for populating the database with initial destination data.

---

## ⚙️ Environment Configuration

TravelAtlas uses environment variables for external services and application configuration, including:

- MongoDB Atlas
- Session secret
- Cloudinary
- Geoapify
- Open-Meteo weather service configuration, where applicable

A `.env` file is used for local development, while production configuration is managed through the deployment environment.

**Never commit actual credentials or secrets to the repository.**

---

## 🔐 Security

TravelAtlas incorporates several security and validation measures, including:

- Authentication and authorization
- Request validation
- Input sanitization
- Secure HTTP headers using Helmet
- Rate limiting
- MongoDB query sanitization
- Environment-based secret management
- Server-side handling of external API requests

---

## 👥 Community-Driven Approach

TravelAtlas is designed around the idea of bringing practical travel knowledge together on a **single canonical page for each destination**.

Instead of requiring travelers to search through multiple sources for different pieces of information, a destination page brings together:

- Destination information
- Community ratings
- Practical travel metrics
- Travel experiences
- Location information
- Interactive maps
- Current weather information
- Images

This allows travelers to discover destinations and access practical community knowledge in one place.

---

## 🚀 Deployment

TravelAtlas is deployed as a Node.js web service on **Render** and uses **MongoDB Atlas** for persistent database storage.

The application is configured to use environment variables for production services and credentials.

**Live Demo:**  
https://travelatlas.onrender.com

---



