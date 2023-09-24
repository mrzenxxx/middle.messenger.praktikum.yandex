export const VALIDATION_RULES : Record<string, RegExp> =  {
    first_name : /^[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё-]*$/,
    second_name : /^(?!.[\s])(?!^[0-9]$)[A-Za-z0-9_-]{3,20}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/,
    password: /^(?=.[A-Z])(?=.[0-9]).{8,40}$/,
    phone: /^[0-9]{10,15}$/,
    password_confirm: /^(?=.[A-Z])(?=.[0-9]).{8,40}$/,
    message: /.+/,
}

export const VALIDATION_ERRORS : Record<string, string> = {
    first_name : "Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (кроме -)",
    second_name : "Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (кроме -)",
    email: "Длина от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (кроме _ и - )",
    password: "Длина от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
    phone: "Длина от 10 до 15 символов, состоит из цифр, может начинается с плюса.",
    message: "Сообщение не должно быть пустым",
    password_confirm: "Пароли не совпадают",
}

export function validate(field: HTMLInputElement) : string {
    if (!VALIDATION_RULES[field.name].test(field.value)){
        return VALIDATION_ERRORS[field.name];
    } else {
        return '';
    };
}
