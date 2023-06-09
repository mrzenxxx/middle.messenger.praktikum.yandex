export const template = `
    <main class="{{className}}">
        <form class="{{className}}__form">
            <div class="{{className}}__avatar">
                <img class="{{className}}__avatar_image" src="{{image}}"/>
            </div>
            <span class="{{className}}__profile_name">
                {{nickname}}
            </span>
            <div class="{{className}}__form_fields">
                <label class="{{className}}__form_label">
                    <span class="{{className}}__form_label-text">Почта</span>
                    <input class="{{className}}__form_input" name='email' value='vasya2007@yandex.ru'></input>
                </label>
                <label class="{{className}}__form_label">
                    <span class="{{className}}__form_label-text">Логин</span>
                    <input class="{{className}}__form_input" name='login' value='vasya2007'></input>
                </label>
                <label class="{{className}}__form_label">
                    <span class="{{className}}__form_label-text">Имя</span>
                    <input class="{{className}}__form_input" name='first_name' value='Василий'></input>
                </label>
                <label class="{{className}}__form_label">
                    <span class="{{className}}__form_label-text">Фамилия</span>
                    <input class="{{className}}__form_input" name='second_name' value='Пупкин'></input>
                </label>
                <label class="{{className}}__form_label">
                    <span class="{{className}}__form_label-text">Имя в чате</span>
                    <input class="{{className}}__form_input" name='display_name' value='Mr.BIG'></input>
                </label>
                <label class="{{className}}__form_label {{className}}__form_label_last">
                    <span class="{{className}}__form_label-text">Телефон</span>
                    <input class="{{className}}__form_input" name="phone" type="phone" value='+7 911 111 11 11'></input>
                </label>
            </div>
            <div class="{{className}}__buttons_wrapper">
            <button class="{{className}}__button {{className}}__button_primary">
                {{button_1_label}}
            </button>
            <button class="{{className}}__button {{className}}__button_primary">
                {{button_2_label}}
            </button>
            <button class="{{className}}__button {{className}}__button_secondary">
                {{button_3_label}}
            </button>
            <div>
        </form>   
    </main>
`
