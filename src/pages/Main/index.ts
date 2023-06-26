import Handlebars from 'handlebars';
import { template } from './main.tmpl';
import './Main.scss';

export const Main = () => Handlebars.compile(template)({
  className: 'main_page',
  chatName: 'Заглушка списка чатов',
  chatMessage: 'Заглушка окна чата',
});
