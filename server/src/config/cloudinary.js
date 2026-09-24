import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a single in-memory file buffer (from multer's memoryStorage) to
 * Cloudinary and resolve with { url, publicId, width, height, bytes }.
 */
export function uploadBufferToCloudinary(buffer, { folder, filename } = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder || process.env.CLOUDINARY_FOLDER || 'royal-wedding/references',
        resource_type: 'image',
        filename_override: filename,
        use_filename: Boolean(filename),
        unique_filename: true,
        overwrite: false,
        // Keep uploads reasonably sized — reference photos don't need to be huge.
        transformation: [{ width: 2000, height: 2000, crop: 'limit', quality: 'auto:good' }],
      },
      (err, result) => {
        if (err) return reject(err);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
        });
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

export function uploadManyBuffersToCloudinary(files, opts) {
  return Promise.all(files.map((f) => 
    uploadBufferToCloudinary(f.buffer, { ...opts, filename: f.originalname })
  ));
}

export default cloudinary;
