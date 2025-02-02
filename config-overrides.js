module.exports = {
    webpack: (config, env) => {
      // Apply custom Webpack configuration here
      config.resolve.fallback = {
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      };
  
      return config;
    },
  };
  