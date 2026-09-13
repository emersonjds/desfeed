# Desfeed App — Spec de Design, Fase 1

> Este documento é o destino do *porquê*. Pela regra de comentário do projeto, rationale não
> mora no código: mora aqui. Quando um agent precisar justificar uma decisão, ele linka esta
> spec em vez de escrever um parágrafo em cima da função.

**Escopo:** app do aluno (`desfeed-app`). Backend e painel web são repositórios irmãos e têm
specs próprias.
**Fonte do produto:** `docs/briefing.md`.
**Data:** 12 de setembro de 2026.

---

## 1. As três invariantes

Não são preferências de UX. São restrições de arquitetura, e cada uma tem um teste que falha
se alguém quebrar.

### 1.1 A IA gera pergunta, nunca resposta pronta

O estudo do MIT Media Lab (Kosmyna et al., 2025) mediu −55% de conectividade neural em quem
escreve com LLM, e 83% de pessoas incapazes de citar uma frase do texto que "escreveram".

Se o Desfeed entregar resposta pronta, ele vira exatamente o problema que diz combater — e o
júri vai perguntar isso. Consequência de código: nenhum endpoint, nenhum prompt e nenhuma
tela devolvem a resposta antes do aluno tentar recuperar.

### 1.2 A sessão acaba de propósito

Sem scroll infinito. Sem "mais um card". Sem notificação fora da janela configurada.

