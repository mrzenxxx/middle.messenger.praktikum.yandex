import BaseAPI from './BaseAPI';

interface GetTokenHttpResponse extends XMLHttpRequest {
  token: string,
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public create = (title: string) => this.http.post('/', { data: { title } });

  public read = () => this.http.get('/?limit=50');

  public delete = (id: number) => this.http.delete('/', { data: { chatId: id } });

  public getUsers = (id: number) => this.http.get(`/${id}/users`);

  public addUsers = (id: number, users: number[]) => this.http.put('/users', { data: { users, chatId: id } });

  public removeUsers = (id: number, users: number[]) => this.http.delete('/users', { data: { users, chatId: id } });

  public getToken = async (id: number) => {
    const response = await this.http.post(`/token/${id}`);
    return (response as GetTokenHttpResponse).token;
  };

  update = undefined;
}

export default new ChatsAPI();
