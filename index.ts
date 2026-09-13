// A ordem destes imports é a funcionalidade, não estilo. Import de ES module é hoisted:
// uma chamada de função depois dos imports rodaria DEPOIS do router já ter montado e feito
// as primeiras requisições. Por isso o MSW sobe como efeito colateral de import, antes de
// 'expo-router/entry'. Reordenar estas três linhas quebra o mock em desenvolvimento.
import 'react-native-url-polyfill/auto'
import './src/shared/api/mocks/server'
import 'expo-router/entry'
