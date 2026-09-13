# Desfeed — Decisão de Stack (pesquisa técnica, setembro/2026)

> Restrições travadas: Expo (Expo Go + EAS Build preview), NativeWind, FSD, TanStack Query, Zod, Zustand, TypeScript estrito. Não questionadas.

---

## 1. NativeWind

**RECOMENDAÇÃO: NativeWind `4.2.6` (estável/latest), NÃO a v5 — que em set/2026 ainda está em preview (`5.0.0-preview.4`, dist-tag `preview`, não `latest`).**

Verificado direto no registry do npm (`npm view nativewind`, checado em 2026-09-12):
- `latest` = `4.2.6` (publicado 2026-06-22)
- `preview` = `5.0.0-preview.4`
- `nightly` = `0.0.0-nightly.*`

NativeWind v4 (4.2.x) usa **Tailwind CSS v3** — `peerDependencies.tailwindcss: ">3.3.0"` e a própria devDependency do pacote fixa `tailwindcss@3.4.4`. A v5 (ainda preview) é a que migra para Tailwind v4 e passa a depender internamente do Reanimated v4+. Como o v5 não é GA, para o hackathon o caminho estável é v4.2.6.

**Compatibilidade com Expo SDK 57 / RN 0.86 / React 19:** sim. Expo SDK 57 roda RN 0.86 com React 19.2 (React não mudou de SDK 56→57). NativeWind 4.2.x não tem dependência direta de versão de RN/React — ele plugga via Babel/Metro — e é o que os templates oficiais do Expo Router usam hoje.

**Instalação em Expo Router (v4.2.x):**
1. `npx expo install nativewind tailwindcss@^3.4.4 react-native-reanimated react-native-safe-area-context`
2. `npx tailwindcss init` → `tailwind.config.js`:
   ```js
   module.exports = {
     content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
     presets: [require("nativewind/preset")],
     theme: { extend: {} },
     plugins: [],
   };
   ```
3. `global.css` na raiz:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Importar `global.css` no `app/_layout.tsx` (root layout do Expo Router).
5. `babel.config.js`: adicionar `"nativewind/babel"` aos presets.
6. `metro.config.js`:
   ```js
   const { getDefaultConfig } = require("expo/metro-config");
   const { withNativeWind } = require("nativewind/metro");
   const config = getDefaultConfig(__dirname);
   module.exports = withNativeWind(config, { input: "./global.css" });
   ```

**Incompatibilidade com Reanimated 4?** Existiu — issues abertas (`nativewind/nativewind#1560`, `software-mansion/react-native-reanimated#8329`) relatam que `useAnimatedRef`/`useScrollOffset` não recebiam a ref corretamente e que classes NativeWind paravam de aplicar em `Animated.View` no Reanimated 4.1.1. **NativeWind 4.2.0+ já inclui patch para essa incompatibilidade** — como a versão recomendada é 4.2.6, o piso de versões do dono do projeto (`react-native-reanimated@4.5.1`) já está coberto. Ainda assim, valide manualmente `Animated.View` + classes NativeWind antes de depender disso no feed.

