import Block from './core/Block';
import { registerComponent } from './core/utils/registerComponent';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Messenger } from './pages/Messenger/Messenger';
import { LogIn } from './pages/LogIn/Login';
import { Register } from './pages/Register/Register';
import { Profile } from './pages/Profile/Profile';
import { NotFound } from './pages/NotFound/NotFound';
import { ServerError } from './pages/ServerError/ServerError';
import { Navigation } from './pages/Navigation/Navigation';
import { Avatar } from './components/Avatar/Avatar';
import { ChatHeader } from './components/ChatHeader/ChatHeader';
import { ChatList } from './components/ChatList/ChatList';
import { ChatMessage } from './components/ChatMessage/ChatMessage';
import { ChatWindow } from './components/ChatWindow/ChatWindow';
import { ChatBox } from './components/ChatBox/ChatBox';
import { ChatFeed } from './components/ChatFeed/ChatFeed';
import { Dialog } from './components/Dialog/Dialog';
import { DialogCreateChat } from './components/DialogCreateChat/DialogCreateChat';
import { Form } from './components/Form/Form';
import { ChatMessageBar } from './components/ChatMessageBar/ChatMessageBar';
import { ChatSettingsBar } from './components/ChatSettingsBar/ChatSettingsBar';
import { ChatSearchBar } from './components/ChatSearchBar/ChatSearchBar';
import { ChatSideBar } from './components/ChatSideBar/ChatSideBar';
import { FormField } from './components/FormField/FormField';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import Router from './core/Router';
import { Routes } from './core/constants/routes';


registerComponent('Avatar', Avatar as typeof Block);
registerComponent('ChatMessage', ChatMessage as typeof Block);
registerComponent('Button', Button as typeof Block);
registerComponent('Dialog', Dialog as typeof Block);
registerComponent('DialogCreateChat', DialogCreateChat as typeof Block);
registerComponent('Input', Input as typeof Block);
registerComponent('Form', Form as typeof Block);
registerComponent('ErrorMessage', ErrorMessage as typeof Block);
registerComponent('FormField', FormField as typeof Block);
registerComponent('ChatBox', ChatBox as typeof Block);
registerComponent('ChatFeed', ChatFeed as typeof Block);
registerComponent('ChatHeader', ChatHeader as typeof Block);
registerComponent('ChatMessageBar', ChatMessageBar as typeof Block);
registerComponent('ChatSearchBar', ChatSearchBar as typeof Block);
registerComponent('ChatSideBar', ChatSideBar as typeof Block);
registerComponent('ChatWindow', ChatWindow as typeof Block);
registerComponent('ChatList', ChatList as typeof Block);
registerComponent('ChatSettingsBar', ChatSettingsBar as typeof Block);

document.addEventListener('DOMContentLoaded', () => {
  Router
    .use(Routes.Navigation, Navigation)
    .use(Routes.Login, LogIn)
    .use(Routes.Register, Register)
    .use(Routes.Messenger, Messenger as BlockConstructable)
    .use(Routes.Profile, Profile)
    .use(Routes.ServerError, ServerError)
    .use(Routes.NotFound, NotFound)
    .start();
});
