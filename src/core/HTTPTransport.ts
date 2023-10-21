import onRequestError from './utils/onRequestError';
import queryStringify from './utils/queryStringify';
import { BASE_URL } from './constants/baseURL';

interface RequestOptions {
    method?: string;
    data?: any;
    headers?: { [key: string]: string };
    timeout?: number;
    retries?: number;
}

type HTTPMethod = (path: string, options?: RequestOptions) => Promise<XMLHttpRequest>

// eslint-disable-next-line no-shadow
enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export class HTTPTransport {

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${BASE_URL}${endpoint}`;
  }

  get : HTTPMethod = (path, options = {}) => this.request(`${this.endpoint + path}${queryStringify(options.data)}`, { method: METHODS.GET });

  post : HTTPMethod = (path, options = {}) => this.request(this.endpoint + path, { ...options, method: METHODS.POST });

  put : HTTPMethod = (path, options = {}) => this.request(this.endpoint + path, { ...options, method: METHODS.PUT });

  delete : HTTPMethod = (path, options = {}) => this.request(this.endpoint + path, { ...options, method: METHODS.DELETE });

  // eslint-disable-next-line class-methods-use-this
  request = (url: string, options: RequestOptions) => {
    const { method = 'GET', data, headers } = options as RequestOptions;
    console.warn('REQUEST', url, options);

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value as string);
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}, ${xhr.response.reason}`));
        }
      };

      xhr.onabort = () => reject(new Error(`Request aborted. ${onRequestError(xhr)}`));
      xhr.onerror = () => reject(new Error(`Request error. ${onRequestError(xhr)}`));
      xhr.ontimeout = () => reject(new Error(`Request timeout. ${onRequestError(xhr)}`));

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
