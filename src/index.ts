import { Main } from './pages/Main/index';
import { LogIn } from './pages/LogIn/index';
import { Register } from './pages/Register/index';
import { Profile } from './pages/Profile/index';
import { NotFound } from './pages/NotFound/index';
import { ServerError } from './pages/ServerError/index';
import { Navigation } from './components/Navigation';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;
    const getPage = () => {
        switch (window.location.pathname){
            case '/' : return Navigation();
            case '/main' : return Main();
            case '/login' : return LogIn();
            case '/profile' : return Profile();
            case '/register' : return Register();
            case '/500' : return ServerError();
            default : return NotFound();    
        }
    }
    root.innerHTML = getPage();
})
