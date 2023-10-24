const routes : Record<string, string> = {
  Navigation: '/navigation',
  Register: '/sign-up',
  LoginPage: '/',
  Profile: '/settings',
  Messenger: '/messenger',
  ServerError: '/500',
  NotFound: '/404',
} as const;

export default routes;
