# Análise competitiva — Memfeed

**Data da pesquisa:** 13/09/2026 · **Todas as páginas foram acessadas em 13/09/2026.**
**Método:** busca e leitura direta de páginas oficiais (blog de produto, central de ajuda, páginas de recurso e de preço). Onde só existe fonte de terceiro, está marcado. Onde não achei, está escrito **não confirmado** — não preenchi com suposição.

---

## 1. Resumo executivo em cinco linhas

1. **Nenhum dos concorrentes checados devolve ao professor uma métrica de retenção por conceito medida em D+7 e D+30 contra o dia da aula.** O que existe é acerto por atividade e tendência de acerto ao longo do calendário.
2. **A frase "Kahoot e Quizizz param no acerto do dia" é verdadeira, mas precisa de precisão cirúrgica.** O Wayground (ex-Quizizz) tem "Longitudinal Growth Graphs" desde 2021 — é um gráfico de acurácia por atividade ao longo do tempo, não a mesma pergunta reaplicada em intervalos. Um jurado que conhece o mercado vai citar isso. A formulação defensável está na seção 4.
3. **O concorrente mais perigoso não é Kahoot nem Quizlet: é o Seneca Learning (UK).** Ele usa explicitamente a curva de esquecimento para agendar a revisão do aluno, tem IA que gera quiz do material do professor e tem painel de turma. Mas o painel mostra conclusão, nota média e tempo de estudo — **não** mostra decaimento por conceito. E não opera no Brasil nem cobre ENEM/BNCC.
4. **A repetição espaçada não é o diferencial.** FSRS é aberto, é padrão do Anki desde 2023, e existe uma dúzia de apps brasileiros B2C de flashcards com IA + SRS (Memoot, Decoreba, Genius, Mindstreak). O diferencial é **o lado do professor**: a origem do conteúdo na aula e o retorno da curva de esquecimento agregada para quem deu a aula.
5. **O risco maior não é competitivo, é estatístico:** se o aluno não voltar no D+7, não existe número de retenção para mostrar ao professor. O produto inteiro pendura numa métrica de recorrência.

---

## 2. Tabela comparativa

