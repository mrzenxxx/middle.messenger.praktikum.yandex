import Handlebars from 'handlebars';
import './Navigation.scss';
import { template } from './navigation.tmpl';

export const Navigation = () => Handlebars.compile(template)({
  className: 'navigation',
});
