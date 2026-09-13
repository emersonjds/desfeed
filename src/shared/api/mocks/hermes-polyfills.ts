// O MSW monta a resposta com o corpo em ReadableStream. O `Response` que o React Native
// expõe vem do whatwg-fetch e não sabe ler stream: descarta o corpo em silêncio, e a
// requisição chega ao app com status 200 e zero byte — foi exatamente o que acontecia aqui.
// Estes polyfills trocam fetch, Request, Response e os streams por implementações que
// suportam streaming de verdade.
//
// Importar este arquivo ANTES de qualquer import do MSW.

import { TextDecoderStream, TextEncoderStream } from '@stardazed/streams-text-encoding'
import { Headers, Request, Response, fetch } from 'react-native-fetch-api'
import { ReadableStream, TransformStream, WritableStream } from 'web-streams-polyfill'

// O React Native expõe `polyfillGlobal` em Libraries/Utilities, mas importar de lá é deep
// import e o próprio RN avisa que está descontinuado. Definir a propriedade direto faz o
// mesmo: substitui o global antes de qualquer módulo capturá-lo.
const define = (name: string, value: unknown): void => {
  Object.defineProperty(globalThis, name, { value, writable: true, configurable: true })
}

type MessageEventInit = { data?: unknown; origin?: string; lastEventId?: string }

const globalScope = globalThis as Record<string, unknown>

// O Hermes não expõe MessageEvent nem BroadcastChannel, e os interceptadores do MSW os
// referenciam já no carregamento do módulo. Os stubs só precisam existir: nada no app usa
// mensageria entre contextos, e o MSW não os dispara no caminho de fetch.
if (typeof globalScope.MessageEvent === 'undefined') {
  class MessageEventPolyfill extends Event {
    readonly data: unknown
    readonly origin: string
    readonly lastEventId: string

    constructor(type: string, init: MessageEventInit = {}) {
      super(type)
      this.data = init.data ?? null
      this.origin = init.origin ?? ''
      this.lastEventId = init.lastEventId ?? ''
    }
  }

  globalScope.MessageEvent = MessageEventPolyfill
}

if (typeof globalScope.BroadcastChannel === 'undefined') {
  class BroadcastChannelPolyfill extends EventTarget {
    readonly name: string

    constructor(name: string) {
      super()
      this.name = name
    }

    postMessage(): void {}

    close(): void {}
  }

  globalScope.BroadcastChannel = BroadcastChannelPolyfill
}

define('ReadableStream', ReadableStream)
define('TransformStream', TransformStream)
define('WritableStream', WritableStream)
define('TextEncoderStream', TextEncoderStream)
define('TextDecoderStream', TextDecoderStream)

define('Headers', Headers)
define('Request', Request)
define('Response', Response)

// `textStreaming` é o que faz o fetch do React Native devolver o corpo como stream em vez
// de string já montada — sem ele o MSW volta a perder o corpo.
define('fetch', (...args: Parameters<typeof fetch>) =>
  fetch(args[0], { ...args[1], reactNative: { textStreaming: true } }),
)