| Produto | Mede retenção **no tempo** (mesmo conceito, D+7/D+30)? | Relatório de **esquecimento** ao professor? | IA gera questão a partir de **assunto digitado**? | Preço / modelo no Brasil |
|---|---|---|---|---|
| **Anki / AnkiDroid** | Sim, para o aluno (FSRS é o scheduler padrão desde a v23.10, 31/10/2023) — mas é previsão de recall individual, não relatório | **Não.** Não existe conceito de turma nem de professor | **Não.** Conteúdo é escrito ou importado pelo usuário | Grátis (desktop/Android); AnkiMobile iOS pago, ~US$ 24,99 (loja) |
| **RemNote / Mochi** | Sim, SRS individual | **Não confirmado** qualquer visão de turma com decaimento por conceito | RemNote gera cards com IA a partir de nota/PDF do próprio usuário | Freemium, assinatura individual em USD |
| **Quizlet** | Parcial — Learn usa repetição espaçada; "Long-Term Learning" (Quizlet Labs) agenda revisões em múltiplos dias. **Página oficial do Labs retornou erro no acesso de hoje — não confirmado na fonte primária** | **Não.** O que a página de upgrade entrega é produto de consumidor | Sim, gera conjuntos a partir de notas/tema (Magic Notes) | Plus **US$ 2,99/mês** (US$ 35,99/ano); Plus Unlimited **US$ 3,75/mês** (US$ 44,99/ano) — preços da própria página, 13/09/2026 |
| **Kahoot!** | **Não.** Learn/Flashcards/Test existem, mas o espaçamento é receita manual: o professor abre Reports → "Difficult questions" → Create → roda de novo "uma ou duas semanas depois" | **Não — e a própria central de ajuda confirma:** "Are reports available in self-study modes? **No**, reports are not generated when studying alone... detailed tracking requires playing live games" | **Sim.** Kahoot Generator: digita o tópico (ou PDF, URL, Wikipédia), escolhe nível e nº de questões, revisa e salva | Por professor, em USD. Faixa de **US$ 3–5/professor/mês** no anual — **fonte de terceiro (Vendr/comparadores), não a página oficial** |
| **Quizizz / Wayground** | **Quase — e é aqui que o pitch pode apanhar.** "Longitudinal Growth Graphs" mostra desempenho ao longo de várias atividades: gráfico de **Accuracy and Time**, cada ponto = um quiz. É tendência de acerto por atividade, **não** o mesmo conceito reaplicado em intervalo calculado | Parcial. Standards Mastery Report (domínio por habilidade) e growth graphs. **Não** há relatório de queda de retenção por conceito contra o dia do ensino | Sim, é plataforma "AI-supported" com geração de atividades | Starter grátis; School/District sob cotação (sem preço público). Growth graphs em turmas Wayground em todos os planos; via Google Classroom/Schoology/Canvas só em School/District |
| **Duolingo** *(referência de mecânica, não concorrente)* | Sim, para o aluno — half-life regression publicado no ACL 2016, hoje absorvido no Birdbrain | N/A — não tem professor | N/A | Freemium / Super Duolingo |
| **Seneca Learning** (UK) | **Sim para o aluno**: "usa a curva de esquecimento de Ebbinghaus para sugerir o momento ótimo de revisitar cada tópico" (material do próprio Seneca) | **Não.** O painel entrega conclusão de tarefa, nota de casa, tempo de estudo, média e Gradebook com RAG. Nenhuma métrica de decaimento por conceito | **Quase**: "Magic Quizzes" gera quiz a partir dos **recursos enviados** pelo professor, em 2 cliques | Grátis com limitação; School Premium sob cotação. **Não opera no Brasil, currículo de exam boards britânicos** |
| **Carousel Learning** (UK) | **Não ainda.** A própria página de produto lista "**Spaced repetition mode — coming soon**" em 13/09/2026 | Parcial: Whole Class Feedback e **C-Scores** (recomenda as questões mais impactantes com base em espaçamento, repetição e desempenho) — é priorização, não relatório de queda | Banco de questões humano (John Catt) + criação do professor. IA generativa de tópico **não confirmada** | Gold grátis / Platinum sob cotação. Sem presença no Brasil |
| **Plurall (SOMOS/Vasta)** | **Não confirmado.** Painel de Gestão traz engajamento nas missões e habilidades que precisam de atenção | Relatório por habilidade, sim. De **esquecimento no tempo**, não confirmado | **Sim.** Plurall IA gera plano de aula, questões e provas. No 1º trimestre de 2025: 168 mil planos, 260 mil questões, 214 mil provas *(dado de imprensa, não da página do produto)* | B2B escolar, vendido junto ao sistema de ensino. Preço não público |
| **Khan Academy Brasil** | Não (domínio de habilidade, não decaimento) | Relatórios de progresso, sim; de esquecimento, **não confirmado** | Sim — Khanmigo para professores chegou ao Brasil em set/2025: cria avaliações rápidas, rubricas, planos | Gratuito (Fundação Lemann); Khanmigo com custo institucional |
| **Descomplica** | Não | Não existe professor de escola no produto — é B2C | "Assistente de Estudos IA" nos produtos de graduação/pós. Geração de questão por assunto **não confirmada** | Cursinho ENEM: **12× R$ 49,90 para 6 meses de acesso** (site oficial, 13/09/2026) |
| **Stoodi** | Não | Não | Não confirmado | Assinatura anual, sem teste grátis (garantia de 7 dias). 30 mil questões, 6 mil videoaulas. Valor não público na home |
| **Me Salva!** | Não | Não | Não confirmado | Banco de provas ENEM 2009–2023 resolvidas. **Situação comercial atual não confirmada** |
| **Aprova Total** | Parcial — flashcards gerados automaticamente *(fonte: ficha da App Store, não página de produto)* | Não | Não confirmado | **Preço não confirmado.** Simuladão ENEM 2026 gratuito |
| **Árvore** | **Não confirmado** (não encontrei material de produto sobre retenção no tempo) | **Não confirmado** | **Não confirmado** | B2B escolar, preço não público |
| **Apps BR de SRS com IA** (Memoot, Decoreba, Genius Flashcards, Mindstreak) | Sim, SRS individual (Mindstreak declara SM-2) | **Não.** Nenhum tem painel de professor | **Sim** — é exatamente a proposta deles: você digita o assunto, a IA gera o baralho | B2C, assinatura individual em BRL |
| **Memfeed** | **Sim** — mesmo conceito reaplicado pela fila FSRS, medido em D+7/D+30 contra o acerto do dia da aula | **Sim** — é a tela principal do painel, agregada por conceito, com estado por aluno (firme/em risco/esquecido) e ação "gerar reforço" | **Sim** — professor digita o assunto ao fim da aula, revisa uma vez, publica para a turma | A definir |

---

## 3. Achados que mudam o pitch

### 3.1 Kahoot admite por escrito que não acompanha o estudo espaçado

A central de ajuda do Kahoot, atualizada em **10/09/2026** — três dias atrás — responde no FAQ dos modos de autoestudo:

> "Are reports available in self-study modes? **No, reports are not generated when studying alone.** You can check your scores locally after a session, but detailed tracking requires playing live games."

Isto é a confirmação mais forte que existe para o pitch: no Kahoot, **tudo que o aluno estuda sozinho entre as aulas é invisível para o professor**. O dado do professor só nasce no jogo ao vivo, ou seja, no dia da atividade.

