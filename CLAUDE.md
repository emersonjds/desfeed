# Desfeed

Feed vertical de recuperação ativa. A interface do TikTok, o algoritmo do Ebbinghaus.
Projeto do HACKTUDO 2026. Leia `docs/briefing.md` antes de qualquer trabalho — ele tem o
produto, a evidência científica por trás de cada decisão e o escopo por fase. Este arquivo
tem só o que é operacional para escrever código.

## O que o produto é, em uma frase

Cada card do feed é uma pergunta de 15 segundos sobre o que o próprio aluno estudou —
o conteúdo entra por foto do caderno, a IA gera as perguntas, o FSRS decide quando cada
uma volta, e a sessão **acaba de propósito**.

Três invariantes de produto que nenhum código pode quebrar:

1. **A IA gera pergunta, nunca resposta pronta.** O esforço de recuperação é do aluno.
2. **A sessão tem fim.** Sem scroll infinito, sem "mais um card", sem notificação fora da janela configurada.
3. **O professor vê a turma, nunca o aluno individual.** Agregado por design.

## Estrutura

Este repositório **é o app**. Ele se basta: código, agents, configuração e documentação
moram todos aqui. Abrir `desfeed-app/` no editor já carrega os agents.

```
hackathons/hackatudo/
  desfeed-app/                ← este repo — Expo / React Native, o app do aluno
  desfeed-api/                repo irmão, ainda não existe (stack em definição)
  desfeed-web/                repo irmão, painel do professor — fase 2
```

Dentro daqui:

```
.claude/agents/               arq · design · ia · mobile · pitch · qa · redteam · scribe
.claude/settings.json         plugin do Expo
.claude/settings.local.json   config pessoal, fora do git
AGENTS.md                     aviso do template do Expo — leia junto com este arquivo
CLAUDE.md                     este arquivo
app/                          rotas do expo-router
src/                          FSD: shared · entities · features · widgets
assets/
docs/
  briefing.md                 a fonte da verdade do produto
  specs/  plans/  research/
  design/stitch/              telas do Google Stitch — html/ (Tailwind) e png/
  design/render/              as mesmas telas renderizadas em alta resolução
  design/app/                 screenshots do app de verdade rodando
  pitch/                      build_deck.py e o deck gerado
  agents-outros-repos/        agents que pertencem a desfeed-api / desfeed-web
```

### Repos irmãos, cada um se bastando

`desfeed-api` e `desfeed-web` nascerão como repositórios próprios ao lado deste, cada um com
seu `.claude/agents/` e sua documentação — mesmo padrão do `calledit`. O agent `back` já está
escrito e guardado em `docs/agents-outros-repos/back.md`; ele muda de casa no dia em que a
API existir.

Quando isso acontecer, o contrato entre os repos é o **OpenAPI da API**, não um import
compartilhado.

### Regra de isolamento — leia antes de rodar qualquer scaffolder

Você escreve **dentro deste repositório**, nunca acima dele nem nos irmãos.

Antes de rodar qualquer gerador de projeto, confirme o diretório com `pwd` e rode-o de dentro
do alvo. `create-expo-app` já engoliu a pasta pai uma vez aqui e arrastou `docs/` inteiro para
outro lugar. Se um gerador reclamar que o diretório não está vazio: **pare e pergunte** — não
limpe, não mova, não force.

## Stack (travada — não reabra sem falar com o Emerson)

**Mobile** · Expo SDK 57 · React Native 0.86 · expo-router · TypeScript estrito
NativeWind **4.2.6** (GA — *não* a v5, ainda preview) · react-native-reusables (shadcn portado)
TanStack Query · Zustand · Zod · `ts-fsrs@5.4.2` · `expo-sqlite` + `drizzle-orm`
**MSW** (`msw@2` via `msw/native` + `react-native-url-polyfill`) — mocka a API enquanto o
backend não existe

### Enquanto não há backend: MSW, não dado hardcoded

O app fala com a API de verdade desde o primeiro dia — `fetch` real, hook de query real,
`zod.parse` real na resposta. O que muda é só quem responde: em desenvolvimento, o MSW
intercepta. Handlers em `src/shared/api/mocks/`, ligados apenas em `__DEV__`.

Isso não é preferência de teste: componente que recebe dado hardcoded nunca exercita estado
de carregamento, de erro nem de lista vazia — e esses três são metade do trabalho. Quando o
backend subir, some o `setupServer` e nada mais muda.

**Backend** · Node · Fastify · `fastify-type-provider-zod` · `@fastify/swagger` · socket.io · PostgreSQL

**IA** · `claude-sonnet-5` via `/v1/messages`, bloco de imagem + JSON schema de saída

### A restrição que governa as outras

O app **precisa rodar no Expo Go**. É assim que o Emerson distribui para testadores: QR code,
sem instalação. Se uma dependência exige módulo nativo customizado, ela está fora.

Quebram o Expo Go: `react-native-mmkv`, `react-native-skia`.
Rodam: `@shopify/flash-list`, `react-native-svg`, `expo-sqlite`, `expo-camera`,
`expo-image-picker`, `expo-haptics`, `reanimated`, `gesture-handler`, `@gorhom/bottom-sheet`.

Precisa de algo fora dessa lista? Pare e pergunte. A alternativa é development build,
que custa o teste por QR — decisão do Emerson, não sua.

## Arquitetura

**FSD nas duas pontas do front**: `app → widgets → features → entities → shared`.
Import só desce. Tela não importa de tela. Se um primitivo não existe em `shared/ui/`,
proponha criá-lo **uma vez** ali — não duplique estilo em cada tela.

