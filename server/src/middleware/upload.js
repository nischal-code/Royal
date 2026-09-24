import multer from 'multer';

const MAX_FILE_MB = 8;
const MAX_FILES = 15;

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed for reference uploads.'));
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_MB * 1024 * 1024,
    files: MAX_FILES,
  },
});
