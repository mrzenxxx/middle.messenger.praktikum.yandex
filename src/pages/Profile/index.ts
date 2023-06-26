import Handlebars from 'handlebars';
import './Profile.scss';
import { template } from './profile.tmpl';

export const Profile = () => Handlebars.compile(template)({
  className: 'profile',
  nickname: 'Mr.BIG',
  image: 'static/img/mock_image.jpg',
  button_1_label: 'Изменить данные',
  button_2_label: 'Изменить пароль',
  button_3_label: 'Выйти',
});
