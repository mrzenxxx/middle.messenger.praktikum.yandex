import BaseAPI from './BaseAPI';
import { User } from './AuthAPI';

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User,
    time: string;
    content: string;
  }
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public create = (title: string) => this.http.post('/', { data: { title } });

  public read = () => this.http.get('/');
 
  public delete = (id: number) => this.http.delete('/', { chatId: id });

  public getUsers = (id: number) => this.http.get(`/${id}/users`);

  public addUsers = (id: number, users: number[]) => this.http.put('/users', { users, chatId: id });
  
  public getToken = async (id: number) => {
    const response = await this.http.post(`/token/${id}`);
    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
