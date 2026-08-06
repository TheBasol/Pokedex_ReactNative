module.exports = {
  preset: 'jest-expo',
  forceExit: true,
  transformIgnorePatterns: [
    'node_modules/(?!(\\.pnpm|react-native|@react-native|@react-native-community|@react-navigation|react-native-safe-area-context|react-native-screens|react-native-paper|react-native-gesture-handler|react-native-image-colors|@react-native-masked-view|expo-modules-core|expo)/)',
  ],
};
