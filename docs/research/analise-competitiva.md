# Análise Competitiva — Desfeed

**Data da pesquisa:** 12/09/2026
**Escopo:** concorrência direta (feed vertical de aprendizagem), concorrência em sala ao vivo, edtech K-12 brasileira, apps de flashcard com IA, algoritmos de repetição espaçada, lacunas de mercado e evidência científica.

> Regra seguida: toda afirmação sobre concorrente tem link de origem. Quando um produto não foi encontrado ou um dado (preço, número de usuários) não pôde ser confirmado, isso está marcado explicitamente como "não encontrado" — nada foi inventado.

---

## 1. Tabela comparativa de concorrentes

| Produto | País | Formato | Geração por IA | Repetição espaçada | Sala ao vivo | Modelo de negócio | Preço |
|---|---|---|---|---|---|---|---|
| **StudyTok** | EUA (app global) | Feed vertical estilo TikTok, swipe entre flashcards/quiz | Sim — foto/PDF/PPTX/vídeo do YouTube → flashcards e questões ([studytok.com](https://studytok.com/), [App Store](https://apps.apple.com/us/app/studytok-learn-and-questions/id6738703017)) | Não encontrado — sem evidência de FSRS/SM-2; usa streak/pontos/leaderboard, não repetição espaçada real ([busca dedicada não retornou algoritmo](https://apps.apple.com/us/app/studytok-learn-and-questions/id6738703017)) | Não | Freemium por assinatura (app) | Não encontrado (valor exato não divulgado nas fontes) |
| **Nibble** | EUA | Feed vertical de microlearning geral (cultura geral, não currículo escolar) | Não encontrado (conteúdo parece curado, não gerado a partir do material do usuário) ([nibble-app.com](https://nibble-app.com/nibble-app-features)) | Não | Não | Assinatura mensal/anual, sem free tier permanente ([nibble-app.com/blog/how-much-is-nibble-app](https://nibble-app.com/blog/how-much-is-nibble-app)) | Não encontrado (valor exato) |
| **Quizlet (Magic Notes)** | EUA | Sets de flashcards + "Quizlet Live" para sala; não é feed vertical infinito | Sim — foto/PDF/Word/Drive → flashcards, resumos, testes ([quizlet.com/features/ai-flashcard-generator](https://quizlet.com/features/ai-flashcard-generator)) | Parcial — modos de estudo com repetição, algoritmo proprietário não documentado como FSRS/SM-2 | Sim (Quizlet Live, em sala, via celular/navegador) | Freemium, recursos de IA atrás de assinatura paga ([quizlet.com/study-guides/upload](https://quizlet.com/study-guides/upload)) | Não encontrado (preço exato do plano Plus) |
| **Knowt** | EUA | Sets de flashcards/quiz, não é feed vertical | Sim — PDF/PPT → flashcards, grátis ([knowt.com/ai-flashcard-maker](https://knowt.com/ai-flashcard-maker)) | Modos de estudo tipo Quizlet; não documentado como FSRS | Não encontrado | Freemium | Ultra: US$ 24,99/mês ou US$ 149,99/ano ([toolchase.com/tool/knowt](https://toolchase.com/tool/knowt/)) |
| **Anki / AnkiDroid** | Open source | Cartões, sem feed | Não (comunidade cria add-ons de IA, não nativo) | **Sim — FSRS-4.5 nativo desde Anki 23.10** ([studycardsai.com/blog/anki-fsrs-algorithm](https://studycardsai.com/blog/anki-fsrs-algorithm), [GitHub fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md)) | Não | Gratuito / open source | Grátis (iOS pago uma vez, historicamente) |
| **RemNote** | EUA | Notas + flashcards | Parcial (assistente de notas) | **Sim — FSRS é o scheduler padrão desde 2024** ([remnote.com/feature/fsrs](https://www.remnote.com/feature/fsrs)) | Não | Freemium | Não encontrado (preço exato) |
| **Mochi** | EUA | Flashcards | Não encontrado | FSRS opcional (não é padrão) ([studyglen.com/guides/best-spaced-repetition-apps](https://studyglen.com/guides/best-spaced-repetition-apps)) | Não | Assinatura | Não encontrado |
| **Brainscape** | EUA | Flashcards | Não encontrado | Não — algoritmo proprietário "CBR" baseado em confiança autodeclarada, não FSRS/SM-2 ([memstride.com/blog/fsrs-vs-sm2-algorithm-comparison](https://memstride.com/blog/fsrs-vs-sm2-algorithm-comparison/)) | Não | Freemium | Não encontrado |
| **Duolingo** | EUA | Lições em módulos, não feed vertical | Sim, gera exercícios adaptativos via "Birdbrain" | **Não usa FSRS/SM-2** — usa modelo próprio (Half-Life Regression → absorvido pelo motor "Birdbrain") ([research.duolingo.com/papers/settles.acl16.pdf](https://research.duolingo.com/papers/settles.acl16.pdf), [buildmvpfast.com](https://www.buildmvpfast.com/blog/ai-learning-personalization-duolingo-ai-driven-lessons-2026)) | Não | Freemium + assinatura Super | Receita Q3 2025: US$ 271,7 milhões ([foundercoho.substack.com](https://foundercoho.substack.com/p/inside-duolingos-6b-playbook-gamification)) |
| **Kahoot!** | Noruega | Quiz ao vivo em sala + modo individual assíncrono | Sim — gerador de quiz por IA (tópico/upload), nos planos superiores ([panquiz.com/en/blog/kahoot-pricing](https://www.panquiz.com/en/blog/kahoot-pricing/)) | Não | **Sim — via PIN, participantes entram grátis** | Freemium; paga-se pelo host, não pelo jogador | Individual US$ 19/mês; Kahoot 360 Pro Start US$ 19/mês, Pro Plus US$ 39/mês, Pro Max US$ 59/mês (anual) ([panquiz.com](https://www.panquiz.com/en/blog/kahoot-pricing/)) |
| **Quizizz (Wayground)** | EUA/Índia | Quiz ao vivo + "homework" assíncrono | Sim, atrás do paywall | Não | Sim, via PIN | Freemium | US$ 19,99/mês individual para IA ([teachfloor.com](https://www.teachfloor.com/blog/blooket-vs-gimkit-vs-kahoot--vs-quizizz)) |
| **Blooket** | EUA | Quiz-jogo ao vivo/assíncrono | Sim — via parceria com Khanmigo (Khan Academy), desde jan/2025 ([teachfloor.com](https://www.teachfloor.com/blog/blooket-vs-gimkit-vs-kahoot--vs-quizizz)) | Não | Sim, via PIN | Freemium | Plus US$ 4,99/mês anual, Plus Flex US$ 9,99/mês ([nibble-app.com/blog/blooket-vs-quizizz](https://nibble-app.com/blog/blooket-vs-quizizz)) |
| **Gimkit** | EUA | Quiz-jogo ao vivo/assíncrono | Sim — gerador de IA próprio, 10–30 perguntas por tópico ([teachfloor.com](https://www.teachfloor.com/blog/blooket-vs-gimkit-vs-kahoot--vs-quizizz)) | Não | Sim, via PIN | Freemium | < US$ 5/mês anual ([teachfloor.com](https://www.teachfloor.com/blog/blooket-vs-gimkit-vs-kahoot--vs-quizizz)) |
| **Wooclap** | Bélgica | Slides interativos + quiz ao vivo | Sim — "Quiz Wizard" gera MCQ/flashcards/preenchimento a partir de PDF/PPT/vídeo/YouTube ([wooclap.com/en/quiz-wizard](https://wooclap.com/en/quiz-wizard/?amp=&amp=)) | Não | Sim, via PIN/código | Freemium | Grátis limitado; Basic US$ 7,99/mês; Pro US$ 14,99/mês (anual) ([kvistly.com](https://kvistly.com/blog/best-mentimeter-alternatives)) |
| **Mentimeter** | Suécia | Slides interativos/enquetes | Sim — gerador de quiz por IA ([mentimeter.com/features/ai-quiz-generator](https://www.mentimeter.com/features/ai-quiz-generator)) | Não | Sim, via código | Freemium | Não encontrado (preço exato 2026) |
| **Nearpod** | EUA | Aulas interativas + quiz | Não encontrado com detalhe | Não | Sim | Freemium | Gold US$ 159/ano, Platinum US$ 397/ano ([classpoint.io](https://www.classpoint.io/blog/audience-response-systems-for-classrooms)) |
| **Pear Deck** | EUA | Slides interativos | Não encontrado com detalhe | Não | Sim | Freemium/institucional | Preço customizado para escolas/redes |
| **Socrative** | EUA | Quiz/enquete em sala | Em desenvolvimento (equipe confirma que ainda está "explorando" IA em 2026) ([myengineeringbuddy.com](https://www.myengineeringbuddy.com/blog/socrative-reviews-alternatives-pricing-offerings/)) | Não | Sim | Freemium | Pro US$ 16,99/professor/mês (anual) ([myengineeringbuddy.com](https://www.myengineeringbuddy.com/blog/socrative-reviews-alternatives-pricing-offerings/)) |
| **Plickers** | EUA | Cartões de resposta física + app | Não encontrado (pesquisa não retornou dados atualizados de 2026) | Não | Sim (sem celular do aluno — é o diferencial do produto) | Não encontrado | Não encontrado |
| **PlayAula** (BR) | **Brasil** | Jogos em sala (quiz, memória, cruzadinha, anagrama, caixa-mistério) | Sim — gera atividade a partir de um tópico digitado ([lp.playaula.com.br](https://lp.playaula.com.br/)) | Não | **Sim — sala com PIN, aluno entra pelo navegador do celular sem instalar app** | Assinatura | R$ 14,90/mês, até 60 alunos por sala ([lp.playaula.com.br](https://lp.playaula.com.br/)) |
| **Unoquizz** (BR) | Brasil | Quiz ao vivo em sala | Não encontrado (site não menciona IA) | Não | Sim, via sala/ranking em tempo real | Freemium ("começar gratuitamente") | Não divulgado ([unoquizz.com.br](https://unoquizz.com.br/)) |
| **Educa AI** (BR) | Brasil | Ferramentas de IA para professor (quiz ao vivo, correção automática, alertas) | Sim | Não encontrado | Sim (mencionado, não detalhado) | Não encontrado | Não encontrado ([educa-ai.pro](https://educa-ai.pro/)) |
| **Plurall (SOMOS Educação)** | Brasil | Plataforma didática + apostila digital | Sim — "Plurall IA" gera questões, listas de exercícios e planos de aula a partir do material didático do aluno ([blogsomoseducacao.com.br/plurall-ia](https://blogsomoseducacao.com.br/plurall-ia/)) | Não encontrado | Não encontrado | B2B2C via escolas (material didático licenciado) | Não divulgado publicamente |
| **Árvore** | Brasil | Plataforma de leitura gamificada (livros/audiolivros) | Parcial — IA acompanha alfabetização/letramento, não gera cards de revisão ([arvore.com.br](https://www.arvore.com.br/)) | Não | Não | B2B via escolas (11 mil+ escolas, 2 milhões de alunos) ([arvore.com.br](https://www.arvore.com.br/)) | Não divulgado (licenciamento escolar) |
| **Descomplica** | Brasil | Videoaulas + lives + exercícios (cursinho ENEM/vestibular) | Não encontrado com evidência de geração por foto | Não | Não (lives com professor, não formato Kahoot) | Assinatura direta ao aluno | A partir de R$ 29,90/mês ([mybest/superprof, ver fontes](https://br.my-best.com/21197)) |
| **Stoodi** | Brasil | Videoaulas + exercícios (cursinho) | Não encontrado | Não | Não | Assinatura | Não encontrado (valor exato 2026) |
| **Me Salva! / Aprova Total** | Brasil | Videoaulas + exercícios | Não encontrado | Não | Não | Assinatura | Aprova Total: ~12x R$ 83 ([dezesseisegredos.blogspot.com](https://dezesseisegredos.blogspot.com/2017/02/me-salva-descomplica-proenem-ou-stoodi.html) — dado antigo, tratar com cautela) |
| **Geekie** | Brasil | Plataforma adaptativa (B2B escola) | Parcial — algoritmo adaptativo personaliza trilha, não gera flashcards de foto ([geekie.com.br](https://www.geekie.com.br/como-funciona-uma-plataforma-de-aprendizagem-adaptativa-geekie-one/)) | Não | Não | B2B (licenciamento escolar) | Não divulgado |
| **Khan Academy Brasil / Khanmigo** | Global/BR (PT-BR) | Tutor de IA em chat + exercícios | Sim, tutor conversacional, não feed de recall rápido | Não | Não | Gratuito (Khan Academy) / Khanmigo licenciado a distritos | Não encontrado (para BR) |
| **Evolucional, Eduqo, AppProva, Explicaê, Studeo** | Brasil | Plataformas de dados/gestão pedagógica (Evolucional, Eduqo), videoaulas ENEM (Explicaê), AVA universitário (Studeo) | Não encontrado evidência de feed vertical ou IA a partir de foto em nenhum dos cinco | Não | Não | B2B escolar / assinatura | Não divulgado |

---

## 2. Lacunas confirmadas

### Hipótese 1 — "Ninguém combina feed vertical + FSRS real + IA a partir de foto do caderno"
**PARCIALMENTE CONFIRMADA.**
O StudyTok chega mais perto: tem feed vertical estilo TikTok e gera flashcards/quiz a partir de foto, PDF, PPTX e vídeo ([studytok.com](https://studytok.com/), [App Store](https://apps.apple.com/us/app/studytok-learn-and-questions/id6738703017)). Mas a pesquisa não encontrou nenhuma evidência de que ele use FSRS ou qualquer scheduler de repetição espaçada real — a retenção parece ser sustentada por streak/pontuação/gamificação, não por um algoritmo de memória. Nenhum produto com feed vertical foi encontrado combinando os três elementos (feed + FSRS + IA de foto) simultaneamente. O Desfeed seria o primeiro a fechar esse triângulo, se implementar FSRS de fato (biblioteca pronta: `ts-fsrs`, MIT, mantida por `open-spaced-repetition` — [github.com/open-spaced-repetition/ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)).

### Hipótese 2 — "Ninguém faz fim proposital de sessão — todos otimizam tempo de tela"
**CONFIRMADA**, dentro do escopo pesquisado.
Todo produto de feed/microlearning encontrado (StudyTok, Nibble, Imprint, Duolingo) usa mecânicas de scroll contínuo, streak e leaderboard desenhadas para maximizar tempo de app e frequência de retorno — não para encerrar a sessão de forma proativa ([nibble-app.com/blog/educational-scrolling-apps](https://nibble-app.com/blog/educational-scrolling-apps), Duolingo streak/XP e retenção de 55% DAU mês a mês, [trypropel.ai](https://www.trypropel.ai/resources/duolingo-customer-retention-strategy)). Não foi encontrado nenhum produto que anuncie "fim de sessão" como funcionalidade central ou filosofia de design anti-engajamento. Essa é a lacuna mais limpa das quatro.

### Hipótese 3 — "Ninguém no Brasil tem produto que sirva à exceção pedagógica da Lei 15.100/2025"
**REFUTADA (parcialmente) para a categoria "sala ao vivo"; CONFIRMADA para a categoria "revisão espaçada individual".**
Pelo menos três produtos brasileiros de quiz ao vivo já existem e um deles (Kahoot, apesar de não ser brasileiro) já se posiciona explicitamente em marketing como compatível com a Lei 15.100 ("a plataforma possibilita o uso intencional da tecnologia na educação, conforme estabelecido pela Lei 15.100" — [porvir.org](https://porvir.org/kahoot-novos-recursos-passo-a-passo/)). O **PlayAula** é brasileiro, usa IA para gerar a atividade, roda em sala com PIN pelo navegador do celular, e por natureza já atende à exceção pedagógica da lei — mas não menciona a lei explicitamente e não tem qualquer revisão individual pós-aula ([lp.playaula.com.br](https://lp.playaula.com.br/)). **Educa AI** e **Unoquizz** também são brasileiros e atuam nesse nicho. Ou seja: já existe concorrência brasileira nativa na parte "sala ao vivo com IA", embora nenhuma tenha sido encontrada citando a lei como argumento de vendas de forma direta, e nenhuma estende isso para revisão espaçada individual no celular do aluno depois da aula — que é exatamente a lacuna da hipótese 4.

### Hipótese 4 — "Nenhum produto de sala ao vivo alimenta um sistema de revisão espaçada individual depois da aula"
**CONFIRMADA.**
Em nenhuma das fontes sobre Kahoot, Quizizz, Blooket, Gimkit, Wooclap, Mentimeter, Nearpod, Pear Deck, Socrative, Plickers, PlayAula, Unoquizz ou Educa AI foi encontrada menção a um sistema que pegue os erros da sala ao vivo e os transforme automaticamente em cartões de revisão espaçada individual nos dias seguintes. Todos tratam os dados de desempenho como relatório/analytics para o professor (ex.: Quizizz/Wayground oferece "relatórios detalhados", [teachfloor.com](https://www.teachfloor.com/blog/blooket-vs-gimkit-vs-kahoot--vs-quizizz)), não como insumo de um scheduler de memória individual. Essa é a segunda lacuna mais limpa e diretamente ligada à funcionalidade de sala ao vivo do Desfeed.

---

## 3. Nosso diferencial (5 pontos defensáveis num pitch)

1. **Fim proposital de sessão vs. otimização de tempo de tela.** Supera Duolingo, StudyTok e Nibble — todos medem e recompensam tempo/frequência de uso ([trypropel.ai](https://www.trypropel.ai/resources/duolingo-customer-retention-strategy), [nibble-app.com](https://nibble-app.com/blog/educational-scrolling-apps)). O Desfeed é o único desenhado para dizer "acabou por hoje" de propósito, alinhado à evidência de que sessões distribuídas (spacing) superam sessões longas ([Cepeda et al. 2006](https://www.yorku.ca/ncepeda/publications/CPVWR2006.html)).

2. **FSRS real, não gamificação disfarçada de memória.** Supera StudyTok (feed + IA de foto, mas sem scheduler de memória comprovado) e Duolingo (usa Half-Life Regression/Birdbrain proprietário, não FSRS — [research.duolingo.com](https://research.duolingo.com/papers/settles.acl16.pdf)). FSRS já é usado em produção por Anki (nativo desde a v23.10) e RemNote (padrão desde 2024), com biblioteca TypeScript pronta e com licença MIT (`ts-fsrs`) — reduz risco de implementação.

3. **Ponte sala-ao-vivo → revisão individual.** Nenhum concorrente de sala ao vivo (Kahoot, Quizizz, Blooket, Gimkit, Wooclap, PlayAula, Unoquizz) transforma o resultado da aula em cards de revisão espaçada para cada aluno depois. Isso fecha o ciclo que hoje para no "relatório para o professor".

4. **IA a partir de foto do caderno/apostila, dentro de um feed de recall — não de um app de flashcard tradicional.** Quizlet, Knowt, Revisely e StudyFetch geram flashcards de PDF/foto, mas a experiência de estudo é um deck ou lista — não um feed de recuperação ativa contínua com repetição espaçada real por trás. StudyTok é o mais próximo, mas não usa FSRS documentado.

5. **Produto brasileiro desenhado nativamente para a Lei 15.100/2025.** PlayAula, Unoquizz e Educa AI já exploram a brecha pedagógica no Brasil, mas nenhum foi encontrado combinando isso com IA de foto + repetição espaçada individual pós-aula — a combinação de conformidade regulatória local com ciência da memória é um espaço aberto.

---

## 4. Riscos competitivos

- **StudyTok é o candidato mais óbvio a copiar em 3 meses**: já tem feed vertical + IA de foto/PDF funcionando; falta "só" adicionar um scheduler FSRS real e a mecânica de encerramento de sessão. Como `ts-fsrs` é open-source e MIT, a barreira técnica para eles adicionarem é baixa.
- **Kahoot/Quizizz/Wooclap têm distribuição e caixa** para comprar ou copiar a ponte "sala ao vivo → revisão individual" rapidamente — todos já têm IA de geração de questões e login de aluno; falta conectar isso a um scheduler individual.
- **PlayAula, Educa AI e Unoquizz** têm vantagem de serem brasileiros e já atenderem a Lei 15.100 na prática (sala com PIN, sem instalar app); podem evoluir para IA de foto + revisão espaçada mais rápido que um player internacional, por já terem distribuição em escolas do Brasil.
- **O que nos protege**: a combinação simultânea dos quatro elementos (feed + FSRS real + fim proposital de sessão + ponte sala-ao-vivo→individual) exige decisões de produto que vão contra o instinto de crescimento de quase todo concorrente atual (que monetiza tempo de tela e engajamento). Copiar a peça técnica (FSRS) é fácil; copiar a filosofia anti-engajamento contraria o modelo de receita de quem já vive de DAU/streak (Duolingo, StudyTok). Isso é vantagem de posicionamento, não de tecnologia — portanto exige que o Desfeed comunique e proteja essa filosofia de produto, não apenas o código.

---

## 5. Evidência científica

| Achado | Fonte |
|---|---|
| **Testing effect**: testar-se (retrieval practice) produz retenção maior que reler, especialmente em testes tardios (dias/semanas depois) | Roediger & Karpicke (2006), *Perspectives on Psychological Science* — [sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x](https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x) |
| **Spacing effect**: prática distribuída no tempo supera prática maciça; 839 comparações, 317 experimentos | Cepeda, Pashler, Vul, Wixted & Rohrer (2006), *Psychological Bulletin* 132(3):354-380 — [yorku.ca/ncepeda/publications/CPVWR2006.html](https://www.yorku.ca/ncepeda/publications/CPVWR2006.html) |
| **Curva do esquecimento**: replicação do experimento de Ebbinghaus confirma queda acentuada de retenção nas primeiras horas/dias | Murre & Dros (2015), *PLOS ONE* 10(7):e0120644 — [journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0120644) |
| **Aprendizagem ativa**: aumenta nota média em exames (~6%, 0,47 desvio-padrão) e reduz reprovação (odds ratio 1,95 para aula expositiva tradicional) em 225 estudos de STEM | Freeman et al. (2014), *PNAS* 111(23):8410-8415 — [pnas.org/doi/10.1073/pnas.1319030111](https://www.pnas.org/doi/10.1073/pnas.1319030111) |
| **"Your Brain on ChatGPT"**: uso de LLM para redigir reduz conectividade cerebral (EEG) e gera "dívida cognitiva" — 83% dos usuários de LLM não conseguiram citar frase própria do texto que acabaram de escrever | Kosmyna, Hauptmann, Yuan, Situ, Liao et al. (2025), MIT Media Lab, arXiv:2506.08872 — [media.mit.edu/publications/your-brain-on-chatgpt](https://www.media.mit.edu/publications/your-brain-on-chatgpt/) / [arxiv.org/abs/2506.08872](https://arxiv.org/abs/2506.08872) |
| **Vídeo curto e atenção**: meta-análise com 71 estudos e N=98.299 associa uso de vídeo de formato curto (TikTok/Reels/Shorts) a pior cognição (r=-0,34), atenção (r=-0,38) e controle inibitório (r=-0,41) | "Feeds, feelings, and focus" (2025), *Psychological Bulletin* (set/2025) — [pubmed.ncbi.nlm.nih.gov/41231585](https://pubmed.ncbi.nlm.nih.gov/41231585/) |

**Leitura estratégica desses dados para o pitch**: o Desfeed usa o formato viciante do vídeo curto (testing effect + spacing) precisamente para o oposto do que a evidência mais recente (Kosmyna 2025, meta-análise 2025) mostra que o formato curto/IA generativa costuma causar — atrofia de atenção e terceirização cognitiva. É o argumento central de defesa do produto: mesmo mecanismo de interface, direção oposta de efeito cognitivo, porque o motor por trás é recuperação ativa espaçada, não consumo passivo.

---

## 6. Referências

- StudyTok: [studytok.com](https://studytok.com/) | [App Store](https://apps.apple.com/us/app/studytok-learn-and-questions/id6738703017)
- Nibble: [nibble-app.com](https://nibble-app.com/) | [nibble-app.com/blog/educational-scrolling-apps](https://nibble-app.com/blog/educational-scrolling-apps) | [nibble-app.com/blog/how-much-is-nibble-app](https://nibble-app.com/blog/how-much-is-nibble-app)
- Imprint: [imprintapp.com](https://www.imprintapp.com/) | [makeheadway.com/blog/imprint-app-review](https://makeheadway.com/blog/imprint-app-review/)
- Quizlet: [quizlet.com/features/ai-flashcard-generator](https://quizlet.com/features/ai-flashcard-generator) | [quizlet.com/study-guides/upload](https://quizlet.com/study-guides/upload)
- Knowt: [knowt.com/ai-flashcard-maker](https://knowt.com/ai-flashcard-maker) | [toolchase.com/tool/knowt](https://toolchase.com/tool/knowt/)
- Revisely, StudyFetch, TurboLearn, Unstuck, Wisdolia/Jungle: [studyglen.com/guides/best-ai-study-guide-generator](https://studyglen.com/guides/best-ai-study-guide-generator) | [revisely.com/flashcard-generator](https://www.revisely.com/flashcard-generator)
- Quizgecko, Gizmo: [quizgecko.com](https://quizgecko.com/) | [quizgecko.com/learn/gizmo-study-app-for-academic-success-spoiwn](https://quizgecko.com/learn/gizmo-study-app-for-academic-success-spoiwn)
- Anki / FSRS: [studycardsai.com/blog/anki-fsrs-algorithm](https://studycardsai.com/blog/anki-fsrs-algorithm) | [github.com/open-spaced-repetition/fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md)
- ts-fsrs: [github.com/open-spaced-repetition/ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) | [npmjs.com/package/ts-fsrs](https://www.npmjs.com/package/ts-fsrs)
- RemNote: [remnote.com/feature/fsrs](https://www.remnote.com/feature/fsrs)
- Mochi / Brainscape: [studyglen.com/guides/best-spaced-repetition-apps](https://studyglen.com/guides/best-spaced-repetition-apps) | [memstride.com/blog/fsrs-vs-sm2-algorithm-comparison](https://memstride.com/blog/fsrs-vs-sm2-algorithm-comparison/)
- Duolingo: [research.duolingo.com/papers/settles.acl16.pdf](https://research.duolingo.com/papers/settles.acl16.pdf) | [buildmvpfast.com/blog/ai-learning-personalization-duolingo-ai-driven-lessons-2026](https://www.buildmvpfast.com/blog/ai-learning-personalization-duolingo-ai-driven-lessons-2026) | [trypropel.ai/resources/duolingo-customer-retention-strategy](https://www.trypropel.ai/resources/duolingo-customer-retention-strategy) | [foundercoho.substack.com](https://foundercoho.substack.com/p/inside-duolingos-6b-playbook-gamification)
- Kahoot!: [panquiz.com/en/blog/kahoot-pricing](https://www.panquiz.com/en/blog/kahoot-pricing/) | [porvir.org/kahoot-novos-recursos-passo-a-passo](https://porvir.org/kahoot-novos-recursos-passo-a-passo/)
- Quizizz/Wayground, Blooket, Gimkit: [teachfloor.com/blog/blooket-vs-gimkit-vs-kahoot--vs-quizizz](https://www.teachfloor.com/blog/blooket-vs-gimkit-vs-kahoot--vs-quizizz) | [nibble-app.com/blog/blooket-vs-quizizz](https://nibble-app.com/blog/blooket-vs-quizizz)
- Wooclap: [wooclap.com/en/quiz-wizard](https://wooclap.com/en/quiz-wizard/?amp=&amp=) | [kvistly.com/blog/best-mentimeter-alternatives](https://kvistly.com/blog/best-mentimeter-alternatives)
- Mentimeter: [mentimeter.com/features/ai-quiz-generator](https://www.mentimeter.com/features/ai-quiz-generator)
- Nearpod / Pear Deck: [classpoint.io/blog/audience-response-systems-for-classrooms](https://www.classpoint.io/blog/audience-response-systems-for-classrooms)
- Socrative: [myengineeringbuddy.com/blog/socrative-reviews-alternatives-pricing-offerings](https://www.myengineeringbuddy.com/blog/socrative-reviews-alternatives-pricing-offerings/)
- PlayAula: [lp.playaula.com.br](https://lp.playaula.com.br/)
- Unoquizz: [unoquizz.com.br](https://unoquizz.com.br/)
- Educa AI: [educa-ai.pro](https://educa-ai.pro/)
- Plurall / SOMOS Educação: [blogsomoseducacao.com.br/plurall-ia](https://blogsomoseducacao.com.br/plurall-ia/) | [plurall.net/ia.html](https://www.plurall.net/ia.html)
- Árvore: [arvore.com.br](https://www.arvore.com.br/)
- Descomplica, Stoodi, Me Salva, Aprova Total: [br.my-best.com/21197](https://br.my-best.com/21197) | [dezesseisegredos.blogspot.com](https://dezesseisegredos.blogspot.com/2017/02/me-salva-descomplica-proenem-ou-stoodi.html)
- Geekie: [geekie.com.br/como-funciona-uma-plataforma-de-aprendizagem-adaptativa-geekie-one](https://www.geekie.com.br/como-funciona-uma-plataforma-de-aprendizagem-adaptativa-geekie-one/)
- Khan Academy Brasil / Khanmigo: [blog.khanacademy.org/pt-br/como-o-khanmigo-funciona](https://blog.khanacademy.org/pt-br/como-o-khanmigo-funciona/)
- Redação Nota 1000: [redacaonota1000.com.br](https://www.redacaonota1000.com.br/)
- Explicaê / Studeo: [apps.apple.com/us/app/explicae/id6743809912](https://apps.apple.com/us/app/explicae/id6743809912)
- Lei 15.100/2025: [gov.br/mec — sancionada lei que restringe uso de celulares nas escolas](https://www.gov.br/mec/pt-br/assuntos/noticias/2025/janeiro/sancionada-lei-que-restringe-uso-de-celulares-nas-escolas) | [mpce.mp.br — kit Lei 15.100](https://mpce.mp.br/institucional/centros-de-apoio-operacional/caoeduc/kits-de-atuacao/kit-lei-15100-2025/) | [conjur.com.br](https://www.conjur.com.br/2025-mar-06/lei-no-15-100-25-proibe-aparelhos-eletronicos-pessoais-na-educacao-basica-em-prol-dos-hipervulneraveis/) | [agenciabrasil.ebc.com.br — 92% das escolas](https://agenciabrasil.ebc.com.br/educacao/noticia/2026-06/lei-que-restringe-uso-de-celulares-ja-e-adotada-por-92-das-escolas)
- Roediger & Karpicke (2006): [journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x](https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x)
- Cepeda et al. (2006): [yorku.ca/ncepeda/publications/CPVWR2006.html](https://www.yorku.ca/ncepeda/publications/CPVWR2006.html)
- Murre & Dros (2015): [journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0120644)
- Freeman et al. (2014): [pnas.org/doi/10.1073/pnas.1319030111](https://www.pnas.org/doi/10.1073/pnas.1319030111)
- Kosmyna et al. (2025): [media.mit.edu/publications/your-brain-on-chatgpt](https://www.media.mit.edu/publications/your-brain-on-chatgpt/) | [arxiv.org/abs/2506.08872](https://arxiv.org/abs/2506.08872)
- "Feeds, feelings, and focus" (2025): [pubmed.ncbi.nlm.nih.gov/41231585](https://pubmed.ncbi.nlm.nih.gov/41231585/)
