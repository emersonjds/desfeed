// react-native-css-interop@0.2.6 (bundled by nativewind@4.2.6) unconditionally lists
// 'react-native-worklets/plugin' for Reanimated 4 support. This project has no Reanimated
// dependency, so the plugin package does not exist and Babel fails to resolve it — drop it here.
const nativewindPresetWithoutWorklets = () => {
  const preset = require('react-native-css-interop/babel')();
  return {
    ...preset,
    plugins: preset.plugins.filter((plugin) => plugin !== 'react-native-worklets/plugin'),
  };
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind', worklets: false, reanimated: false }],
      nativewindPresetWithoutWorklets,
    ],
  };
};
