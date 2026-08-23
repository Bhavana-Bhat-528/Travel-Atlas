# 🌍 TravelAtlas

> **A Community-Driven Travel Knowledge Platform** for discovering destinations, exploring practical travel insights, and sharing experiences through structured community reviews.

**[Live Demo](https://travelatlas.onrender.com)**

---

## 📌 Overview

Planning a trip often means searching through travel blogs, social media, maps, and forums to find practical information about a destination.

**TravelAtlas** brings this information together into a centralized platform where each destination has a dedicated page containing community-driven travel insights, ratings, practical metrics, images, and location information.

The platform focuses on making destination information easier to discover, compare, and contribute to.

---

## ✨ Key Features

* **🗺️ Destination Discovery** — Browse and explore destinations through a centralized catalog.
* **🔎 Search & Filtering** — Search destinations and filter them by categories and location.
* **📍 Interactive Maps** — View destination locations using Leaflet.js with Geoapify-based geocoding.
* **⭐ Reviews & Ratings** — Share experiences, ratings, and practical travel tips.
* **📊 Travel Metrics** — Community-driven information such as crowd levels, parking availability, visiting season, and family-friendliness.
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
| Image Storage  | Cloudinary, Multer                                 |
| Security       | Helmet, express-mongo-sanitize, express-rate-limit |
| Validation     | Joi                                                |
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
├── controllers/         # Application logic for authentication, destinations and reviews
├── middleware/          # Authentication, security and validation middleware
├── models/              # Mongoose schemas for users, destinations and reviews
├── public/              # CSS, JavaScript and static assets
├── routes/              # Express route modules
├── utils/               # Error handling, geocoding, validation and seed utilities
├── views/               # EJS templates, layouts and partials
│
├── app.js               # Main Express application
├── seed.js              # Initial database seed script
├── package.json         # Dependencies and project scripts
└── .env.example         # Environment variable template
```

---

## ⚙️ Environment Configuration

TravelAtlas uses environment variables for external services and application configuration, including:

* MongoDB Atlas
* Session secret
* Cloudinary
* Geoapify

A `.env` file is used for local development, while production configuration is managed through the deployment environment.

**Never commit actual credentials or secrets to the repository.**

---

## 🚀 Deployment

TravelAtlas is deployed as a Node.js web service on **Render** and uses **MongoDB Atlas** for persistent database storage.

---

## 🔮 Future Improvements

* **Destination Bookmarks & Travel Lists** — Allow users to save destinations and organize personal travel plans.
* **Helpful Votes** — Let the community upvote useful reviews and travel tips.
* **Weather Integration** — Display destination-specific weather information.
* **Advanced Filters** — Add filtering based on accessibility, budget, and trip duration.
* **Personalized Recommendations** — Suggest destinations based on user interests and activity.

