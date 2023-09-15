import { Button } from "../components/Button/Button";
import { Navigation } from "../pages/Navigation/index";

const ROUTES = {
  'home': Button,
  'login': Navigation,
}

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector('#app')!;

  root.innerHTML = '';

  const Page = ROUTES[name];

  const page = new Page({});

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
