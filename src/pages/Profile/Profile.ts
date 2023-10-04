import Block from '../../core/Block';
import './Profile.scss';
import template from './profile.hbs?raw';
import store from '../../core/Store';

import { user } from '../../../assets/mocks';

type ProfileProps = Record<string, unknown>;

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
      user,
      onSaveChanges: (event : Event) => {
        event.preventDefault();
        const form: Record<string, string | null> = {};
        const keys = Object.keys(this.refs);
        keys.forEach((key) => {
          form[key] = this.refs[key].value();
        });
        console.table(form);
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
