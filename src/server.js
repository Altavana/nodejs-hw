import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;

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
app.use(cookieParser());
// підключаємо групу маршрутів усіх  нотаток
app.use(notesRoutes);
app.use(authRoutes);
app.use(userRoutes);
// Middleware 404 (після всіх маршрутів)
app.use(notFoundHandler);
// обробка помилок від celebrate (валідація)
app.use(errors());
// Middleware для обробки помилок,глобальна обробка інших помилок
app.use(errorHandler);
// підключення до MongoDB
await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
