import Handlebars from 'handlebars';
import { template } from './notFound.tmpl';
import './NotFound.scss';

export const NotFound = () => Handlebars.compile(template)({
  className: '.not-found',
  title: '404',
  text: 'Не туда попали',
  button: 'Назад к чатам',
});
