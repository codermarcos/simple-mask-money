var webpackConfig = require('./build/webpack.prod');

module.exports = config => {
  config.set({
    autoWatch: true,
    singleRun: false,
    browsers: ['Firefox'],
    basePath: '.',
    files: [
      'test/*.test.js'
    ],
    frameworks: ['mocha'],
    logLevel: config.LOG_INFO,
    port: 9876,
    colors: true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
