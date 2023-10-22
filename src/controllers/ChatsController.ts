import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../core/Store';
import { transformChatsFromApi } from '../core/utils/transformers';
import { Chat } from '../types/interfacesAPI';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    let newChatId : number;
    await this.api.create(title).then((res) => { newChatId = res.id; }).finally(() => store.set('isOpenDialogChat', false));
    this.setNewChat(newChatId);
    this.getChats();
  }

  async setNewChat(newChatId) {
    const chats = await this.api.read();
    store.set('currentChat', chats.filter((chat) => chat.id === newChatId)[0]);
  }

  async getChats() {
    const chats = await this.api.read();
    chats.map(async (chat: Chat) => {
      const token = await this.getToken(chat.id);
      await MessagesController.connect(chat?.id, token);
    });

    store.set('chats', transformChatsFromApi(chats));
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
