import Handlebars from 'handlebars';
import { registerComponent } from './core/utils/registerComponent';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Main } from './pages/Main/Main';
import { LogIn } from './pages/LogIn/Login';
import { Register } from './pages/Register/Register';
import { Profile } from './pages/Profile/Profile';
import { NotFound } from './pages/NotFound/NotFound';
import { ServerError } from './pages/ServerError/ServerError';
import { Navigation } from './pages/Navigation/Navigation';
import Block from './core/Block';
import Avatar from './components/Avatar/Avatar';
import Form from './components/Form/Form';
import ChatFeed from './components/ChatFeed/ChatFeed';
import ChatBox from './components/ChatBox/ChatBox';
import ChatHeader from './components/ChatHeader/ChatHeader';
import ChatList from './components/ChatList/ChatList';
import ChatMessage from './components/ChatMessage/ChatMessage';
import ChatWindow from './components/ChatWindow/ChatWindow';
import { ChatMessageBar } from './components/ChatMessageBar/ChatMessageBar';
import { ChatSettingsBar } from './components/ChatSettingsBar/ChatSettingsBar';
import { ChatSearchBar } from './components/ChatSearchBar/ChatSearchBar';
import { FormField } from './components/FormField/FormField';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import Router from './core/Router';
import { Routes } from './core/constants/routes';

Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('ChatFeed', ChatFeed);
Handlebars.registerPartial('ChatBox', ChatBox);
Handlebars.registerPartial('ChatHeader', ChatHeader);
Handlebars.registerPartial('ChatList', ChatList);
Handlebars.registerPartial('ChatMessage', ChatMessage);
Handlebars.registerPartial('ChatWindow', ChatWindow);

registerComponent('Button', Button as typeof Block);
registerComponent('Input', Input as typeof Block);
registerComponent('Form', Form as typeof Block);
registerComponent('ErrorMessage', ErrorMessage as typeof Block);
registerComponent('FormField', FormField as typeof Block);
registerComponent('ChatMessageBar', ChatMessageBar as typeof Block);
registerComponent('ChatSearchBar', ChatSearchBar as typeof Block);
registerComponent('ChatSettingsBar', ChatSettingsBar as typeof Block);

document.addEventListener('DOMContentLoaded', () => {
  Router
    .use(Routes.Navigation, Navigation)
    .use(Routes.Login, LogIn)
    .use(Routes.Register, Register)
    .use(Routes.Messenger, Main)
    .use(Routes.Profile, Profile)
    .use(Routes.ServerError, ServerError)
    .use(Routes.NotFound, NotFound)
    .start();
});
