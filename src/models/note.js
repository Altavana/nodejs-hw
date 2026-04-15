import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // прибирає пробіли на початку та в кінці
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      default: 'Todo',
      enum: TAGS,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
// Додаємо текстовий індекс: кажемо MongoDB, що по полю name можна робити $text
noteSchema.index(
  { title: 'text', content: 'text' },
  {
    name: 'notesTextIndex',
    weights: { title: 10, content: 5 },
    default_language: 'english',
  },
);
export const Note = model('Note', noteSchema);
// Колекція нотаток

// Розширте модель Note обов’язковим полем userId (тип ObjectId, посилання на модель User).

// Оновіть усі контролери колекції нотаток:

// createNote — при створенні додавайте userId з req.user._id;
// getAllNotes — повертайте лише нотатки, що належать поточному користувачу. Зверніть увагу, що метод findById тепер не підійде;
// getNoteById — шукайте нотатку за _id, яка належить поточному користувачу;
// updateNote — оновлювати можна лише нотатку, яка належить поточному користувачу;
// deleteNote — видаляти можна лише нотатку, яка належить поточному користувачу.

// Якщо нотатку не знайдено (бо вона не існує або належить іншому користувачу) — повертати через createHttpError помилку зі статусом 404 і повідомлення 'Note not found'.
