import components from './components';
import pages from './pages';
import registerComponent from './core/utils/registerComponent';
import router from './core/Router';
import routes from './core/constants/routes';

Object.entries(components).forEach(([name , component]) => {
    registerComponent(name, component)
  });

document.addEventListener('DOMContentLoaded', () => {

  Object.keys(pages).forEach(page => {
    router.use(routes[page], pages[page])
  });
  router.start();
});
