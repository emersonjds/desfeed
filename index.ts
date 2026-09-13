import 'react-native-url-polyfill/auto'

import { startMockServer } from './src/shared/api/mocks/server'

startMockServer()

import 'expo-router/entry'
