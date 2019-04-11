const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}

module.exports = {
  mongoURI: process.env.MONGO_URL,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  cloudinary : {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  }
};
