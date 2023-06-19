import Handlebars from "handlebars";
import './Register.scss';
import { template } from "./register.tmpl";

export const Register = () => Handlebars.compile(template)({
    className: 'register',
    title: 'Регистрация',
    primary_label: 'Зарегистрироваться',
    secondary_label: 'Уже есть аккаунт?'
});