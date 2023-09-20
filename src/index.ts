import Handlebars from 'handlebars';
import { Button } from './components/Button/Button';
import { FormInput } from './components/FormInput/FormInput';
import { registerComponent } from "./utils/registerComponent";
import { Main } from './pages/Main/index';
import { LogIn } from './pages/LogIn/index';
import { Register } from './pages/Register/index';
import { Profile } from './pages/Profile/index';
import { NotFound } from './pages/NotFound/index';
import { ServerError } from './pages/ServerError/index';
import { Navigation }  from './pages/Navigation/index';
import Block from './utils/Block';
import Form from './components/Form/Form';


Handlebars.registerPartial('Form', Form);
registerComponent('Button', Button as typeof Block);
registerComponent('FormInput', FormInput as typeof Block);

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