**Backend**: vertical slices + clean architecture. Swagger/OpenAPI sempre em dia — é o
contrato que o painel web do professor vai consumir na fase 2. Todo endpoint nasce
pensando nas duas pontas.

## Design system

Extraído das telas do Stitch em `docs/design/stitch/`. **Fundo branco, ícone branco** —
as 8 variantes dark foram descartadas.

```
primary        #10b981   ação, acerto, progresso
primary-deep   #059669   sombra sólida inferior, estado pressionado
surface        #ffffff   fundo de tela e de card
surface-soft   #faf8ff   agrupamentos e seções
border         #cbd5e1   divisores, sombra sólida neutra
border-soft    #dfe2f1
text           #0f131d   títulos e corpo
text-muted     #131b2e
accent         #4f46e5   índigo — arcos do ícone, dado secundário
```

Raio: `rounded-full` em pílula e badge · `rounded-xl` / `rounded-2xl` em card.
**Sombra estilo Duolingo — sólida, sem blur**: `shadow-[0_4px_0_0_#059669]` no botão
primário, `shadow-[0_2px_0_0_#cbd5e1]` no neutro.

### Convertendo tela do Stitch

O Stitch exporta HTML + Tailwind e NativeWind usa as mesmas classes, então o trabalho
não é reescrever estilo — é trocar a árvore: `div`→`View`, `p`/`span`→`Text`,
`img`→`Image`, `button`→`Pressable`. Derrube o que só existe na web: `hover:`, `grid`,
`position: fixed`, pseudo-elementos. Todo texto vive dentro de `<Text>`, sem exceção.

## Regras de código

TypeScript extremamente bem tipado: sem `any`, sem `as unknown as`, sem cast desnecessário
— anotação direta ou `satisfies` antes de `as`. Named exports. Arrow functions. Early return.
Sem abreviação em nome de variável.

**Comentário**: nunca o óbvio. Quanto mais explicação o código precisa, pior ele está —
melhore o código. O comentário que sobrevive declara um fato que o código não mostra:
restrição externa, quirk de biblioteca, decisão de time.

- **Teste do destino.** Se o comentário caberia na spec, ele pertence à spec. *Rationale*
  (por que X e não Y, qual o trade-off, o que isso protege) mora em `docs/specs/`. No código
  fica só o fato que faria alguém "consertar" errado se não estivesse ali.
- **Conectivo denuncia.** "então", "porque", "para que", "assim", "ou seja" quase sempre
  marcam explicação disfarçada de comentário. Reescreva o código.
- **Sinal de desvio.** Comentário passando de ~5% das linhas de um módulo é sintoma, não
  meta — pare e releia o que dá para apagar. É gatilho de revisão, não limiar de build.

**Mobile first de verdade**: projete em 375px primeiro. Zero rolagem horizontal. Alvo de
toque ≥44px. Campo de formulário com fonte ≥16px — abaixo disso o iOS dá zoom sozinho.
Vale também no painel web do professor: ele abre no celular, em pé, na sala de aula.

**Reuse antes de criar.** Procure no projeto, na feature vizinha e no template que o projeto
já adota. O `permutar-app` (`~/Documents/workspace/spark/permutar/permutar-app`) roda a mesma
stack Expo e é referência de FSD; o `calledit-api` é referência de Fastify + Zod + Swagger.

**Zod na fronteira de confiança**, sempre: saída do LLM, payload da API, deep link de PIN,
evento de socket. Nada entra sem parse.

## Verificação

```bash
# desfeed-app
npm run typecheck && npm run lint && npm test
# desfeed-api
npm run type-check && npm run lint && npm test
```

Cobertura mínima **90% nas quatro métricas** (statements, branches, functions, lines),
com o limiar travado na suíte. Nunca afirme que passou sem ter rodado — cole a saída real.

## Git

Conventional Commits **em inglês**. Mensagem como título de PR: propósito, não lista de
arquivos. Micro commits, um contexto por commit.

Autor e committer são sempre `Emerson Silva <emerson_jdss@hotmail.com>`.
**Zero rastro de LLM**: sem `Co-Authored-By`, sem 🤖, sem menção a Claude/Anthropic/IA em
mensagem, corpo, PR ou comentário.

**Nenhum subagente commita — nunca.** Agent de implementação entrega o trabalho no working
tree e reporta. Quem commita é o orquestrador, sempre com autor **e** committer
`Emerson Silva <emerson_jdss@hotmail.com>`. A autoria do projeto é exclusivamente dele.

### Fluxo de branch — um por vez, em sequência

```
developer ──┬─> feature/spa-NNN-descricao ──> merge em developer
            └─> (só então) próxima feature, saindo de developer atualizada
```

Uma branch por demanda, criada **a partir da `developer` já atualizada**. Implementa,
verifica, commita, faz merge em `developer`, apaga a branch. Só depois começa a próxima.

Nunca crie várias branches de feature de uma vez: branch vazia apontando para o mesmo commit
não é fluxo, é lista — e esconde qual trabalho realmente saiu de qual base.

**`developer → master` é a mão do Emerson.** Nada entra em `master` por outro caminho.

## Agents

`.claude/agents/` — `arq`, `mobile`, `design`, `ia`, `qa`, `redteam`, `pitch`, `scribe`.
Cada um tem escopo e modelo no próprio frontmatter. O agent `back` pertence ao repo da API e
está guardado em `docs/agents-outros-repos/back.md`.

Modelo por custo-benefício: **opus** só para raciocínio difícil (`arq`, `redteam`), **sonnet**
como padrão de implementação e revisão, **haiku** para o mecânico (`scribe`). Subagente nunca
herda o modelo da sessão.
