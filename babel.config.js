module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-vector-icons", {"include": ["react-native-vector-icons/"], "exclude": []}],
    ],
  };
};
