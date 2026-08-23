const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
  process.env.CLOUDINARY_KEY &&
  process.env.CLOUDINARY_KEY !== "your_api_key" &&
  process.env.CLOUDINARY_SECRET &&
  process.env.CLOUDINARY_SECRET !== "your_api_secret"
);

// Local storage directory setup
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Disk storage engine to guarantee local saving, with cloud sync attempt
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const filename = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  }
});

class SafeCloudinaryStorage {
  _handleFile(req, file, cb) {
    diskStorage._handleFile(req, file, (err, localFile) => {
      if (err) return cb(err);

      if (isCloudinaryConfigured) {
        cloudinary.uploader.upload(
          localFile.path,
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              const errorMsg = error.message || (typeof error === 'object' ? JSON.stringify(error) : error);
              console.warn(`[Cloudinary Warning] Upload failed: ${errorMsg}. Falling back to local file: /uploads/${localFile.filename}`);
              // Graceful fallback: return local file path so app continues working normally
              return cb(null, {
                filename: localFile.filename,
                path: `/uploads/${localFile.filename}`,
                size: localFile.size
              });
            }

            // Success! Delete local temporary file since it's uploaded to Cloudinary
            fs.unlink(localFile.path, () => { });

            cb(null, {
              filename: result.public_id,
              path: result.secure_url,
              size: result.bytes
            });
          }
        );
      } else {
        cb(null, {
          filename: localFile.filename,
          path: `/uploads/${localFile.filename}`,
          size: localFile.size
        });
      }
    });
  }

  _removeFile(req, file, cb) {
    if (file.path && !file.path.startsWith("http")) {
      const relativePath = file.path.startsWith("/") ? file.path.slice(1) : file.path;
      const fullPath = path.join(__dirname, "..", "public", relativePath);
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, () => cb(null));
        return;
      }
    }
    cb(null);
  }
}

const storage = new SafeCloudinaryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

const getFileUrl = (file) => {
  if (!file) return null;
  if (file.path && file.path.startsWith('http')) return file.path;
  if (file.secure_url) return file.secure_url;
  if (file.url) return file.url;
  if (file.filename) return `/uploads/${file.filename}`;
  return null;
};

const getFileName = (file) => {
  if (!file) return null;
  if (file.filename) return file.filename;
  if (file.public_id) return file.public_id;
  return 'file';
};

module.exports = {
  cloudinary,
  storage,
  upload,
  isCloudinaryConfigured,
  getFileUrl,
  getFileName
};