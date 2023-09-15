import Block from '../../utils/Block';
import './Profile.scss';
import template from './profile.hbs?raw';

type ProfileProps = Record<string, unknown>;

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
        ...props,
        className: 'profile',
        nickname: 'Mr.BIG',
        image: 'static/img/mock_image.jpg',
        button_1_label: 'Изменить данные',
        button_2_label: 'Изменить пароль',
        button_3_label: 'Выйти',
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
