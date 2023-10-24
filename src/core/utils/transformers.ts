import { User, Chat, Message } from '../../types/interfacesAPI';
import { BASE_URL } from '../constants/baseURL';
import { defaultAvatarSrc, defaultChatAvatarSrc } from '../constants/defaultSources';
import formatDate from './formatDate';

const createURL = (resource: string | null) => {
  if (!resource) {
    return null;
  }

  return `${BASE_URL}/resources${resource}`;
};

export const transformUserFromApi = (data: User): User => ({
  id: data.id,
  login: data.login,
  first_name: data.first_name,
  second_name: data.second_name,
  display_name: data.display_name,
  avatar: createURL(data.avatar),
  phone: data.phone,
  email: data.email,
});

export const transformChatsFromApi = (data: Chat[]): Chat[] => data?.map((chat : Chat) => ({
  avatar: createURL(chat.avatar) || defaultChatAvatarSrc,
  id: chat.id,
  title: chat.title,
  created_by: chat.created_by,
  unread_count: chat.unread_count,
  last_message: {
    content: chat.last_message?.content,
    time: formatDate(chat.last_message?.time) as string,
    user: {
      id: chat.last_message?.user.id,
      login: chat.last_message?.user.login,
      first_name: chat.last_message?.user.first_name,
      second_name: chat.last_message?.user.second_name,
      display_name: chat.last_message?.user.display_name,
      avatar: createURL(chat.last_message?.user.avatar) || defaultAvatarSrc,
      phone: chat.last_message?.user.phone,
      email: chat.last_message?.user.email,
    },
  },
}));

export const transformMessagesFromApi = (data: Message[]|Message) => {
  if (Array.isArray(data)) {
    return data.map((message) => ({
      chat_id: message.chat_id,
      content: message.content,
      file: message.file || null,
      id: message.id,
      is_read: message.is_read,
      time: formatDate(message.time),
      type: message.type,
      user_id: message.user_id,
    }));
  } else {
    return {
      chat_id: data.chat_id,
      content: data.content,
      file: data.file || null,
      id: data.id,
      is_read: data.is_read,
      time: formatDate(data.time),
      type: data.type,
      user_id: data.user_id,  
    }
  }
};
