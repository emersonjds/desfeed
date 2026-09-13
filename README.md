# Desfeed

![Expo SDK](https://img.shields.io/badge/Expo_SDK-57-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-4.2.6-38BDF8?logo=tailwindcss&logoColor=white)
![FSRS](https://img.shields.io/badge/ts--fsrs-5.4.2-10B981)
![MSW](https://img.shields.io/badge/MSW-mock_da_API-FF6A33)
![Arquitetura](https://img.shields.io/badge/arquitetura-FSD-4F46E5)
![Processo](https://img.shields.io/badge/processo-spec--driven-10B981)
![Expo Go](https://img.shields.io/badge/roda_no-Expo_Go-000020?logo=expo&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

> O feed que devolve em vez de tomar.
> A interface do TikTok, o algoritmo do Ebbinghaus.

App mobile em que cada card do feed é uma **micro-recuperação ativa** do que o aluno estudou.
O conteúdo vem do caderno dele: ele fotografa a página, a IA lê e gera as perguntas — nunca
as respostas. Depois de responder, ele se auto-avalia em quatro graus e o FSRS decide quando
cada card volta. A sessão **acaba de propósito**.

Projeto do **HACKTUDO 2026** (13ª edição). Este repositório é o app do aluno; `desfeed-api` e
`desfeed-web` nascem como repositórios irmãos.

---

## As três invariantes

Não são preferências de interface. São restrições de arquitetura, e cada uma tem teste que
falha se for quebrada.

1. **A IA gera pergunta, nunca resposta pronta.** O estudo do MIT Media Lab (Kosmyna et al.,
   2025) mediu −55% de conectividade neural em quem escreve com LLM. Um produto de estudo que
   entrega resposta pronta vira o problema que diz combater.
2. **A sessão tem fim.** Sem scroll infinito, sem "mais um card", sem notificação fora da
   janela que o aluno escolheu.
3. **O professor vê a turma, nunca o aluno individual.** Agregado por design — é regra de
   schema, não de tela. Os titulares são adolescentes.

---

## Como este projeto foi construído

Desenvolvimento orientado a spec (**SDD**), com agents de IA orquestrados. A ordem importa e
não foi invertida em nenhum momento:

```
docs/briefing.md          o produto e a evidência científica por trás de cada decisão
        ↓
docs/specs/               o design e o RATIONALE — por que X e não Y, qual o trade-off
        ↓
docs/plans/               o plano de implementação em tarefas com TDD
        ↓
.claude/agents/           os agents que executam, cada um com escopo e modelo definidos
```

A regra que sustenta isso: **o agent não constrói melhor do que a instrução que recebeu.**
Spec vaga produz código vago, e nenhuma revisão depois recupera. O tempo gasto delimitando o
trabalho é o que decide o resultado.

Consequência prática no código: *rationale* não mora em comentário, mora na spec. Comentário
que sobrevive no código declara só um fato que o código não mostra — restrição externa, quirk
de biblioteca, decisão de time.

### Os agents

Modelo escolhido por custo-benefício, nunca herdado da sessão.

| Agent | Modelo | Escopo |
|---|---|---|
| `arq` | opus | Arquitetura, contratos entre repos, modelagem, fronteiras de módulo |
| `redteam` | opus | Segurança e privacidade — dado de menor de idade, LGPD, superfície de LLM |
| `mobile` | sonnet | Implementação Expo / React Native |
| `design` | sonnet | Design system e conversão das telas para NativeWind |
| `ia` | sonnet | Pipeline de visão, geração dos cards, ajuste do FSRS |
| `qa` | sonnet | Testes e cobertura |
| `pitch` | sonnet | Narrativa e material de apresentação |
| `scribe` | haiku | Documentação e tarefa mecânica |

`opus` só para raciocínio difícil, `sonnet` como padrão de implementação, `haiku` para o
mecânico. O agent `back`, do repositório da API, está guardado em `docs/agents-outros-repos/`.

---

## Stack

**Expo SDK 57** · React Native 0.86 · expo-router · TypeScript estrito
**NativeWind 4.2.6** · react-native-reusables · TanStack Query · Zustand · Zod
**`ts-fsrs` 5.4.2** · `expo-sqlite` + drizzle · **MSW** enquanto o backend não existe

Arquitetura **FSD**: `app → widgets → features → entities → shared`. Import só desce.

### A restrição que governa as outras

O app precisa rodar no **Expo Go** — é assim que ele é distribuído para teste: QR code, sem
instalação. Dependência que exige módulo nativo customizado está fora (`react-native-mmkv` e
`react-native-skia`, entre outras). Foi por distribuição que escolhemos Expo em vez de React
Native puro, e abrir mão disso anularia a escolha.

### Por que MSW e não dado hardcoded

O app fala com a API de verdade desde o primeiro dia: `fetch` real, hook de query real,
`zod.parse` real na resposta. Em desenvolvimento, quem responde é o MSW.

Componente alimentado por constante nunca exercita carregamento, erro nem lista vazia — e
esses três são metade do trabalho de uma tela. Quando a API subir, some o `setupServer` e
nada mais muda.

---

## Rodando localmente

### Pré-requisitos

- **Node.js 20+** e npm
- **Expo Go** no celular ([iOS](https://apps.apple.com/app/expo-go/id982107779) ·
  [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)) — é o caminho
  mais rápido e não exige Xcode nem Android Studio
- Opcional: Xcode (simulador iOS) ou Android Studio (emulador)

O projeto usa `legacy-peer-deps` via `.npmrc`, então `npm install` resolve sem flag extra.

### Subindo

```bash
git clone https://github.com/emersonjds/desfeed.git
cd desfeed
npm install
npx expo start
```

O terminal imprime um **QR code**. Abra a câmera (iOS) ou o próprio Expo Go (Android) e
aponte — o app carrega em segundos, sem instalação. Celular e computador precisam estar na
mesma rede.

Rede corporativa ou Wi-Fi que bloqueia conexão entre dispositivos costuma quebrar isso. Nesse
caso:

```bash
npx expo start --tunnel
```

### Outras formas

```bash
npx expo start --ios       # simulador iOS (requer Xcode)
npx expo start --android   # emulador Android (requer Android Studio)
npx expo start --web       # navegador, útil para screenshot e demo
```

### Dados mockados

Não é preciso subir backend nenhum. O **MSW** intercepta as chamadas em desenvolvimento e
responde com o mesmo contrato que a API vai expor. Os handlers cobrem caminho feliz, erro e
lista vazia — ficam em `src/shared/api/mocks/`.

### Gerando um APK para testar em outro aparelho

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

O build sai como link de download. Para corrigir algo sem reinstalar no aparelho do testador:

```bash
eas update
```

### Quando algo não sobe

```bash
npx expo start -c                 # limpa o cache do Metro
rm -rf node_modules && npm install
```

Se o Expo pedir um *development build*, alguma dependência saiu do que o Expo Go suporta —
confira o que foi instalado por último. A lista do que é proibido está no `CLAUDE.md`.

### Verificação antes de qualquer merge

```bash
npx tsc --noEmit
npm test                # cobertura mínima de 90% nas quatro métricas
```

---

## Estrutura

```
app/                    rotas do expo-router — só composição
src/
  shared/               primitivos de UI, cliente de API, mocks do MSW
  entities/             modelo do domínio + schema Zod (a fonte da verdade do tipo)
  features/             uma interação com estado
  widgets/              blocos compostos de tela
docs/
  briefing.md           o produto
  specs/                o rationale das decisões
  plans/                o plano de implementação
  design/               telas do Stitch, renders e screenshots do app
  research/             análise competitiva e decisão de stack
.claude/agents/         os agents do projeto
```

## Branches

`master` estável · `developer` integração · `feature/spa-NNN-*` por demanda, saindo de
`developer`. O identificador `spa-NNN` no nome linka automaticamente com o Linear.
