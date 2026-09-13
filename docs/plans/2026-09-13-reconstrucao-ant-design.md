# Reconstrução da interface com Ant Design Mobile — Plano

> Spec: `docs/specs/2026-09-13-migracao-ant-design-mobile.md`. Leia antes.

**Goal:** Trocar toda a camada visual do app por componentes do `@ant-design/react-native`, com cara de aplicativo nativo, usando o design do Stitch como referência visual — nunca como código a transliterar.

**O que é preservado integralmente:** `src/entities/`, `src/shared/api/`, `src/features/daily-session/` e os 3 testes de invariante. O problema nunca esteve na camada de dados.

**O que é jogado fora:** NativeWind, `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`, todo `className`, `src/shared/ui/` inteiro e as telas em `app/`.

---

## Constraints globais

- **`@ant-design/react-native@5.4.3`** — nunca `antd-mobile`, que é React DOM e recriaria o problema.
- Estilo na ordem: **token de tema → prop do componente → `StyleSheet.create` → componente novo**. Nada de `className`, nada de `style={{}}` solto em JSX.
- Ícones de `@ant-design/icons-react-native`. **Zero emoji.**
- Roda no **Expo Go** — nenhuma dependência com módulo nativo customizado.
- TypeScript estrito: sem `any`, sem `as unknown as`. Named exports, arrow functions, early return.
- **Nada de aritmética de pixel para caber na tela.** Flex distribui espaço; `onLayout` para calcular tamanho de filho é sinal de caminho errado.
- Subagente **não commita**. Entrega no working tree e reporta.

### Paleta → tokens do tema

```
brand_primary #10b981 · brand_primary_tap #059669 · fill_base #ffffff · fill_body #faf8ff
color_text_base #0f131d · color_text_caption #6b7280 · border_color_base #cbd5e1
border_color_thin #dfe2f1 · brand_success #10b981 · brand_error #b91c1c · brand_warning #b45309
```

Fonte: **Plus Jakarta Sans** via `expo-font`, aplicada nos tokens de fonte do tema.

### Referência visual

`docs/design/render/` — `feed.png` · `sessao-concluida.png` · `escanear.png` · `cadernos.png` · `ranking.png` · `perfil.png` · `configuracao.png` · `detalhe-caderno.png`.

**Abra o PNG e olhe.** Não abra o HTML em `docs/design/stitch/html/` para copiar estrutura — foi exatamente isso que produziu a versão que estamos jogando fora.

### O loop de verificação

```bash
npx expo start --web --port 8099 &
```

Screenshot com emulação real de iPhone (Chrome headless mente: `--window-size` dimensiona o PNG mas o viewport fica preso em 500px — já custou horas neste projeto):

