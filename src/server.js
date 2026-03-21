import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;
// підключення до MongoDB
await connectMongoDB();
app.use(logger); // 1. Логер першим — бачить усі запити
app.use(
  express.json(
    {
      type: ['application/json', 'application/vnd.api+json'],
    },
    {
      limit: '100kb', // максимум 100 кілобайт
    },
  ),
); // 2. Парсинг JSON-тіла
app.use(cors()); // Дозволяє запити з будь-яких джерел

// підключаємо групу маршрутів усіх  нотаток
app.use(notesRoutes);
// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);
// Middleware для обробки помилок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
