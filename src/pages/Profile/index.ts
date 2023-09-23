import Block from '../../core/Block';
import './Profile.scss';
import template from './profile.hbs?raw';

import { user } from '../../../assets/mocks';

type ProfileProps = Record<string, unknown>;

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
        ...props,
        user,
    })
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props)
  }
}