Fontes: [NativeWind installation docs](https://www.nativewind.dev/getting-started/installation), [nativewind/nativewind#1560](https://github.com/nativewind/nativewind/issues/1560), [software-mansion/react-native-reanimated#8329](https://github.com/software-mansion/react-native-reanimated/issues/8329), registry npm (`nativewind`).

---

## 2. Biblioteca de componentes UI sobre NativeWind

**RECOMENDAÇÃO: `react-native-reusables` (via `@react-native-reusables/cli`).**

Comparativo:

| Opção | Base | Maturidade | Instalação | Expo Go | Licença |
|---|---|---|---|---|---|
| **react-native-reusables** | NativeWind v4 (aceita Uniwind também) | Alta — 8,7k stars, 314 forks no fork mantido (`founded-labs/react-native-reusables`, sucessor do `mrzachnugent/react-native-reusables`), CLI publicado no npm (`@react-native-reusables/cli@0.7.1`) | `npx @react-native-reusables/cli@latest init` (novo projeto) ou `add <componente>` (projeto existente) — copia o código-fonte pro seu repo, igual shadcn/ui | Sim — zero módulo nativo próprio; é composição de `react-native-svg`, `react-native-reanimated`, `@rn-primitives/*` (tudo no allowlist do Expo Go) | MIT |
| gluestack-ui (v2/v3/v5) | NativeWind v4 (mesmo o CLI do v5 na npm depende de `nativewind@^4.1.23`, não v5) | Alta, mas maior superfície: pacote `gluestack-ui` CLI hoje publica `5.0.3` (dist-tag `latest`) e `3.0.12` (dist-tag `v3-stable`) — múltiplas major convivendo, curva de decisão de qual major usar | CLI próprio (`npx gluestack-ui init`) | Sim, componentes puramente NativeWind + RN | MIT |
| Tamagui | Compilador próprio (não é NativeWind) | Alta, mas é outro paradigma de estilização (compila JSX em tempo de build) | Setup próprio, não usa classes Tailwind nativamente | Sim, mas exige `babel-plugin` do Tamagui — **não é "NativeWind puro"**, é uma engine paralela. Pode compilar sintaxe parecida com Tailwind mas não é NativeWind. | MIT |
| NativeBase | — | **Descontinuado**. O próprio mantenedor anuncia: "NativeBase has evolved into gluestack-ui! Visit https://gluestack.io" — não usar em projeto novo. | — | — | — |
| NativeWind puro + primitivos próprios | — | Você escreve tudo | Nenhuma | Sim | — |

**Critério de decisão (fundo branco, visual limpo, formulário/bottom sheet/dialog/progress/badge/avatar, Expo Go):**
- react-native-reusables cobre exatamente esse conjunto de componentes (inputs, dialog, bottom sheet via `@gorhom/bottom-sheet` — que roda em Expo Go para casos básicos —, progress, badge, avatar) com o mesmo padrão shadcn: você copia o código para dentro do projeto, então zero dependência de versão de biblioteca de UI runtime, só as libs primitivas (`react-native-svg`, `react-native-reanimated`, `react-native-gesture-handler`) que já estão no allowlist do Expo Go.
- gluestack-ui é a opção mais "empacotada" (runtime real como dependência), tecnicamente também funciona e também tem os componentes pedidos, mas hoje convive com 3 majors publicadas (v2/v3/v5) — mais decisão de versão para um hackathon com pouco tempo.
- Tamagui entra em conflito de "modelo mental" com NativeWind (motor de estilização próprio); não é a integração mais direta quando a restrição do projeto já é "NativeWind".
- NativeBase está descontinuado — não usar.

Fontes: [react-native-reusables (GitHub)](https://github.com/founded-labs/react-native-reusables), [reactnativereusables.com](https://reactnativereusables.com/), npm registry (`@react-native-reusables/cli`, `gluestack-ui`), [gluestack-ui v2 blog](https://gluestack.io/blogs/gluestack-ui-v2-is-here), [NativeBase → gluestack-ui announcement](https://nativebase.io/blogs/road-ahead-with-gluestack-ui), [npm `native-base`](https://www.npmjs.com/package/native-base).

---

## 3. Compatibilidade com Expo Go

**RECOMENDAÇÃO: evitar `react-native-mmkv` e `@gorhom/bottom-sheet` em recursos avançados dentro do Expo Go; usar `expo-sqlite`, `react-native-svg`, `@shopify/flash-list` e `expo-image-picker` sem medo — todos rodam em Expo Go.**

| Biblioteca | Quebra o Expo Go? | Detalhe |
|---|---|---|
| `react-native-mmkv` | **Sim, quebra.** | Expo Go não expõe JSI para módulos de terceiros custom; issues abertas confirmam "is not supported in Expo Go" (`mrousavy/react-native-mmkv#549`, `#966`). Precisa de dev build (EAS Build / prebuild). |
| `@shopify/flash-list` | **Não quebra — está no Expo Go.** | v2 (`2.3.2` no npm) é JS-only (sem dependência nativa própria) e roda em Expo Go a partir do SDK 55+, sem dev client. Confirmado também no [doc oficial da Expo](https://docs.expo.dev/versions/latest/sdk/flash-list/). |
| `react-native-bottom-sheet` / `@gorhom/bottom-sheet` | **Parcial — funciona para casos básicos no Expo Go, mas o pacote é uma composição de Reanimated + Gesture Handler + `react-native-portalize`; funcionalidades mais avançadas recomendam dev build.** | Não usa nenhum módulo nativo próprio fora do allowlist (é reanimated/gesture-handler puro), então tecnicamente roda no Expo Go; a ressalva "básico no Expo Go, tudo em dev build" vem da própria documentação da lib. |
| `react-native-svg` | **Não quebra — está no Expo Go** (é dependência first-class do Expo, documentada em `docs.expo.dev/versions/latest/sdk/svg`). |
| `expo-sqlite` | **Não quebra — está no Expo Go.** É um módulo Expo nativo já embutido no runtime do Expo Go. |
| `react-native-skia` (`@shopify/react-native-skia`) | **Quebra o Expo Go padrão** — precisa de custom dev client; o managed workflow da Expo suporta Skia só via dev build, não no app Expo Go publicado na loja. |

Conclusão prática para o Desfeed: como a distribuição por QR code exige Expo Go, **não usar MMKV nem Skia**. `expo-sqlite`, `react-native-svg` e `@shopify/flash-list` são seguros. `@gorhom/bottom-sheet` é seguro para o caso de uso do app (bottom sheet de formulário/detalhe, não física avançada de gesto).

Fontes: [mrousavy/react-native-mmkv#549](https://github.com/mrousavy/react-native-mmkv/issues/549), [#966](https://github.com/mrousavy/react-native-mmkv/issues/966), [Expo flash-list docs](https://docs.expo.dev/versions/latest/sdk/flash-list/), [Expo svg docs](https://docs.expo.dev/versions/latest/sdk/svg/), [Expo sqlite docs](https://docs.expo.dev/versions/latest/sdk/sqlite/), [gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet), [Expo third-party libraries doc](https://docs.expo.dev/versions/latest/sdk/third-party-overview/).

---

## 4. Feed vertical performático (estilo TikTok/Reels)

**RECOMENDAÇÃO: `FlatList` nativo com `pagingEnabled` + `snapToInterval` (altura da tela), NÃO FlashList v2 e NÃO um motor manual Reanimated/gesture-handler.**

Justificativa: os cards do Desfeed são **conteúdo textual** (pergunta, texto), não vídeo pesado — o cenário onde FlashList (recycling de views para performance de listas gigantes/heterogêneas) e virtualização agressiva compensam o custo de setup é quando você tem centenas de itens complexos ou mídia pesada por item. Para um feed de cards de texto com paginação por tela cheia:
- `FlatList` com `pagingEnabled`, `snapToInterval={SCREEN_HEIGHT}`, `decelerationRate="fast"`, `getItemLayout` fixo e `windowSize`/`initialNumToRender` baixos já entrega scroll suave estilo Reels sem código de gesto customizado.
- `@shopify/flash-list` v2 tem ganho real (até 5x FPS de UI thread em Android de entrada) quando a lista é grande e os itens variam de tamanho/tipo — não é o caso aqui, e adiciona complexidade de `getItemType`/`drawDistance` que não paga pra si em texto simples. Ainda assim, como v2 roda em Expo Go (item 3), é um upgrade de baixo risco se o app crescer para incluir imagem/vídeo nos cards depois.
- Motor manual com `react-native-gesture-handler` + `react-native-reanimated` (paginação por gesto customizado) dá controle total de física de swipe, mas é o approach de maior esforço de implementação — só compensa se precisar de física de swipe não-padrão (ex.: resistência assimétrica, swipe horizontal simultâneo). Para o prazo de hackathon, não é o caminho de menor esforço.

Referência de implementação: [flash-list docs — recycling e getItemType](https://shopify.github.io/flash-list/docs/) (para quando migrar depois) e o padrão consagrado de `FlatList pagingEnabled` para feeds full-screen (usado em inúmeros clones de Reels em RN, ex. [React-Native-FlatList-Video-Feed](https://github.com/471Q/React-Native-FlatList-Video-Feed) — mesmo sendo vídeo, a técnica de paginação por tela é idêntica para texto).

---

## 5. FSRS (Free Spaced Repetition Scheduler)

**RECOMENDAÇÃO: `ts-fsrs` (npm).**

- Versão atual (registry npm, checado agora): **`5.4.2`**
- Licença: **MIT**
- `engines.node: ">=20.0.0"` — mas isso é apenas o mínimo de Node para build/test do pacote em si; o pacote é publicado em **ESM + CommonJS + UMD** e não usa nenhuma API exclusiva de Node (não usa `fs`, `crypto` do Node, etc.) — implementa o algoritmo FSRS puramente em TypeScript/matemática, então **funciona em React Native/Expo (JS engine Hermes) sem polyfill**. Repos e demos da comunidade já usam `ts-fsrs` em apps mobile.
- Implementa o **algoritmo FSRS v6** — agenda intervalos de revisão a partir de `stability` e `difficulty`, com `request_retention` configurável (0.0–1.0) controlando o quanto o app tolera esquecimento antes de reagendar.
- API básica de agendamento:
  ```ts
  import { createEmptyCard, fsrs, generatorParameters, Rating } from "ts-fsrs";

  const f = fsrs(generatorParameters({ request_retention: 0.9 }));
  let card = createEmptyCard();
  const now = new Date();
  const schedulingCards = f.repeat(card, now);
  // schedulingCards[Rating.Good].card -> próximo estado do card após acerto
  card = schedulingCards[Rating.Good].card;
  ```
- Não é necessário buscar alternativa — é a implementação de referência do próprio time `open-spaced-repetition` (mesmo grupo que mantém o FSRS original usado no Anki moderno).

Fontes: [ts-fsrs npm](https://www.npmjs.com/package/ts-fsrs), [ts-fsrs GitHub](https://github.com/open-spaced-repetition/ts-fsrs), registry npm (`ts-fsrs`).

---

## 6. Persistência local no Expo Go

**RECOMENDAÇÃO: `expo-sqlite` + `drizzle-orm` (com o driver `expo-sqlite` do Drizzle).**

| Opção | Roda no Expo Go? | Ajuste para "milhares de cards + histórico de revisão" |
|---|---|---|
| **expo-sqlite + drizzle-orm** | **Sim.** `expo-sqlite` é módulo nativo Expo já embutido no runtime do Expo Go — versão atual `expo-sqlite@57.0.3` (pareada ao SDK 57); `drizzle-orm` atual `0.45.2` tem driver oficial para `expo-sqlite` (`drizzle-orm/expo-sqlite`) com type-safety total, migrations e queries relacionais reais (joins, filtros, ordenação por `stability`/`due date` do FSRS). | Ótimo — é banco relacional real, aguenta dezenas de milhares de linhas sem esforço, e cobre exatamente o padrão de consulta do FSRS (buscar cards com `due <= now`, ordenar por prioridade). |
| `op-sqlite` (+ drizzle) | **Não roda no Expo Go** — usa JSI direto e exige build nativo (dev client / EAS Build), não funciona sem prebuild. | Mais rápido em cargas muito grandes/joins pesados, mas não serve para o requisito "precisa rodar no Expo Go" — descartado por essa restrição, não por performance. |
| `AsyncStorage` | Roda no Expo Go, mas é key-value puro. | Ruim para "milhares de cards + histórico": sem query relacional, sem filtro/ordenação nativos, limite de tamanho no Android historicamente baixo (6MB por padrão) — você reimplementaria um mini-banco em JS por cima, sem necessidade. |
| `expo-file-system` | Roda no Expo Go, mas é I/O de arquivo bruto (JSON, etc). | Serve para blobs (ex. cache de imagem), não para dado estruturado consultável — mesma reimplementação de índice manual que o AsyncStorage, sem ganho. |

Para "milhares de cards + histórico de revisão FSRS" dentro da restrição de rodar no Expo Go, `expo-sqlite` é literalmente a única opção nativa com suporte a query relacional que roda sem dev build — `drizzle-orm` só entra para dar tipagem e migrations em cima dele, sem custo de compatibilidade.

Fontes: [Expo SQLite docs](https://docs.expo.dev/versions/latest/sdk/sqlite/), [Drizzle ORM — Expo SQLite](https://orm.drizzle.team/docs/sqlite/connect-expo-sqlite), [OP-Engineering/op-sqlite-drizzle-example](https://github.com/OP-Engineering/op-sqlite-drizzle-example) (confirma exigência de build nativo), registry npm (`expo-sqlite`, `drizzle-orm`).

---

## 7. Sala ao vivo (estilo Kahoot)

**RECOMENDAÇÃO: `socket.io` (server `socket.io` sobre o HTTP server do Fastify + client `socket.io-client` no Expo).**

Comparativo para o critério dado (~40 alunos por sala, latência de segundos é aceitável, 24h de prazo):

| Opção | Encaixe |
|---|---|
| **Socket.IO** | Tem **rooms** nativos (`socket.join(pin)`, `io.to(pin).emit(...)`) — exatamente o modelo "professor cria sala com PIN, alunos entram na sala e recebem broadcast" — reconexão automática, fallback de transporte e um client React Native maduro (`socket.io-client` funciona no Expo Go sem módulo nativo, é JS puro sobre WebSocket/polling). Para 40 conexões simultâneas por sala é trivial, e a curva de setup em cima de um servidor Fastify já existente é baixa (o Socket.IO engine escuta no mesmo servidor HTTP). |
| `@fastify/websocket` (WS puro) | Mais leve, mas você reimplementa manualmente rooms, reconexão e fallback — para 24h de prazo é trabalho extra sem necessidade, já que o ganho de "WS puro" (menos overhead de protocolo) não importa em uma sala de 40 pessoas com tolerância de latência de segundos. |
| SSE (`Server-Sent Events`) | Só unidirecional (servidor → cliente) — você ainda precisaria de um POST HTTP separado para "aluno responde", perdendo a simetria de canal único que o Kahoot-like precisa (host manda pergunta, aluno responde, host recebe contagem em tempo real). Funciona, mas é mais peça móvel para o mesmo resultado. |
| Supabase Realtime | Ótimo se o backend já fosse Supabase/Postgres — aqui o backend é Node/Fastify custom, então adicionar Supabase só para o realtime introduz uma segunda infraestrutura (autenticação, projeto, chaves) que não teria uso em nenhuma outra parte do sistema — custo de integração maior que o ganho, dado o prazo. |
| Ably / Pusher | Serviços gerenciados robustos e com garantias de entrega/histórico melhores que Socket.IO — mas para 40 usuários e 24h, o tempo de configurar conta, canais e chaves de API supera o benefício frente a rodar Socket.IO no mesmo processo Fastify que já existe. |
| PartyKit | Roda em Cloudflare Durable Objects (estado por "party"/sala) — elegante para esse exato caso de uso, mas exige mover a lógica de sala para a infraestrutura do PartyKit (fora do seu Fastify), o que é uma migração de arquitetura desnecessária quando o time já tem um backend Fastify rodando. |

Socket.IO ganha por já ter o conceito de "sala com PIN" pronto (`rooms`), rodar embutido no Fastify existente (zero infra nova) e ter client RN/Expo estável — o encaixe mais direto para o prazo e escala pedidos.

Fontes: [Socket.IO vs Supabase Realtime (Ably)](https://ably.com/compare/socketio-vs-supabase), [PartyKit](https://www.partykit.io/), [Fastify WebSocket docs](https://www.videosdk.live/developer-hub/websocket/fastify-websocket), registry npm (`socket.io`, `@fastify/websocket`).

---

## 8. IA para gerar cards a partir de foto

*(Baseado na skill `claude-api`, não em memória.)*

**RECOMENDAÇÃO: `claude-sonnet-5` via endpoint `POST /v1/messages` (Messages API), com o texto e a imagem no mesmo bloco de conteúdo `user` e `output_config.format` (structured outputs) para forçar JSON das 10 perguntas.**

- **Modelos com visão em 2026** (ids corretos, confirmados na skill `claude-api`, que é fonte de verdade sobre isso — não confiar em memória de treinamento): `claude-opus-5`, `claude-sonnet-5`, `claude-haiku-4-5`, além de `claude-fable-5`/`claude-mythos-5` (topo de linha, fora do escopo de custo/benefício aqui). **Não existe mais `claude-3-*` ativo em uso recomendado** — são modelos antigos e a maioria já retirada.
- **Endpoint correto:** `https://api.anthropic.com/v1/messages` — bloco de imagem via `{"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": "<base64>"}}` no array `content` do `user`, junto com o bloco `text` do prompt. Documentação oficial: [platform.claude.com/docs/en/build-with-claude/vision](https://platform.claude.com/docs/en/build-with-claude/vision).
- **Para OCR de caderno manuscrito + geração de 10 perguntas — custo/benefício:**
  - **`claude-sonnet-5`** é a recomendação: é o modelo com melhor equilíbrio custo/qualidade para essa tarefa (OCR de letra manuscrita variável exige boa visão + geração de perguntas exige raciocínio sobre o conteúdo extraído — Sonnet cobre as duas pontas sem o custo do Opus).
    - Preço: **US$ 2,00 / 1M tokens de entrada e US$ 10,00 / 1M de saída** (preço introdutório vigente até 2026-08-31; depois volta a US$ 3,00/US$ 15,00) — imagens custam como tokens de entrada, uma foto típica de caderno fica na faixa de ~1.000–1.600 tokens de imagem.
    - `claude-haiku-4-5` é mais barato (US$ 1,00/US$ 5,00 por 1M tokens) mas tem resolução de visão menor (sem o tier de alta resolução que Sonnet 5/Opus 5 têm — 2576px no lado maior) e é o modelo mais fraco em letra manuscrita degradada/foto de celular tremida — risco de errar a transcrição em caligrafia ruim.
    - `claude-opus-5` entrega a melhor qualidade de OCR + geração, mas o custo (US$ 5,00/US$ 25,00 por 1M) não se paga para essa tarefa recorrente de baixo risco (gerar flashcards, não é diagnóstico médico).
  - Use `output_config: {format: {type: "json_schema", schema: {...}}}` (structured outputs, suportado por `claude-sonnet-5`) para receber diretamente um JSON `{"cards": [{"question": "...", "answer": "..."}, ...]}` com 10 itens, sem parsing manual de texto livre.
- **Exemplo de request (TypeScript/Node, alinhado ao backend Fastify do item 7):**
  ```ts
  const response = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64Image } },
        { type: "text", text: "Extraia o conteúdo desta página de caderno e gere 10 perguntas de múltipla escolha sobre o assunto." },
      ],
    }],
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            cards: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  answer: { type: "string" },
                },
                required: ["question", "answer"],
                additionalProperties: false,
              },
            },
          },
          required: ["cards"],
          additionalProperties: false,
        },
      },
    },
  });
  ```

Fonte: skill `claude-api` (referência interna de versões/preços de modelo, setembro/2026) — não confirmado externamente além disso porque a instrução do pedido foi basear a resposta na skill, não em memória.

---

## Resumo — as 8 recomendações em uma linha cada

1. **NativeWind** — usar `4.2.6` (estável, GA), NÃO a v5 (ainda em preview em set/2026); v4 já roda bem com Expo SDK 57/RN 0.86/React 19 e tem patch para Reanimated 4 desde o 4.2.0.
2. **Biblioteca de UI** — `react-native-reusables` (via `@react-native-reusables/cli`), por ser MIT, 100% Expo Go, e cobrir formulário/bottom sheet/dialog/progress/badge/avatar sem runtime extra; NativeBase está descontinuado.
3. **Compatibilidade Expo Go** — `react-native-mmkv` e `react-native-skia` quebram Expo Go; `@shopify/flash-list`, `react-native-svg` e `expo-sqlite` rodam sem problema; `@gorhom/bottom-sheet` funciona no básico.
4. **Feed vertical** — `FlatList` nativo com `pagingEnabled`/`snapToInterval`, já que os cards são texto (não vídeo) — FlashList v2 e engine manual Reanimated só compensariam com mídia pesada ou itens heterogêneos.
5. **FSRS** — `ts-fsrs@5.4.2` (MIT, TypeScript puro, sem dependência de API de Node, roda em Hermes/React Native sem ajuste).
6. **Persistência local** — `expo-sqlite` + `drizzle-orm`, único caminho relacional que roda no Expo Go (op-sqlite exige build nativo, AsyncStorage/expo-file-system não dão query estruturada).
7. **Sala ao vivo** — `socket.io` embutido no servidor Fastify existente, pelo suporte nativo a "rooms" por PIN e client Expo maduro, sem precisar de infra gerenciada extra em 24h.
8. **IA para gerar cards** — `claude-sonnet-5` via `POST /v1/messages` com bloco de imagem + `output_config.format` (JSON schema) para OCR de caderno manuscrito e geração de 10 perguntas, melhor custo/benefício que Opus 5 (mais caro) ou Haiku 4.5 (visão mais fraca em manuscrito).

---

## `package.json` — dependências recomendadas (versões exatas verificadas hoje, 2026-09-12)

```json
{
  "dependencies": {
    "expo": "^57.0.13",
    "expo-router": "~57.0.13",
    "react": "19.2.3",
    "react-native": "0.86.2",
    "react-native-reanimated": "4.5.1",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-safe-area-context": "*",
    "react-native-svg": "^15.2.0",
    "expo-image-picker": "~57.0.10",
    "expo-sqlite": "^57.0.3",
    "drizzle-orm": "^0.45.2",
    "nativewind": "4.2.6",
    "tailwindcss": "3.4.4",
    "@gorhom/bottom-sheet": "^5.2.14",
    "@shopify/flash-list": "^2.3.2",
    "ts-fsrs": "^5.4.2",
    "@tanstack/react-query": "^5",
    "zod": "^3",
    "zustand": "^4",
    "socket.io-client": "^4.8.3",
    "@anthropic-ai/sdk": "latest"
  },
  "devDependencies": {
    "@react-native-reusables/cli": "^0.7.1",
    "drizzle-kit": "latest",
    "typescript": "*"
  }
}
```

```json
// backend (Node/Fastify) — package.json separado
{
  "dependencies": {
    "fastify": "^5",
    "socket.io": "^4.8.3",
    "@anthropic-ai/sdk": "latest"
  }
}
```

**Notas de versão / itens não confirmados:**
- `react-native@0.86.2` e `react@19.2.3` são os pares esperados pelo Expo SDK 57 conforme changelog oficial da Expo — não custeei uma checagem direta de `npm view react-native@0.86.2` porque a última "latest" do registry (`0.87.1`) já é de uma SDK ainda não coberta pelo piso do dono do projeto; mantenha o pin em `0.86.2` para bater com `expo@^57.0.13`.
- `react-native-safe-area-context`: não travei versão exata — instale com `npx expo install react-native-safe-area-context` para a Expo resolver a versão certa da SDK 57 automaticamente (prática recomendada da própria Expo para todo pacote "expo install-recomendado").
- `@anthropic-ai/sdk`: usar `latest` — a skill `claude-api` não fixa uma versão exata de SDK, e o alvo real é o model id `claude-sonnet-5`, não uma versão de pacote.
