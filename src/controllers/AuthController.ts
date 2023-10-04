import store from "../core/Store";
import API, { AuthAPI, LoginData, RegisterData } from "../api/AuthAPI";
import router from "../core/Router";

class AuthController {
    private readonly api : AuthAPI;
    constructor(){
        this.api = API;
    }

    public async login(data : LoginData) {
        await this.api.login(data).catch(e => console.error(e.message));
        await this.api.getUser().catch(e => console.error(e.message));
        router.go('/profile');
    }

    public async register(data : RegisterData) {
        await this.api.register(data).catch(e => console.error(e.message));
        await this.api.getUser().catch(e => console.error(e.message));
        router.go('/profile');
    }

    public async getUser() {
        const user = await this.api.getUser();
        store.set('user', user);
    }

    public async logout() {
        await this.api.logout();
        router.go('/signin');
    }

};

export default new AuthController();
