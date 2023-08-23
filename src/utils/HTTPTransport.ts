interface RequestOptions {
    method?: string;
    data?: any;
    headers?: { [key: string]: string };
    timeout?: number;
    retries?: number;
}

enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

function queryStringify(data: { [key: string]: unknown }): string {
    let resultQueryParams: string = '';
    let paramsList: Array<[string, unknown]> = [];

    if (!data) {
        return resultQueryParams;
    } else {
        paramsList = Object.entries(data);
        resultQueryParams += '?';
    }

    for (const param of paramsList) {
        let [key, value] = param;
        resultQueryParams += `${key}=${value!.toString()}`;

        if (paramsList.indexOf(param) !== paramsList.length - 1) {
            resultQueryParams += '&';
        }
    }

    return resultQueryParams;
}

export class HTTPTransport {
    get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(`${url}${queryStringify(options.data)}`, { method: METHODS.GET });
    };

    post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: RequestOptions): Promise<XMLHttpRequest> => {
        const { method = 'GET', data, headers } = options;
        console.log('REQUEST', url, options);

        return new Promise<XMLHttpRequest>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            if (headers) {
                for (const [key, value] of Object.entries(headers)) {
                    xhr.setRequestHeader(key, value);
                }
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
};

export const xhrUtil = new HTTPTransport();

export function fetchWithRetry(url : string, options : RequestOptions) : Promise<XMLHttpRequest> {
    
    const {retries = 1} = options;
  
      function handleError(error: Error){
          const triesLeft = retries - 1;
          if (!triesLeft){
              throw error;
          }
  
          return fetchWithRetry(url, {...options, retries: triesLeft});
      }
  
      return xhrUtil.request(url, options ).catch(handleError);
}
