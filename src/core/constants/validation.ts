export const VALIDATION_RULES : StringIndexed = {
  add_user_login: /^[A-Za-zА-ЯЁа-яё0-9_-][A-Za-zА-ЯЁа-яё0-9_-]{3,20}$/,
  first_name: /^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/,
  second_name: /^(?!.[\s])(?!^[0-9]$)[A-Za-z0-9_-]{3,20}$/,
  display_name: /^[a-zA-Zа-яА-ЯёЁ0-9!@#$%^&*()_+-[\]{}|;':",.<>/?`~ ]{1,32}$/,
  email: /^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
  login: /^[A-Za-zА-ЯЁа-яё0-9_-][A-Za-zА-ЯЁа-яё0-9_-]{3,20}$/,
  password: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
  phone: /^\+?[0-9]{10,15}$/,
  password_confirm: /^(?=.[A-Z])(?=.[0-9]).{8,40}$/,
  message: /^.+$/,
  chat_title: /^.+$/,
} as const;

export const VALIDATION_ERRORS : StringIndexed = {
  add_user_login: 'Длина от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (кроме "_" и "-")',
  login: 'Длина от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (кроме "_" и "-")',
  first_name: 'Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (кроме "-")',
  second_name: 'Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (кроме "-")',
  display_name: 'Длина до 32 символов',
  email: 'Латиница, может включать цифры и знаки "_" и "-", обязательно должна "@" и точка после неё, перед точкой обязательно должны быть буквы.',
  password: 'Длина от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
  phone: 'Длина от 10 до 15 символов, состоит из цифр, может начинается с плюса.',
  message: 'Сообщение не должно быть пустым',
  password_confirm: 'Длина от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра. Или пароли не совпадают',
  chat_title: 'Поле не должно быть пустым',
} as const;
