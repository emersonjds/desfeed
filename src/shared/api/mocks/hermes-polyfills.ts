// O MSW 2 assume um ambiente de navegador. O Hermes não expõe MessageEvent nem
// BroadcastChannel, e os interceptadores do MSW os referenciam no carregamento do módulo —
// o app quebra antes de renderizar. Estes stubs só precisam existir: nada no app usa
// mensageria entre contextos, e o MSW nunca dispara esses eventos no caminho de fetch.
// Importar este arquivo ANTES de qualquer import do MSW.

type MessageEventInit = { data?: unknown; origin?: string; lastEventId?: string }

const globalScope = globalThis as Record<string, unknown>

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
    onmessage: ((event: Event) => void) | null = null

    constructor(name: string) {
      super()
      this.name = name
    }

    postMessage(): void {}

    close(): void {}
  }

  globalScope.BroadcastChannel = BroadcastChannelPolyfill
}
