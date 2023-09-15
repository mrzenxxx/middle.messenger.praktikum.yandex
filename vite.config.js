import handlebars from 'vite-plugin-handlebars';

import { defineConfig } from 'vite';
import { resolve } from 'path'; 

export default defineConfig({
    base: '',
    assetsInclude: "**/*.hbs",
    root: resolve(__dirname),
    build: {
        outDir: resolve(__dirname, 'dist'),
    },

    plugins: [handlebars()],
});
