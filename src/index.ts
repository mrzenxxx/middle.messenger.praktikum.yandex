import Handlebars from 'handlebars';
import { registerComponent } from "./core/registerComponent";
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Main } from './pages/Main/index';
import { LogIn } from './pages/LogIn/index';
import { Register } from './pages/Register/index';
import { Profile } from './pages/Profile/index';
import { NotFound } from './pages/NotFound/index';
import { ServerError } from './pages/ServerError/index';
import { Navigation }  from './pages/Navigation/index';
import Block from './core/Block';
import Avatar from './components/Avatar/Avatar';
import Form from './components/Form/Form';
import FormField from './components/FormField/FormField'; 
import ChatFeed from './components/ChatFeed/ChatFeed';
import ChatBox from './components/ChatBox/ChatBox';
import ChatHeader from './components/ChatHeader/ChatHeader';
import ChatList from './components/ChatList/ChatList';
import ChatMessage from './components/ChatMessage/ChatMessage';
import ChatWindow from './components/ChatWindow/ChatWindow';
import { ChatMessageBar } from './components/ChatMessageBar/ChatMessageBar';
import { ChatSettingsBar } from './components/ChatSettingsBar/ChatSettingsBar';
import { ChatSearchBar } from './components/ChatSearchBar/ChatSearchBar';

Handlebars.registerPartial('Avatar', Avatar);
Handlebars.registerPartial('Form', Form);
Handlebars.registerPartial('FormField', FormField);
Handlebars.registerPartial('ChatFeed', ChatFeed);
Handlebars.registerPartial('ChatBox', ChatBox);
Handlebars.registerPartial('ChatHeader', ChatHeader);
Handlebars.registerPartial('ChatList', ChatList);
Handlebars.registerPartial('ChatMessage', ChatMessage);
Handlebars.registerPartial('ChatWindow', ChatWindow);

registerComponent('Button', Button as typeof Block);
registerComponent('Input', Input as typeof Block);
registerComponent('ChatMessageBar', ChatMessageBar as typeof Block);
registerComponent('ChatSearchBar', ChatSearchBar as typeof Block);
registerComponent('ChatSettingsBar', ChatSettingsBar as typeof Block);


document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;
    const getPage = () => {
        switch (window.location.pathname){
            case '/' : return new Navigation({});
            case '/main' : return new Main({});
            case '/login' : return new LogIn({});
            case '/profile' : return new Profile({});
            case '/register' : return new Register({});
            case '/500' : return new ServerError({});
            default : return new NotFound({});    
        }
    }

    const page: Block<{}> = getPage();
    root.append(page.getContent() as HTMLElement);
    page.dispatchComponentDidMount();
})