- Fonte: <https://support.kahoot.com/hc/en-us/articles/31566898896029-How-to-learn-and-practice-with-Kahoot-self-study-modes> (atualizado 10/09/2026, acesso 13/09/2026)

### 3.2 No Kahoot, a repetição espaçada é trabalho manual do professor

O post institucional do próprio Kahoot de **18/03/2026**, "The science of learning behind every kahoot game", ensina a fazer espaçamento **na mão**:

> "After your next live game, open Reports on Kahoot! and look under the 'Difficult questions' for a Create button. This generates a ready-made kahoot from the questions students found difficult. **Run the new kahoot as a warm-up one or two weeks later.**"

Ou seja: em março de 2026, a recomendação oficial do maior player do mundo é que **o professor se lembre de reagendar**. Não existe fila. Isso valida a tese "ele cura uma vez, o sistema reagenda" — e mostra que o concorrente ainda coloca o reagendamento na conta do humano.

- Fonte: <https://kahoot.com/blog/2026/03/18/kahoot-impact-the-science-of-learning-behind-every-kahoot-game/> (18/03/2026, acesso 13/09/2026)

### 3.3 O Wayground tem gráfico longitudinal — e o pitch precisa desarmar isso na primeira frase

A ajuda do Wayground, atualizada em **05/11/2025**, descreve o recurso:

> "Get meaningful insights into your students' performances **over time and over multiple assignments**... Under 'Overview', you will see the class-level performance in the **Accuracy and Time graph**. If you hover over each point, you'd see the name of the Assessment/Quiz with the exact results."

Leitura honesta: o eixo do tempo existe, mas cada ponto é **uma atividade diferente**. Não há reaplicação controlada do mesmo conceito num intervalo calculado, nem comparação contra o acerto do dia do ensino. É "a turma foi melhorando ao longo do bimestre", não "o que a turma ensinou na terça sobrou 45% uma semana depois".

Se alguém do júri disser "o Quizizz já faz isso", a resposta é a da seção 4.

- Fontes: <https://help.wayground.com/support/solutions/articles/158000404061-reports-on-longitudinal-growth-graphs> (05/11/2025) · <https://help.wayground.com/support/solutions/articles/158000404051-understand-how-accuracy-is-measured-on-wayground> (05/11/2025) — acesso 13/09/2026

### 3.4 Seneca é o único que já usa a curva de esquecimento — e mesmo assim não a reporta ao professor

Do material do próprio Seneca:

> "Seneca uses research data, such as **Ebbinghaus' forgetting curve**, to suggest the optimal moment for each student to revisit each topic."

E a IA: "Magic Quizzes — AI-powered tools for teachers to generate quizzes from their own resources in 2 clicks."

Mas o que o painel entrega ao professor é: conclusão de tarefa, nota da lição de casa, tempo de estudo, média por avaliação e Gradebook com código de cor vermelho/âmbar/verde. **A curva existe no motor e morre no motor.** Ela nunca vira relatório.

Esse é o achado mais importante da pesquisa: **a peça que ninguém entregou não é o algoritmo — é a tradução do algoritmo em informação pedagógica para quem deu a aula.**

- Fontes: <https://senecalearning.com/en-GB/revision-notes/teacher-cpd/cpd-applications-of-artificial-intelligence-in-education/1-2-2-adaptive-learning-platforms> · <https://senecalearning.com/en-GB/teachers/> · <https://help.senecalearning.com/en/articles/7983483-what-is-the-gradebook> — acesso 13/09/2026

### 3.5 Carousel Learning ainda não entregou repetição espaçada

Na página de produto do pacote Secondary, hoje:

> "**Spaced repetition mode — coming soon.** Generate personalised quizzes for students containing previously attempted questions."

O que está no ar é o **C-Score**: "recomendação das questões mais impactantes a fazer num determinado momento, com base em dados de espaçamento, repetição e desempenho do aluno". Isso é priorização de pergunta, não medição de queda.

- Fonte: <https://www.carousel-learning.com/product/secondary> e <https://www.carousel-learning.com/about/what-is-retrieval-practice> (acesso 13/09/2026)

---

## 4. O diferencial defensável

### A frase para o palco

> **"Kahoot, Quizizz e Seneca sabem se o aluno acertou. Nenhum deles devolve ao professor quanto sobrou do que ele ensinou.**
> **O Memfeed reaplica o mesmo conceito em D+7 e D+30 e entrega a queda ao professor: 'Ciclo de Krebs, 71% no dia, 45% uma semana depois'. É a única métrica que responde à pergunta que o professor faz de verdade — não 'eles gostaram da aula', mas 'eles ainda têm isso'."**

### A frase de defesa, se o jurado citar o Quizizz

