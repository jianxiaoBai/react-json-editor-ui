const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: true,
        extract: false,
        modules: {
          auto: true,
          generateScopedName: '[name]__[local]__[hash:base64:5]'
        }
      })
    );
    return config;
  },
};
