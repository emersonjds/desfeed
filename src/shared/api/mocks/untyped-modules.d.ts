// Os dois módulos abaixo não publicam tipagem. Declarar a superfície que de fato usamos é
// mais honesto que silenciar com `any`: se a assinatura mudar, o typecheck avisa.

declare module 'react-native-fetch-api' {
  type ReactNativeFetchInit = RequestInit & {
    reactNative?: { textStreaming?: boolean }
  }

  export function fetch(input: string | Request, init?: ReactNativeFetchInit): Promise<Response>
  export const Headers: typeof globalThis.Headers
  export const Request: typeof globalThis.Request
  export const Response: typeof globalThis.Response
}
