module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // [
      //   "module:expo-document-picker",
      //   {
      //     "iCloudContainerEnvironment": "Production"
      //   }
      // ],
      'react-native-reanimated/plugin',

      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'src'
        }
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env'
        }
      ]
    ]
  };
};