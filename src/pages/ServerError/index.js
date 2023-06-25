import Handlebars from "handlebars";
import { template } from "./serverError.tmpl";
import './serverError.scss';

export const ServerError = () => Handlebars.compile(template)({
    className: 'server_error',
    title: '500',
    text: 'Ошибка на сервере',
    button: 'Назад к чатам'
});
