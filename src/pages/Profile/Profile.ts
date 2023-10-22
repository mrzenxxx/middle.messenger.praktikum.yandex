import Block from '../../core/Block';
import './Profile.scss';
import template from './profile.hbs?raw';
import { withStore } from '../../hocs/withStore';
import AuthController from '../../controllers/AuthController';
import { User } from '../../api/AuthAPI';
import router from '../../core/Router';
import routes from '../../core/constants/routes';
import store from '../../core/Store';
import UserController from '../../controllers/UserController';

interface ProfileProps extends User {
  [key: string]: unknown,
  isEditable: boolean,
  onUploadAvatar : () => void,
  onChangeAvatar : (event: Event) => void,
  onEditProfile : (event : Event) => void,
  onSaveChanges : (event : Event) => void,
  onChangePassword: (event : Event) => void,
  onSubmitNewPassword: (event : Event) => void,
  onLogout : (event : Event) => void,
  onGoBack: () => void,
  getPasswords: () => {
    oldPassword : string,
    newPassword : string,
  }
}

export class ProfilePageBase extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      ...props,
      isEditable: false,
      onLogout: (event : Event) => {
        event.preventDefault();
        AuthController.logout();
      },
      onGoBack: () => {
        router.go(routes.Messenger);
      },
      onChangeAvatar: (event: Event) => {
        event.preventDefault();
        store.set('isOpenDialogUpload', true);
      },
      onChangePassword: (event: Event) => {
        event.preventDefault();
        store.set('isOpenDialogPassword', true);
      },
      onSubmitNewPassword: (event) => {
        event.preventDefault();
        const passwords = this.refs.dialogChangePassword.getPasswords();
        UserController.updatePassword(passwords);
        store.set('isOpenDialogPassword', false);
      },
      onEditProfile: (event) => {
        event.preventDefault();
        this.setProps({
          ...props,
          isEditable: true,
        });
      },
      onSaveChanges: (event) => {
        event.preventDefault();
        const form: {[key: string]: unknown} = {};
        const keys = Object.keys(this.refs);
        keys.forEach((key) => {
          form[key] = this.refs[key].value();
        });
        UserController.updateProfile(form)
          .then(() => AuthController.getUser())
          .then(() => this.setProps({
            ...props,
            isEditable: false,
          }));
      },
      onUploadAvatar: () => {
        const { file } = store.getState();
        const data = new FormData();
        data.append('avatar', file);
        UserController.updateAvatar(data).then(() => AuthController.getUser());
        this.refs.dialogUploadAvatar.closeDialog();
      },
    });
    AuthController.getUser();
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ user: state.user }));

export const Profile = withUser(ProfilePageBase);
