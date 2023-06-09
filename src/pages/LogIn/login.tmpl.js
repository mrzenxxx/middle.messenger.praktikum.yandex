export const template = `
    <main class="{{className}}">
        <form class="{{className}}__form">
            <span class="{{className}}__form_title">{{title}}</span>
            <div class="{{className}}__form_fields">
                <label class="{{className}}__form_label">
                    <span class="{{className}}__form_label-text">Логин</span>
                    <input class="{{className}}__form_input" name='login'></input>
                </label>
                <label class="{{className}}__form_label">
                    <span class="{{className}}__form_label-text">Пароль</span>
                    <input class="{{className}}__form_input" name='password' type="password"></input>
                </label>        
            </div>
            <button class="{{className}}__button {{className}}__button_primary">
                {{primary_label}}
            </button>
            <button class="{{className}}__button {{className}}__button_secondary">
                {{secondary_label}}
            </button>
        </form>   
    </main>
`
