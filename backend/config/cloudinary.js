const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Cloudinary ko aap ke .env credentials ke sath connect karna
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Storage set up karna ke files Cloudinary par kis folder me save hon
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'todo_app_uploads', // Cloudinary dashboard par is naam ka folder khud ban jayega
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Jo formats aap allow karna chahte hain
  },
});

// 3. Multer parser banana jo routes me as a middleware use hoga
const upload = multer({ storage: storage });

// In sab ko export karna taake routes me use ho sakein
module.exports = { cloudinary, storage, upload };