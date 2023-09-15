
import { Button } from './components/Button/Button';
import { registerComponent } from "./utils/registerComponent";
import { Main } from './pages/Main/index';
import { LogIn } from './pages/LogIn/index';
import { Register } from './pages/Register/index';
import { Profile } from './pages/Profile/index';
import { NotFound } from './pages/NotFound/index';
import { ServerError } from './pages/ServerError/index';
import { Navigation }  from './pages/Navigation/index';
import Block from './utils/Block';


registerComponent('Button', Button as typeof Block);

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
