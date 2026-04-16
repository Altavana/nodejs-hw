import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'), false);
    }
  },
});
// Варіанти виклику cb:

// cb(null, true) - файл дозволено (приймаємо);
// cb(null, false) - файл відхилено без помилки;
// cb(new Error('...')) - файл відхилено з помилкою, обробка переривається.