A pesquisa competitiva confirmou que **nenhum concorrente faz isso** — StudyTok, Nibble e
Duolingo monetizam por tempo de tela e por isso *não podem*. Nossa vantagem aqui é estrutural,
não de feature, e é o que responde à objeção mais previsível ("vocês combatem vício com
mecânica de vício?").

Consequência de código: `useDailySession` expõe `isFinished`, e **não existe caminho** que
repopule a fila no mesmo dia. Há teste dedicado.

### 1.3 O professor vê a turma, nunca o aluno individual

Os titulares são adolescentes. A UNESCO documentou que 89% das edtechs da pandemia vigiavam
crianças, e o júri de um festival de cultura digital conhece esse número.

Consequência de código no app: nenhuma tela do aluno expõe identidade de colega; a revelação
da sala ao vivo mostra *quantos* acertaram, nunca *quem*.

---

## 2. Decisões de arquitetura, com o trade-off

### 2.1 Expo em vez de React Native puro

**Escolha:** Expo SDK 57, restrito ao que roda no **Expo Go**.

O critério não foi DX: foi distribuição. QR code no Expo Go para testar em segundos, APK por
link via EAS Build, TestFlight, OTA com `eas update`, e export web como plano B do pitch. RN
puro não entrega nenhum desses sem trabalho manual.

**O custo aceito:** perdemos módulos nativos de terceiros. `react-native-mmkv` e
`react-native-skia` estão proibidos. Se algum dia um deles for indispensável, o caminho é
*development build* — continua Expo, só troca o QR do Expo Go pelo app de dev. Nunca ejetar.

### 2.2 MSW em vez de dado hardcoded

**Escolha:** `msw@2` via `msw/native`, handlers sob `__DEV__`.

O app fala com a API de verdade desde o primeiro dia: `fetch` real, hook de query real,
`zod.parse` real na resposta. O que muda é só quem responde.

**O porquê:** componente alimentado por constante nunca exercita carregamento, erro nem lista
vazia — e esses três são metade do trabalho de uma tela. Com MSW eles aparecem desde o
começo, e quando o backend subir some o `setupServer` e nada mais muda.

**O trade-off aceito:** um pouco mais de cerimônia agora, em troca de não reescrever a camada
de dados depois. Também obriga o contrato da API a existir antes da API — o que é bom, porque
o backend serve duas pontas e o contrato é o entregável.

### 2.3 `FlatList` em vez de FlashList ou engine manual

**Escolha:** `FlatList` com `pagingEnabled` e `snapToInterval`.

Os cards são **texto**, não vídeo. FlashList v2 e uma engine manual com Reanimated compensam
quando há mídia pesada e reciclagem agressiva de célula; aqui pagariam complexidade por um
ganho que ninguém mediu.

**Quando reverter:** se o feed engasgar em Android intermediário **com número medido**. Medir
antes de trocar — não o contrário.

### 2.4 O agendamento FSRS é visível ao aluno

**Escolha:** `ts-fsrs@5.4.2`, `enable_fuzz: false`, e o intervalo exibido na tela ("+3d").

Duolingo (Birdbrain) e Brainscape (CBR) escondem o algoritmo deles. Mostrar o nosso é
diferencial competitivo, não detalhe de interface — é o que transforma "app de quiz" em
"ferramenta que explica o próprio método".

**Por que `enable_fuzz: false`:** o fuzz espalha o agendamento para evitar picos de revisão.
Mas o número está **na tela**. Um intervalo que oscila sem motivo visível quebra a confiança
no algoritmo, que é justamente o que estamos vendendo. Trocamos distribuição de carga por
previsibilidade percebida.

**Onde o estado mora:** o cálculo roda no app para a fila do dia funcionar sem rede, mas o
estado **autoritativo é do servidor** — o mesmo aluno entra pelo feed e pela sala ao vivo, e
memória perdida com o device é o ativo do produto indo embora. A regra de reconciliação está
na seção 4.

### 2.5 A sombra sólida é um primitivo, não uma classe repetida

A assinatura visual do produto é a sombra sólida sem blur do Stitch
(`shadow-[0_4px_0_0_#059669]`). Isso **não existe em React Native**: não há `box-shadow` com
offset e zero blur.

**Escolha:** `src/shared/ui/SolidShadow.tsx` resolve uma vez com uma `View` de fundo
deslocada, e todo componente com volume (`Button`, `Pill`, `Badge`) compõe em cima.

**O porquê:** se cada tela reimplementar, a identidade se desfaz em oito variações e uma
mudança de token vira busca-e-substitui.

---

## 3. Fronteiras de módulo (FSD)

```
app/         rotas do expo-router — só composição, zero lógica de negócio
widgets/     blocos compostos de tela (QuestionCard, FeedList)
features/    uma interação com estado (answer-card, scan-notebook, daily-session)
entities/    modelo do domínio + schema Zod + mapeamento (card, review, session, notebook)
shared/      primitivos de UI, cliente de API, mocks, utilidades
```

Import só desce. **Tela não importa de tela.** Se uma feature quer importar de outra, o
problema é o desenho, não o import: promova o pedaço comum para `entities` ou `shared`.

**Um tipo é a fonte da verdade.** Os schemas Zod em `entities/*/schema.ts` são usados pelo
handler do MSW, pelo cliente de API e pelos componentes — nunca dois tipos para a mesma
coisa. `z.infer<>` deriva, ninguém redigita.

**Parse na borda.** Dado externo vira tipo interno num ponto só (`shared/api/client.ts`), e o
resto do sistema confia.

---

## 4. O caso difícil: reconciliação offline

Cerca de metade das escolas brasileiras tem internet ruim. Offline não é cortesia — é a
diferença entre servir escola pública ou só escola particular.

Isso cria o problema mais difícil do produto: **dois estados de agendamento para o mesmo
card**. O aluno responde no ônibus sem rede; o servidor também tem estado; eles divergem.

**Regra de conflito (a decidir com o `arq` antes de implementar — card SPA-360):**
o ponto de partida proposto é *last-write-wins por `answeredAt`*, com o log de revisão sendo
append-only e a idempotência garantida por chave no cliente. O `review_log` é a fonte da
verdade; `review_state` é derivado e pode ser recalculado.

**Não implemente antes de esta seção estar fechada.** É onde o bug vai morar, e é o que
ninguém lembra de testar.

### Idempotência

O app reenvia quando a rede cai. Toda resposta carrega `idempotencyKey`. A resposta conta
uma vez, o XP sobe uma vez, o streak sobe uma vez. Há teste dedicado.

---

## 5. Erro nunca é silencioso

Toda operação que pode falhar diz ao usuário que falhou, com **texto nosso e fixo**.

**Nunca interpole resposta de servidor na UI**: vaza detalhe de infraestrutura e põe string
não controlada na tela de um menor de idade.

Casos nomeados, porque é onde a implementação ingênua erra:

- **Extração com confiança baixa** no scanner: dizer, e oferecer nova foto. Gerar card ruim
  em silêncio é pior que falhar.
- **Saída malformada do modelo**: rejeitada pelo `zod.parse` com erro útil, sem derrubar a
  tela.
- **Sessão retomada no meio**: volta ao ponto certo sem recontar resposta.
- **Lista vazia** (aluno sem caderno): estado que convida a escanear o primeiro, não uma tela
  em branco.

---

## 6. O que esta fase não entrega

Sala ao vivo, ligas, perfil, configuração do algoritmo, onboarding. Estão no Linear
(SPA-342 a SPA-371) e ganham spec própria.

O corte é a recomendação do dossiê: o regulamento aceita mockup (item 8.3) e diz que
complexidade técnica isolada não pontua (13.3). Vence quem mostra um momento "uau"
funcionando — no nosso caso, o jurado fotografando uma página e deslizando perguntas sobre
ela 30 segundos depois.

---

## 7. Definição de pronto

- `npx tsc --noEmit` limpo, com a saída real colada
- Cobertura ≥90% em statements, branches, functions e lines, com o limiar travado na suíte
- `npx expo start` abre no Expo Go **sem development build**
- As três invariantes da seção 1 têm teste que falha se forem quebradas
- Nenhum segredo no cliente — `grep -r "sk-ant"` volta vazio, inclusive no histórico
- Foto → cards → feed em menos de 30 segundos, cronometrado