> **"O Quizizz tem gráfico longitudinal, sim — e ele plota uma atividade diferente a cada ponto. É a nota subindo ao longo do bimestre. Nós reaplicamos o mesmo conceito num intervalo calculado pelo FSRS e comparamos contra o acerto do dia da aula. Um mede progresso; o outro mede esquecimento. São curvas diferentes com sinais opostos."**

### Por que esta formulação sobrevive

Ela **não** reivindica:
- repetição espaçada (Seneca, Quizlet e uma dúzia de apps BR já têm);
- IA que gera questão de um assunto (Kahoot Generator faz isso desde 2023; Plurall gerou 260 mil questões só no 1T2025);
- relatório para o professor (todos têm algum).

Ela reivindica exatamente uma coisa, e essa coisa está vazia no mercado checado: **a medição de decaimento por conceito, agregada por turma, devolvida a quem ensinou.** Mais o encaixe: o conteúdo nasce na aula de terça e a fila o traz de volta no dia 1, 3, 7 e 16 misturado com o que o aluno pediu.

### O reforço de posicionamento que também é defensável

Nenhum concorrente checado renunciou ao ranking. O Kahoot vai na direção oposta — em set/2025 lançou streaks diários e semanais, study buddies e Kahootopia! Leagues, onde **turmas competem contra turmas**; o modo "Accuracy Mode" (onde acerto vale mais que velocidade) foi lançado como alternativa, e não como padrão. Ter placar é decisão de design deles; **não ter** é decisão de design nossa, e o edital pede promoção de saúde mental. Isso é diferenciação de produto verificável, não retórica.

- Fonte: <https://kahoot.com/press/2025/09/22/new-ai-powered-study-tools-back-to-school/> (22/09/2025) · <https://kahoot.com/blog/2026/01/20/discover-kahoots-latest-learning-innovations-at-bett-uk-2026/> (20/01/2026) — acesso 13/09/2026

---

## 5. Onde somos fracos

Escrito para ser lido antes do palco, não depois.

1. **O relatório de retenção só existe se o aluno voltar.** Se 30% da turma revisar no D+7, o "45% de retenção" é uma amostra enviesada dos alunos mais engajados — provavelmente **superestimando** a retenção da turma. Precisamos mostrar o n na tela e falar isso antes que perguntem.

2. **A repetição espaçada não é moat.** FSRS é open source, é o scheduler padrão do Anki desde 31/10/2023, tem implementação de referência pública e foi treinado em ~700 milhões de revisões. Qualquer time copia o motor em uma semana.

3. **A IA-gera-do-assunto também não é moat, e nesse eixo estamos atrás.** O Kahoot Generator gera de tópico, PDF, URL e Wikipédia com controle de nível e quantidade. O Plurall gerou 260 mil questões num trimestre com curadoria pedagógica da SOMOS por trás. Nós temos o mesmo recurso sem banco curado e sem marca.

4. **O B2C brasileiro de flashcards com IA está lotado.** Memoot, Decoreba, Genius Flashcards, Mindstreak, Repertório, olhonavaga — todos com "IA gera + repetição espaçada + ENEM". Se o pitch escorregar para "app de flashcard com IA", viramos o décimo. O que nos tira da pilha é exclusivamente o painel do professor.

5. **O Wayground pode fechar a lacuna sem construir nada novo.** Eles já têm o histórico de respostas, já têm Standards Tagging por habilidade e já têm o eixo temporal. Ligar "acurácia do mesmo padrão, N dias após a primeira exposição" é um trabalho de relatório, não de produto. É a cópia mais barata que existe contra nós.

6. **A autoavaliação (Errei/Difícil/Bom/Fácil) é um sinal subjetivo dentro de uma métrica que vendemos como objetiva.** A retenção que vai para o professor precisa sair do acerto, não da nota que o aluno deu para si. Se um jurado técnico puxar esse fio, a resposta honesta é que o grade alimenta o agendamento e o acerto alimenta o relatório.

7. **Distribuição.** Seneca tem 300.000+ professores declarados. Kahoot é onipresente na escola brasileira e já está instalado. Plurall chega embutido no sistema de ensino contratado. Nós entramos por um professor de cada vez.

8. **Não temos evidência própria.** Todos os números de eficácia deste documento são da literatura (Roediger & Karpicke, Ebbinghaus/Murre & Dros). Nenhum é do Memfeed. O honesto no palco é dizer "a ciência é sólida; nosso número ainda não existe — é o que o piloto vai medir".

9. **Cobertura curricular.** Kahoot, Seneca e Carousel têm bancos alinhados a currículos oficiais e revisados por especialistas. Nosso conteúdo nasce de um prompt, revisado uma vez, sob pressa de fim de aula.

---

## 6. Números com fonte

Cada item traz link e data de acesso. Onde a fonte é imprensa e não documento primário, está dito.

### Eficácia de recuperação ativa e repetição espaçada

