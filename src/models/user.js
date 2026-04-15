import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true, // прибирає пробіли на початку та в кінці
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
// username — необов’язкове поле. За замовчуванням воно дорівнює email користувача. У майбутньому користувач зможе змінити ім’я у профілі.
userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
});
//Оскільки ми використовуємо this (посилання на поточний документ), функція не може бути стрілковою.
// Перевизначаємо метод toJSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = model('User', userSchema);
