const path = require('path');
const { override, addWebpackAlias, adjustStyleLoaders, fixBabelImports } = require("customize-cra");

const options = {
  indexFileName: "index.html",
}
module.exports = override(

  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@assets': path.resolve(__dirname, './src/assets'),
    '@components': path.resolve(__dirname, './src/components'),
    '@pageBackend': path.resolve(__dirname, './src/page/backend'),
    '@pageFrontend': path.resolve(__dirname, './src/page/frontend'),
    '@provider': path.resolve(__dirname, './src/provider'),
    '@api': path.resolve(__dirname, './src/data'),
    '@typeTS': path.resolve(__dirname, './src/typeTS'),

  }),
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [
            './node_modules/bootstrap/scss/_functions.scss',
            './node_modules/bootstrap/scss/_mixins.scss',
            './src/assets/mixins/_mixins.scss',
            './src/assets/_variables.scss',
          ]
        }
      });
    }
  }),
  (config) => {
    if (process.env.NODE_ENV === "production") config.devtool = false;

    return config
  },

  adjustStyleLoaders(({ use: [css, postcss, resolve, processor] }) => {
    // css.options.sourceMap = true;// css-loader
    // postcss.options.sourceMap = true; // postcss-loader
    // // when enable pre-processor,
    // // resolve-url-loader will be enabled too
    // if (resolve) {
    //   resolve.options.sourceMap = true;
    //   // resolve-url-loader
    // }
    // // // pre-processor
    // if (processor && processor.loader.includes('sass-loader')) {
    //   //   console.log(processor.options)
    //   processor.options.sourceMap = true; // sass-loader
    // }
  }),
);