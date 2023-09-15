import handlebars from 'vite-plugin-handlebars';
import vitePluginHandlebarsPrecompile from './vite-plugin-handlebars-precompile';

import { defineConfig } from 'vite';
import { resolve } from 'path'; 

export default defineConfig({
    base: '',
    assetsInclude: "**/*.hbs",
    root: resolve(__dirname),
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    // optimizeDeps: {
    //     include: [
    //         resolve(__dirname, 'src'),
    //     ],
    // },    
    plugins: [handlebars()],
});
