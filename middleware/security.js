const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Auth rate limiter (prevents brute force login/signup)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many login/signup attempts from this IP. Please try again after 15 minutes.'
});

// General API rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});

// Helmet Security Headers with custom Content Security Policy (CSP)
const configureSecurity = (app) => {
  // Sanitize Mongo query strings against NoSQL injection
  app.use(mongoSanitize({ replaceWith: '_' }));

  // Content Security Policy setup
  const scriptSrcUrls = [
    'https://cdn.jsdelivr.net',
    'https://unpkg.com',
    'https://code.jquery.com'
  ];
  const styleSrcUrls = [
    'https://cdn.jsdelivr.net',
    'https://unpkg.com',
    'https://fonts.googleapis.com',
    'https://use.fontawesome.com',
    'https://cdnjs.cloudflare.com',
    'https://ka-f.fontawesome.com'
  ];
  const connectSrcUrls = [
    'https://*.tile.openstreetmap.org',
    'https://api.geoapify.com',
    'https://res.cloudinary.com'
  ];
  const fontSrcUrls = [
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net',
    'https://cdnjs.cloudflare.com',
    'https://ka-f.fontawesome.com'
  ];
  const imgSrcUrls = [
    '\'self\'',
    'blob:',
    'data:',
    'https://res.cloudinary.com',
    'https://images.unsplash.com',
    'https://*.tile.openstreetmap.org',
    'https://unpkg.com',
    'https://via.placeholder.com'
  ];

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ['\'self\''],
          connectSrc: ['\'self\'', ...connectSrcUrls],
          scriptSrc: ['\'unsafe-inline\'', '\'self\'', ...scriptSrcUrls],
          styleSrc: ['\'self\'', '\'unsafe-inline\'', ...styleSrcUrls],
          workerSrc: ['\'self\'', 'blob:'],
          objectSrc: [],
          imgSrc: imgSrcUrls,
          fontSrc: ['\'self\'', ...fontSrcUrls]
        }
      },
      crossOriginEmbedderPolicy: false
    })
  );
};

module.exports = {
  authLimiter,
  globalLimiter,
  configureSecurity
};
