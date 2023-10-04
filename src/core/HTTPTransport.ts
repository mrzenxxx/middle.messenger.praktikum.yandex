import queryStringify from "./utils/queryStringify";

interface RequestOptions {
    method?: string;
    data?: any;
    headers?: { [key: string]: string };
    timeout?: number;
    retries?: number;
}

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<XMLHttpRequest>

// eslint-disable-next-line no-shadow
enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export class HTTPTransport {

  static BASE_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.BASE_URL}${endpoint}`;
  }

  get : HTTPMethod = (url, options = {}) => this.request(`${url}?${queryStringify(options.data)}`, { method: METHODS.GET });

  post : HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  put : HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  delete : HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  // eslint-disable-next-line class-methods-use-this
  request = (url: string, options: RequestOptions) => {
    const { method = 'GET', data, headers } = options as RequestOptions;
    console.warn('REQUEST', url, options);

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value as string);
        }
      }

      xhr.onload = () => resolve(xhr);
      xhr.onabort = () => reject({reason: 'Abort'});
      xhr.onerror = () => reject({reason: 'Network error'});
      xhr.ontimeout = () => reject({reason: 'Timeout'});

      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
