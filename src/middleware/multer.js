import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    if (allowedTypes.includes(file.mimetype)) {
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
