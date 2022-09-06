const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: true,
        less: true,
        extract: !!options.writeMeta,
        modules: true, // 使用css modules
        camelCase: true, // 支持驼峰
      })
    );
    return config;
  },
};
