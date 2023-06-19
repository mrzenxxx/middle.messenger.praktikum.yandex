import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '',
    plugins: [handlebars()],
});
