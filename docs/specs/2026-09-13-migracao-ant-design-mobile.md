# Migração para Ant Design Mobile — Spec

**Data:** 13 de setembro de 2026
**Substitui:** a camada de estilo de `2026-09-12-desfeed-app-fase1-design.md` (as três invariantes de produto daquela spec continuam valendo; só a forma de construir a interface muda).

---

## 1. Por que jogar fora a camada visual

A primeira tentativa converteu o HTML+Tailwind do Stitch para NativeWind classe por classe. O resultado tem cara de página web dentro de um celular: sem componente nativo, sem gesto nativo, sem comportamento de plataforma. Cada tela precisou de aritmética de pixel para caber, e o conteúdo colidia quando a conta não fechava.

A causa não foi o NativeWind em si — foi **transliterar layout web em vez de construir com componentes de aplicativo**. Trocar a biblioteca sem trocar esse hábito repetiria o erro.

**A regra que passa a valer:** o design do Stitch é **referência visual**, não código-fonte. Olhe o PNG, entenda a intenção, e construa com o componente da biblioteca que já resolve aquilo. Nunca abra o HTML para copiar estrutura.

---

## 2. A biblioteca — e a armadilha do nome

**Escolha: `@ant-design/react-native@5.4.3`.**

Existem dois pacotes parecidos e escolher errado recria exatamente o problema que estamos consertando:

| Pacote | O que é | Serve? |
|---|---|---|
| `antd-mobile` | React **DOM** — componentes para web mobile | **Não.** Renderiza HTML; viraria de novo página dentro do celular |
| `@ant-design/react-native` | Componentes **React Native** de verdade | **Sim** |

**Verificado antes de remover qualquer coisa:**
- Publicado em abril/2026 — mantido.
- Peers satisfeitos pelo que já temos: React 19, RN 0.86.3, Reanimated 4.5.1, gesture-handler 2.32.
- **Todas as dependências são JS puro** — nenhuma exige build nativo, então o app continua rodando no **Expo Go**, que é como ele é distribuído para teste.
- `npx expo export --platform ios` gera o bundle Hermes com componentes do Ant Design na árvore. Provado, não presumido.

---

## 3. Estilização: tema primeiro, `StyleSheet` depois

Ordem obrigatória, do mais barato ao mais caro:

1. **Token de tema.** O `Provider` do Ant Design aceita o objeto de tema inteiro. A paleta do Desfeed entra aí, uma vez, e vale para todos os componentes.
2. **Prop do componente.** Se o componente já expõe o que você quer, use a prop.
3. **`StyleSheet.create`.** Só para o que sobrou.
4. **Componente novo.** Último recurso — e mesmo assim, leia como o componente equivalente do Ant Design está implementado e adapte, em vez de escrever do zero.

**Proibido:** NativeWind, Tailwind, `className`, e estilo inline `style={{}}` espalhado em JSX. O projeto sai da árvore de dependências inteiro.

### Mapa da paleta para os tokens do tema

```
brand_primary        #10b981   (era #108ee9)
brand_primary_tap    #059669
fill_base            #ffffff   fundo de superfície
fill_body            #faf8ff   fundo de tela
color_text_base      #0f131d
color_text_caption   #6b7280   já corrigido para 4,5:1 de contraste
border_color_base    #cbd5e1
border_color_thin    #dfe2f1
brand_success        #10b981
brand_error          #b91c1c
brand_warning        #b45309
```

Tipografia continua **Plus Jakarta Sans** via `expo-font`, aplicada pelos tokens de fonte do tema.

Ícones passam a vir de **`@ant-design/icons-react-native`**, não mais do `@expo/vector-icons`. Zero emoji — isso não mudou.

---

## 4. Que componente resolve cada parte da tela

Construir a partir desta tabela, não a partir do HTML.

| Elemento da tela | Componente | Em vez de |
|---|---|---|
| Card da pergunta | `Card` | `View` com sombra manual |
| Alternativas A–D | `List` + `List.Item` com `arrow={false}` | `Pressable` com sombra desenhada à mão |
| Chips de contexto | `Tag` | pílula própria |
| Barra de meta diária | `Progress` | `View` com largura calculada |
| Botões de autoavaliação | `Flex` + `Button` | quatro `Pressable` com sombra sólida |
| Estado de carregamento | `ActivityIndicator` do Ant Design | `ActivityIndicator` cru |
| Estado vazio / erro | `Result` | composição improvisada |
| Feedback de ação | `Toast` | nada |
| Navegação por abas | `Tabs` do expo-router | — mantém |

**Quando o componente não existir:** leia a implementação do mais próximo em `node_modules/@ant-design/react-native/lib/`, crie o seu seguindo o mesmo padrão de tema e de props, e documente aqui por que precisou. Não improvise um paralelo.

---

## 5. O que não muda

As três invariantes de produto continuam sendo restrição de arquitetura, com teste que falha se forem quebradas:

1. **A IA gera pergunta, nunca resposta pronta.**
2. **A sessão acaba de propósito** — nenhum caminho repopula a fila no mesmo dia.
3. **O professor vê a turma, nunca o aluno individual.**

Também permanecem: arquitetura FSD, TanStack Query, Zustand, Zod na fronteira, `ts-fsrs` com `enable_fuzz: false` e o intervalo visível na tela, MSW respondendo em desenvolvimento, e o app rodando no Expo Go.

**A camada de dados inteira é preservada.** `entities/`, `shared/api/`, `features/daily-session/` e os testes não são tocados — o problema nunca esteve ali.

---

## 6. Bug conhecido a corrigir na migração

`app/sessao-concluida.tsx` e `src/shared/ui/Button.tsx` recebem o nome do ícone como string e o imprimem como texto: a tela mostra as palavras "pasta", "streak" e "xp" no lugar dos glifos. Some naturalmente ao trocar por `@ant-design/icons-react-native`, mas precisa ser conferido no screenshot, não presumido.

---

## 7. Como se verifica

Layout não se julga por typecheck. O loop é:

```bash
npx expo start --web --port 8099 &
# screenshot com emulação real de iPhone via Playwright
```

**Chrome headless não serve para julgar layout**: a flag `--window-size` dimensiona o PNG mas não o viewport de layout, que fica preso em 500px. Isso já custou tempo neste projeto — duas investigações independentes chegaram à mesma conclusão. Use Playwright com `devices['iPhone 13 Pro']` e confirme `innerWidth === 390` antes de confiar na imagem.

Definição de pronto:

- `npx tsc --noEmit` limpo
- `node --test "src/**/*.test.ts"` verde — os 3 testes de invariante continuam passando
- `npx expo export --platform ios` gera bundle
- Abre no **Expo Go** por QR, sem development build
- Nenhuma ocorrência de `nativewind`, `className` ou `tailwind` no `src/`, `app/` ou `package.json`
- As quatro telas comparadas lado a lado com o render de referência, com o que ficou diferente **declarado**, não escondido
