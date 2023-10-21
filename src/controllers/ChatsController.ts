import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../core/Store';
import { Chat } from '../types/interfacesAPI';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.getChats();
  }

  async getChats() {
    const chats = await this.api.read();
    chats.map(async (chat: Chat) => {
      const token = await this.getToken(chat.id);
      await MessagesController.connect(chat?.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
  }

  removeUserFromChat(id: number, userId: number) {
    this.api.removeUsers(id, [userId]);
  }

  async delete(id: number) {
    await this.api.delete(id);
    this.getChats();
    store.set('isOpenDialogDelete', false);
    store.set('currentChat', null);
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const chatsController = new ChatsController();

export default chatsController;
