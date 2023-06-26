export const template = `<main class="{{className}}">
      <aside class="{{className}}__aside">
        <ul class="{{className}}__chat_list">
            <li class="{{className}}__chat">{{chatName}}</li>
            <li class="{{className}}__chat">{{chatName}}</li>
            <li class="{{className}}__chat">{{chatName}}</li>
            <li class="{{className}}__chat">{{chatName}}</li>
            <li class="{{className}}__chat">{{chatName}}</li>
            <li class="{{className}}__chat">{{chatName}}</li>
            <li class="{{className}}__chat">{{chatName}}</li>
        </ul>
      </aside>
      <section class="{{className}}__chat_window">
        <span class="{{className}}__chat_feed">{{chatMessage}}</span>
        <input class="{{className}}__chat_message" placeholder='Введите сообщение...'></input>
      </section>
    </main>`;
