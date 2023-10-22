export interface User {
        id: number,
        first_name: string,
        second_name: string,
        display_name: string,
        phone: string,
        login: string,
        avatar: string|null,
        email: string
}

export interface Chat {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    created_by: number,
    last_message: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            email: string,
            login: string,
            phone: string
        },
        time: string,
        content: string[] | string
    }
}

export interface Message {
    chat_id: number;
    time: string;
    type: string;
    id: string;
    user_id: number;
    content: string;
    is_read: boolean;
    file?: {
      id: number;
      user_id: number;
      path: string;
      filename: string;
      content_type: string;
      content_size: number;
      upload_date: string;
    }
  }

export interface ChangePasswordRequestData {
    oldPassword : string,
    newPassword : string,
}
