const path = require('path');
const { override, addWebpackAlias, adjustStyleLoaders } = require("customize-cra");

module.exports = override(
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [
            './src/assets/bootstrap.scss',
          ]
        }
      });
    }
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@assets': path.resolve(__dirname, './src/assets'),
    '@components': path.resolve(__dirname, './src/components'),
    '@pageBackend': path.resolve(__dirname, './src/page/backend'),
    '@pageFrontend': path.resolve(__dirname, './src/page/frontend'),
    '@provider': path.resolve(__dirname, './src/provider'),
    '@api': path.resolve(__dirname, './src/data'),
    '@typeTS': path.resolve(__dirname, './src/typeTS'),

  })
);