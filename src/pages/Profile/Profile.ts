import Block from '../../core/Block';
import './Profile.scss';
import template from './profile.hbs?raw';
import { withStore } from '../../hocs/withStore';
import AuthController from '../../controllers/AuthController';
import { User } from '../../api/AuthAPI';

// import { user } from '../../../assets/mocks';

interface ProfileProps extends User {
  onSaveChanges : (event : Event) => void,
  onChangePassword: (event : Event) => void,
  onLogout : (event : Event) => void,
}

export class ProfilePageBase extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
      onSaveChanges: (event : Event) => {
        event.preventDefault();
        const form: Record<string, string | null> = {};
        const keys = Object.keys(this.refs);
        keys.forEach((key) => {
          form[key] = this.refs[key].value();
        });
        AuthController.getUser();
        console.table(form);
      },
      onLogout: (event : Event) => {
        event.preventDefault();
        AuthController.logout();
      },
    });
  }

  protected render(): DocumentFragment {
    AuthController.getUser();
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const Profile = withUser(ProfilePageBase);
