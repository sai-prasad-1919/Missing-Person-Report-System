const cloudinary = require('cloudinary').v2;

const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME || '').trim();
const apiKey = (process.env.CLOUDINARY_API_KEY || process.env.CLOUD_API_KEY || '').trim();
const apiSecret = (process.env.CLOUDINARY_API_SECRET || process.env.CLOUD_API_SECRET || '').trim();

if (!cloudName || !apiKey || !apiSecret) {
	throw new Error('Missing Cloudinary environment variables. Set CLOUD_NAME, CLOUD_API_KEY, and CLOUD_API_SECRET (or CLOUDINARY_* equivalents).');
}

cloudinary.config({
	cloud_name: cloudName,
	api_key: apiKey,
	api_secret: apiSecret
});

module.exports = cloudinary;
