const webpack = require("webpack"),
    path = require("path"),
    materialComponents = require("./materialComponentsList");
require("./env.config");

module.exports = {
    vue: { config: { productionTip: false } },
    buildModules: [
        '@nuxtjs/stylelint-module',
        '@nuxtjs/style-resources',
        'cookie-universal-nuxt',
        'nuxt-material-design-icons',
        [
            'nuxt-vue-material',
            { components: materialComponents }
        ]
    ],
    /*
  ** Headers of the page
  */
    styleResources: {
        scss: [
            'assets/scss/_variables.scss',
            'assets/scss/_mixins.scss'
        ]
    },
    head: {
        title: 'sellbrocke-front-app',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: [
        { src: "~/assets/scss/main.scss", lang: "scss" }
    ],
    vendor: [
        "vue-notification",
        "vee-validate",
        '~/assets/js/devLogger/index.js',
        '~/assets/js/helpers/generators.js',
        '~/assets/js/helpers/functions.js',
        '~/assets/js/http/index.js',
        '~/assets/js/auth/index.js'
    ],
    plugins: [
        '~/plugins/register.js',
        '~/plugins/cookieResolve/index.js',
        { src: '~/plugins/vue-plugins.js', mode: 'client' },
        { src: '~/plugins/vue-plugins-server.js', mode: 'server' }
    ],
    /*
  ** Customize the progress bar color
  */
    loading: { color: '#3B8070' },
    /*
  ** Build configuration
  */
    build: {
    /*
    ** Run ESLint on save
    */
        extend(config, { isDev, isClient }) {
            if(isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }

            config.plugins.push(
                new webpack.DefinePlugin({ isDev }),
                new webpack.ProvidePlugin({ "dl": [ path.resolve(__dirname, "./assets/js/devLogger.js"), "default" ] })
            );
            if(isClient) {
                config.devtool = isDev ? "source-map": "none";
            }

            const aliases = {
                "@assets": path.resolve(__dirname, "./assets"),
                "@lib": path.resolve(__dirname, "./assets/js"),
                "@scss": path.resolve(__dirname, "./assets/scss"),
                "@components": path.resolve(__dirname, "./components"),
                "@global": path.resolve(__dirname, "./components/global"),
                "@icons": path.resolve(__dirname, "./assets/icons"),
                "@templates": path.resolve(__dirname, "./components/templates"),
                "@helpers": path.resolve(__dirname, "./assets/js/helpers"),
                "@http": path.resolve(__dirname, "./assets/js/http"),
                "@auth": path.resolve(__dirname, "./assets/js/auth"),
                "@mixins": path.resolve(__dirname, "./mixins")
            };

            Object.assign(config.resolve.alias, aliases);
        }
    }
};

