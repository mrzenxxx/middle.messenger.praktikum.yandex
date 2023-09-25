import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';
import { resolve } from 'path'; 

export default defineConfig({
    base: '',
    assetsInclude: "**/*.hbs",
    root: resolve(__dirname),
    build: {
        outDir: resolve(__dirname, 'dist'),
    },

    plugins: [handlebars(),
              viteStaticCopy({
                  targets: [
                    {
                      src: 'assets/img/mocks',
                      dest: 'assets/img/'
                    }
                  ]
              }) ],
});