| # | Número | Fonte | Acesso |
|---|---|---|---|
| 1 | Estudantes que praticaram **recuperação ativa** recordaram **61%** do texto uma semana depois; quem apenas releu, **40%**. Roediger & Karpicke (2006), *Psychological Science* 17(3), 249–255 | <https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x> · PDF: <https://colinallen.dnsalias.org/Readings/2006_Roediger_Karpicke_PsychSci.pdf> | 13/09/2026 |
| 2 | **Replicação moderna da curva de esquecimento de Ebbinghaus.** Murre & Dros (2015), *PLOS ONE* 10(7): e0120644. Reaprendizado após 20 min, 1h, 9h, 1 dia, 2 dias e 31 dias; resultados próximos aos de Ebbinghaus (1885), com um salto para cima a partir das 24h | <https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644> | 13/09/2026 |
| 3 | **FSRS é o algoritmo padrão do Anki desde a versão 23.10 (31/10/2023)**, substituindo o SM-2 | <https://github.com/open-spaced-repetition/fsrs4anki> | 13/09/2026 |
| 4 | FSRS treinado em ~**700 milhões de revisões reais** de ~20 mil usuários do Anki — *dado repetido pela documentação da comunidade; tratar como número do projeto, não como estudo revisado por pares* | <https://github.com/open-spaced-repetition/fsrs4anki> | 13/09/2026 |
| 5 | **Half-life regression**, o modelo de repetição espaçada do Duolingo, publicado no ACL 2016 (Settles & Meeder), com dados e código abertos | <https://research.duolingo.com/papers/settles.acl16.pdf> · <https://github.com/duolingo/halflife-regression> | 13/09/2026 |

### Tamanho do problema no Brasil

| # | Número | Fonte | Acesso |
|---|---|---|---|
| 6 | **PISA 2022:** Brasil com média de **410 pontos em leitura**, abaixo da média da OCDE nas três áreas. **73% dos estudantes brasileiros não atingiram o nível básico de proficiência em matemática**; apenas **1%** alcançou alto desempenho (nível 5 ou superior) | <https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/acoes-internacionais/divulgados-os-resultados-do-pisa-2022> · nota técnica: <https://download.inep.gov.br/acoes_internacionais/pisa/resultados/2022/pisa_2022_brazil_prt.pdf> | 13/09/2026 |
| 7 | **Saeb 2023, ensino médio:** **59,0%** dos estudantes abaixo do básico em Matemática e **33,2%** em Língua Portuguesa. Apenas **5,2%** dos estudantes da rede pública com aprendizagem adequada em Matemática no EM — indicador estagnado há duas décadas | Todos Pela Educação, *Aprendizagem na Educação Básica: situação brasileira no pós-pandemia* (abr/2025): <https://todospelaeducacao.org.br/wordpress/wp-content/uploads/2025/04/estudo-aprendizagem-na-educacao-basica-no-brasil-pos-pandemia-todos-pela-educacaodocx.pdf> | 13/09/2026 |
| 8 | **Saeb 2025:** recuperação aos patamares pré-pandemia nos anos iniciais, mas **matemática no ensino médio segue como o maior gargalo**, ainda sem retomar o nível de 2019 | <https://agenciabrasil.ebc.com.br/educacao/noticia/2026-08/saeb-2025-brasil-recupera-nivel-pre-pandemia-mas-ainda-tem-gargalos> (ago/2026) | 13/09/2026 |
| 9 | **Censo Escolar 2025:** **7,36 milhões** de matrículas no ensino médio, das quais **6,33 milhões na rede pública** (1,03 milhão na privada). Queda de 7,77 mi (2021) para 7,36 mi (2025) | <https://download.inep.gov.br/publicacoes/institucionais/estatisticas_e_indicadores/notas_estatisticas_censo_escolar_da_educacao_basica_2025.pdf> | 13/09/2026 |
| 10 | **Abandono no ensino médio: 3,7%** em 2024 (Inep). A evasão no 1º ano do EM caiu de 3,7% para **2,2%** entre 2024 e 2025 — menor patamar em dez anos | <https://anuario.todospelaeducacao.org.br/2025/capitulo-4-ensino-medio.html> · <https://agenciagov.ebc.com.br/noticias/202402/ensino-medio-tem-maior-taxa-de-evasao-da-educacao-basica> | 13/09/2026 |

### Carga do professor brasileiro

