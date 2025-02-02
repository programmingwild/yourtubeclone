// craco.config.js
module.exports = {
    webpack: {
      resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          buffer: require.resolve('buffer/'),
          stream: require.resolve('stream-browserify'),
        },
      },
    },
  };
  