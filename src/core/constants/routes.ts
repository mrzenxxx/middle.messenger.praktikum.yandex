const routes : Record<string, string> = {
  Navigation: '/navigation',
  Register: '/sign-up',
  Login: '/',
  Profile: '/settings',
  Messenger: '/messenger',
  ServerError: '/500',
  NotFound: '/404',
} as const;

export default routes;