| # | Número | Fonte | Acesso |
|---|---|---|---|
| 11 | **TALIS 2024 (OCDE/Inep):** professor brasileiro dedica **9,3 horas por semana à preparação de aulas** — média da OCDE: **7,4 h** — um aumento de **2,2 h** desde 2018 | <https://download.inep.gov.br/acoes_internacionais/pesquisa_talis/resultados/2024/relatorio_nacional_talis_2024.pdf> · <https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/acoes-internacionais/divulgados-resultados-brasileiros-da-pesquisa-internacional-talis-2024> | 13/09/2026 |
| 12 | **TALIS 2024:** professor brasileiro perde **21% do tempo de aula** mantendo a ordem (média OCDE: 15%). Entre 2018 e 2024, a jornada total cresceu quase **5 horas semanais** | <https://agenciabrasil.ebc.com.br/educacao/noticia/2025-10/professor-brasileiro-perde-21-do-tempo-de-aula-para-manter-disciplina> (out/2025) | 13/09/2026 |
| 13 | **Alunos por professor no Brasil: 23, 22 e 22** (anos iniciais, anos finais e médio) — acima da média da OCDE em todos os níveis (Education at a Glance / TALIS 2024) | <https://jeduca.org.br/noticia/talis-2024-traca-perfil-da-profissao-docente-em-54-paises-entre-eles-o-brasil> | 13/09/2026 |
| 14 | **Apenas 14%** dos professores brasileiros se sentem valorizados pela sociedade (média OCDE: 22%) | <https://download.inep.gov.br/acoes_internacionais/pesquisa_talis/resultados/2024/relatorio_nacional_talis_2024.pdf> | 13/09/2026 |

> ⚠️ **O número "630 correções por semana" do briefing não foi confirmado por nenhuma fonte.** O que dá para sustentar no palco: **23 alunos por turma × as turmas que o professor atende, mais 9,3 h semanais só de preparação.** Se quiser o número grande, calcule-o no palco a partir dessas duas fontes, em vez de citá-lo como dado pronto.

### Mercado

| # | Número | Fonte | Acesso |
|---|---|---|---|
| 15 | **Brasil concentra ~69% das edtechs da América Latina** e **~80% do volume de investimento**: **US$ 475,6 milhões** captados entre 2015 e março de 2024, de US$ 600 mi na região | Distrito, *EdTech Report*: <https://materiais.distrito.me/edtech-report-2025> · cobertura: <https://startups.com.br/pesquisas/brasil-lidera-mercado-latam-de-edtechs-e-movimenta-us-475m-em-10-anos/> | 13/09/2026 |
| 16 | **Plurall IA (SOMOS Educação), 1º trimestre de 2025:** mais de **168 mil planos de aula**, **260 mil questões** e **214 mil provas** geradas por professores, com **>86% de satisfação** declarada. *Dado de imprensa; não localizei a fonte primária da SOMOS* | <https://convergenciadigital.com.br/inovacao/ia-e-nuvem-mexem-na-educacao-como-dados-de-27-milhoes-de-alunos-vao-personalizar-ensino/> · <https://porvir.org/grupos-educacionais-inteligencia-artificial/> | 13/09/2026 |
| 17 | **Seneca Learning: 300.000+ professores** declarados na própria home | <https://senecalearning.com/en-GB/teachers/> | 13/09/2026 |

### Não confirmado (não usar no palco)

- Tamanho do mercado brasileiro de edtech em **receita** (R$/ano). Só encontrei volume de **investimento**, que é outra coisa.
- Preço público de Plurall, Árvore, Aprova Total, Stoodi (valor na home), Seneca Premium, Carousel Platinum e Wayground School/District — todos sob cotação.
- Preço oficial do Kahoot!+ em reais. A faixa US$ 3–5/professor/mês vem de comparadores terceiros, não da página oficial.
- Se o streak do Kahoot tem mecanismo de "folga"/freeze como o do Duolingo.
- Se o Quizlet "Long-Term Learning" continua ativo — a página oficial do Quizlet Labs retornou erro hoje.
- Qualquer relatório de retenção por conceito no Árvore.
- Situação comercial atual do Me Salva!.

---

## 7. Perguntas difíceis e respostas

### "LGPD. Vocês tratam dado de menor de idade. Como?"

**Resposta:** Três camadas.

1. **Base legal.** A ANPD, em enunciado de **24/05/2023**, firmou que o tratamento de dados de crianças e adolescentes pode se apoiar em qualquer hipótese dos arts. 7º e 11 da LGPD, **desde que o melhor interesse do menor prevaleça** (art. 14). Na escola, isso é execução de política pública educacional e interesse legítimo pedagógico — não dependemos de consentimento individual por aluno, mas de contrato com a instituição, que é a controladora do vínculo.
2. **Minimização.** Não coletamos nada além de identificação da turma, resposta e timestamp. Sem foto, sem localização, sem contato do aluno. O art. 14, §4º proíbe condicionar a participação ao fornecimento de dado além do estritamente necessário — nosso modelo já nasce dentro disso.
3. **ECA Digital.** A Lei **15.211/2025** está **em vigor desde 17/03/2026** e alcança qualquer produto com acesso provável por menores no Brasil, inclusive com obrigação de ferramentas de supervisão parental e vinculação a responsável. Como somos distribuídos pela escola, a conta nasce vinculada à turma e ao responsável institucional — é o caminho de conformidade mais curto.

