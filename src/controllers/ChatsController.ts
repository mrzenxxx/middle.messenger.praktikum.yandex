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
    let newChatId : Nullable<number> = null;
    await this.api.create(title)
      .then((res) => { newChatId = (res as unknown as Chat).id; })
      .catch((error) => store.set('error', error))
      .finally(() => store.set('isOpenDialogChat', false));
    this.setNewChat(newChatId as unknown as number);
    this.getChats();
  }

  async setNewChat(newChatId : number) {
    const chats = await this.api.read();
    store.set('currentChat', (chats as unknown as Chat[]).filter((chat) => chat.id === newChatId)[0]);
  }

  async getChats() {
    const chats = await this.api.read();
    (chats as unknown as Chat[]).map(async (chat: Chat) => {
      const token = await this.getToken(chat.id);
      await MessagesController.connect(chat?.id, token);
    });

    store.set('chats', transformChatsFromApi(chats as unknown as Chat[]));
  }

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]).catch((error) => store.set('error', error));
  }

  removeUserFromChat(id: number, userId: number) {
    this.api.removeUsers(id, [userId]).catch((error) => store.set('error', error));
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
    } catch (error) {
      store.set('error', error);
    }

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
