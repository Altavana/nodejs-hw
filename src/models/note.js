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