```bash
cd /Users/emerson/Documents/workspace/hackathons/calledit/calledit-web
cat > shot.mjs <<'EOF'
import { chromium, devices } from '@playwright/test'
const routes = process.argv[3].split(',')
const browser = await chromium.launch()
const ctx = await browser.newContext({ ...devices['iPhone 13 Pro'] })
const page = await ctx.newPage()
for (const r of routes) {
  await page.goto('http://localhost:8099/' + r, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${process.argv[2]}/${r || 'index'}.png` })
  console.log(r, await page.evaluate(() => innerWidth))
}
await browser.close()
EOF
node shot.mjs <destino> feed,escanear,ranking,cadernos
```

Confirme `innerWidth === 390` antes de confiar na imagem. Depois **abra o PNG e compare com a referência**.

---

### Tarefa 1: Fundação — remover NativeWind e montar o tema

**Arquivos:** remover `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`, `src/shared/ui/`; criar `src/shared/theme/index.ts`; reescrever `app/_layout.tsx`, `babel.config.js`, `metro.config.js`, `package.json`.

- [ ] Desinstalar `nativewind` e `tailwindcss`; tirar o preset do `babel.config.js` e do `metro.config.js`
- [ ] `src/shared/theme/index.ts` exporta o objeto de tema com a paleta acima, tipado contra o tema padrão do Ant Design
- [ ] `app/_layout.tsx` envolve a árvore em `<Provider theme={desfeedTheme}>`, mantendo `SafeAreaProvider`, `QueryClientProvider` e o carregamento da Plus Jakarta Sans
- [ ] `grep -rn "className\|nativewind\|tailwind" app src package.json` volta vazio
- [ ] `npx tsc --noEmit` limpo e `npx expo export --platform ios` gera bundle

### Tarefa 2: Feed — a tela que define o produto

**Referência:** `docs/design/render/feed.png`

Header com logo, streak e XP · `Progress` da meta diária · `Tag` de contexto (caderno, revisão FSRS) · anel de timer · card com imagem e selos · enunciado com termo destacado · alternativas A–D em `List.Item` · rail lateral · autoavaliação com quatro `Button` mostrando o intervalo calculado pelo `ts-fsrs`.

- [ ] O card inteiro flexa dentro da altura recebida; as quatro alternativas cabem sem corte
- [ ] O intervalo exibido vem do `ts-fsrs`, nunca texto fixo
- [ ] Estados de carregamento, erro e lista vazia usando `Result` do Ant Design
- [ ] Screenshot comparado com a referência

### Tarefa 3: Sessão Concluída

**Referência:** `docs/design/render/sessao-concluida.png`

"Acabou por hoje" · citação sobre esquecer para lembrar · quatro cards de estatística (cards dominados, memória longa, sequência, índice FSRS) · **curva de Ebbinghaus** · janela FSRS otimizada com horário da próxima revisão · bloco "Desconexão Real" · botão "Fechar App e Descansar".

A curva é um gráfico de linha simples com duas séries (com e sem repetição espaçada). Se nenhum componente do Ant Design servir, desenhe com `react-native-svg`, que já está instalado — **não adicione biblioteca de gráfico**.

- [ ] **Nenhum caminho devolve ao feed no mesmo dia** — invariante de produto, com teste
- [ ] Os nomes de ícone não aparecem como texto (bug atual: mostra "pasta", "streak", "xp")

### Tarefa 4: Escanear

**Referência:** `docs/design/render/escanear.png`

Abas Câmera ao Vivo / PDF / Colar · visor com sobreposição de OCR e conceitos detectados · progresso da digitalização · carrossel de flashcards gerados · botão "Iniciar Feed deste Caderno".

- [ ] Estados de processamento honestos, cada um ligado a um `await` real — nunca temporizador fingindo trabalho
- [ ] Confiança baixa na extração é comunicada, não escondida

### Tarefa 5: Cadernos

**Referência:** `docs/design/render/cadernos.png`

Anel de Saúde Sináptica Global · índice de estabilidade · atalho de novo caderno · lista de cadernos com capa, selo de status e ação · **Picos de Esquecimento** por urgência · métricas de foco real.

- [ ] Retenção derivada do estado FSRS, nunca de contagem de acertos

### Tarefa 6: Ranking

**Referência:** `docs/design/render/ranking.png`

Liga com pódio de três · alternância Amigos / Liga Global · cartão do próprio aluno · classificação semanal com zona de promoção e de rebaixamento · card de Micro-Duelo · compartilhar por link.

- [ ] Nenhuma métrica derivada de tempo de tela — XP vem de esforço de recuperação
- [ ] Estado de liga vazia tratado

---

## Verificação final

```bash
npx tsc --noEmit
node --test "src/**/*.test.ts"
npx expo export --platform ios --output-dir /tmp/check
grep -rn "className\|nativewind\|tailwind" app src package.json
```

Os 3 testes de invariante continuam verdes. O `grep` volta vazio. O app abre no Expo Go por QR, sem development build.

E as seis telas comparadas lado a lado com a referência, **com o que ficou diferente declarado** — não escondido.