**O que admitir:** a regulamentação do ECA Digital ainda tem pontos abertos, e a operacionalização de verificação etária é questão em aberto para o setor inteiro.

- <https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-divulga-enunciado-sobre-o-tratamento-de-dados-pessoais-de-criancas-e-adolescentes> · <https://www.dataprivacybr.org/eca-digital-entra-em-vigor-o-que-a-lei-preve-e-o-que-ainda-falta-regulamentar/> — acesso 13/09/2026

---

### "Por que o professor usaria isso? Ele já tem cinco plataformas."

**Resposta:** Porque o custo de entrada é **uma vez por aula, no fim da aula, com o assunto ainda na cabeça**. Ele digita o tema, revisa o que a IA gerou e publica. Não monta cronograma, não reagenda, não corrige.

O contraste é literal: o post oficial do Kahoot de março de 2026 instrui o professor a **abrir o relatório, criar um novo kahoot com as questões difíceis e lembrar de rodá-lo uma ou duas semanas depois**. Esse "lembrar" é exatamente o trabalho que a gente tira dele. E o TALIS 2024 diz que ele já gasta 9,3 h semanais só preparando aula, 1,9 h acima da média da OCDE.

**O que admitir:** um professor sobrecarregado também não adota ferramenta nova. A tração depende de a primeira aula publicada levar menos de 3 minutos. Se levar 10, o produto morre.

---

### "E quando a IA gera uma questão errada? Você vai ensinar coisa errada em escala."

**Resposta:** Por isso a revisão do professor é **obrigatória antes de publicar**, não opcional. Nada entra na fila da turma sem que um humano com formação na disciplina tenha olhado. É o mesmo modelo do Kahoot Generator, que avisa na própria central de ajuda: *"AI content-generation services... sometimes provide inaccurate or biased responses, so please carefully review any AI-generated content for accuracy before using it."*

Duas defesas adicionais: a IA gera **pergunta, nunca resposta pronta** — o risco de alucinação numa pergunta de recuperação ativa é menor do que numa explicação; e existe o botão de reportar questão, que remove o item da fila de toda a turma, não só de quem reportou.

**O que admitir:** no conteúdo gerado pelo próprio aluno não há revisor humano. Esse caminho é assumidamente de menor garantia, e é por isso que só o conteúdo publicado pelo professor entra no relatório da turma.

---

### "Por que a escola pagaria?"

**Resposta:** Porque ela compra **evidência de aprendizagem**, que é a coisa que ela não tem. Hoje a escola descobre que o conteúdo não fixou na prova bimestral — quando já é tarde para intervir e quando o custo de recuperação é máximo. O relatório de D+7 chega com sete dias de aula pela frente.

O contexto ajuda: 59% dos alunos de ensino médio estão abaixo do básico em matemática (Saeb 2023) e só 5,2% da rede pública tem aprendizagem adequada nessa área. Escola privada compra diferenciação pedagógica; rede pública compra indicador acionável antes da avaliação externa.

**O que admitir:** não temos precificação definida e não temos um estudo de eficácia próprio. O primeiro contrato será um piloto, provavelmente barato ou gratuito, cujo entregável é o dado.

---

### "Por que o aluno voltaria no dia 7? Esse é o problema de todo app de estudo."

**Resposta:** Três decisões de design, e nenhuma delas é placar.

1. **A sessão acaba.** Meta do dia batida, a tela fecha. É o oposto do scroll infinito: o aluno sai com a sensação de ter terminado, não de ter desistido.
2. **O card dura ~15 segundos.** O custo de abrir é menor que o custo de justificar para si mesmo por que não abriu.
3. **A sequência tem folgas que não a quebram.** A mecânica de streak funciona porque cria hábito, e quebra o hábito quando pune um dia ruim. O Kahoot lançou streaks diários e semanais em set/2025 sem folga documentada; nós assumimos a folga como parte do desenho.

**O que admitir — e admitir primeiro:** esta é a hipótese mais frágil do produto. Se o D+7 não acontecer, não existe métrica de retenção e o painel do professor fica vazio. Retorno no dia 7 é a nossa métrica-mãe do piloto, não uma suposição.

---

### "O que impede o Quizlet ou o Kahoot de copiarem isso em três meses?"

**Resposta honesta:** tecnicamente, nada. O FSRS é aberto. O Wayground inclusive já tem tudo o que precisa — histórico de respostas, marcação por habilidade e eixo temporal — e fechar a lacuna é trabalho de relatório, não de produto.

O que compra tempo:

