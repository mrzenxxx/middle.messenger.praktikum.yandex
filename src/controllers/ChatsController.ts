import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../core/Store';
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
    console.log(chats);
    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);
      await MessagesController.connect(chat?.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
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

// @ts-ignore
window.chatsController = chatsController;

export default chatsController;