1. **Conflito de modelo.** O produto deles vive de engajamento em sala e de placar. Nossa métrica principal — "quanto a turma esqueceu do que você ensinou" — é desconfortável para uma marca cujo valor é "learning is awesome". Um relatório que diz "caiu 26 pontos" não vende gamificação.
2. **Contexto brasileiro.** ENEM, BNCC, calendário e realidade de conectividade da rede pública. Eles chegam no Brasil por tradução.
3. **Dado de decaimento acumulado.** Quem mede há mais tempo calibra melhor o intervalo. O moat, se existir, é o histórico — e ele só começa a acumular quando o primeiro aluno revisa.

**O que não dizer:** que o algoritmo é proprietário. Não é, e um jurado técnico sabe.

---

### "Isso não é só o Anki com um painel em cima?"

**Resposta:** O Anki não tem turma, não tem professor e não gera conteúdo — alguém precisa escrever cada card. Os três problemas que impedem o Anki de entrar na escola pública brasileira são exatamente o nosso produto: **de onde vem o conteúdo** (a aula de terça), **quem cura** (o professor, uma vez) e **para quem volta o resultado** (quem deu a aula). O motor de agendamento é commodity; concordamos e usamos o commodity de propósito.

---

### "Vocês medem retenção com autoavaliação. Isso não é subjetivo demais?"

**Resposta:** O Errei/Difícil/Bom/Fácil alimenta o **agendamento**, que é o que o FSRS foi desenhado para consumir. O número que vai para o professor sai do **acerto objetivo** do mesmo conceito na reaplicação. São dois sinais distintos, com finalidades distintas. Se misturarmos os dois, o relatório vira opinião — e aí o jurado tem razão.

---

### "Quantos alunos precisam revisar para o número da turma valer alguma coisa?"

**Resposta:** Com 23 alunos por turma (TALIS 2024), uma taxa de retorno abaixo de ~60% no D+7 já produz intervalo de confiança largo demais para uma decisão pedagógica. Por isso o painel mostra o **n** junto com o percentual e marca o conceito como "amostra insuficiente" em vez de exibir um número bonito e falso. É melhor o professor ver "6 de 23 revisaram" do que acreditar num 45% que não existe.

**Status:** esta é a decisão de produto certa, mas **ainda não está implementada** — é dívida assumida, não recurso entregue.

---

## 8. Fontes principais consultadas

**Kahoot!**
- <https://support.kahoot.com/hc/en-us/articles/31566898896029-How-to-learn-and-practice-with-Kahoot-self-study-modes> (atualizado 10/09/2026)
- <https://kahoot.com/blog/2026/03/18/kahoot-impact-the-science-of-learning-behind-every-kahoot-game/> (18/03/2026)
- <https://kahoot.com/press/2025/09/22/new-ai-powered-study-tools-back-to-school/> (22/09/2025)
- <https://kahoot.com/blog/2026/01/20/discover-kahoots-latest-learning-innovations-at-bett-uk-2026/> (20/01/2026)
- <https://kahoot.com/kahoot-study/> · <https://support.kahoot.com/hc/en-us/articles/40803785990675-How-to-generate-a-kahoot-with-AI> · <https://kahoot.com/schools/pricing/>

**Quizizz / Wayground**
- <https://help.wayground.com/support/solutions/articles/158000404061-reports-on-longitudinal-growth-graphs> (05/11/2025)
- <https://help.wayground.com/support/solutions/articles/158000404051-understand-how-accuracy-is-measured-on-wayground> (05/11/2025)
- <https://help.wayground.com/support/solutions/articles/158000403991-what-is-wayground-> (05/11/2025)
- <https://wayground.com/home/solutions/reports> · <https://wayground.com/home/plans>

**Quizlet** — <https://quizlet.com/upgrade> (preços verificados 13/09/2026)

**Anki / FSRS** — <https://github.com/open-spaced-repetition/fsrs4anki>

**Seneca Learning** — <https://senecalearning.com/en-GB/teachers/> · <https://senecalearning.com/en-GB/revision-notes/teacher-cpd/cpd-applications-of-artificial-intelligence-in-education/1-2-2-adaptive-learning-platforms> · <https://help.senecalearning.com/en/articles/7983483-what-is-the-gradebook> · <https://help.senecalearning.com/en/articles/5672047-seneca-whole-school-reporting>

**Carousel Learning** — <https://www.carousel-learning.com/product/secondary> · <https://www.carousel-learning.com/about/what-is-retrieval-practice>

**Brasil** — <https://www.plurall.net/ia.html> · <https://blogsomoseducacao.com.br/plurall-ia/> · <https://porvir.org/khan-academy-ferramenta-ia-professores/> · <https://www.descomplica.com.br/> · <https://www.stoodi.com.br/> · <https://memoot.com.br/> · <https://decoreba-app.com/home/>

**Ciência e dados** — ver seção 6.
