"""Gera o pitch deck do Desfeed em PPTX, na linha visual do CAR Campo.

Sistema portado do CAR-Campo-Pitch-Deck.pptx: grid fixo (sobrancelha 12pt,
titulo 40pt, fonte no rodape 9pt), slides alternando fundo escuro e claro,
estatistica heroi em escala grande. Paleta trocada para os tokens do Desfeed.

Os cinzas do original reprovam em contraste (#8A9790 da ~2,6:1 em branco);
aqui usamos #6B7280 (4,8:1) no claro e #9CA3AF no escuro.
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

FONT = "Helvetica Neue"

DARK_BG = "0F131D"
LIGHT_BG = "FFFFFF"
SOFT_BG = "FAF8FF"
CARD_DARK = "18202E"

ACCENT_D = "34D399"
TITLE_D = "FFFFFF"
BODY_D = "F5F7F4"
MUTED_D = "9CA3AF"

ACCENT_L = "047857"
BODY_L = "0F131D"
MUTED_L = "6B7280"

PRIMARY = "10B981"
PRIMARY_DEEP = "059669"
INDIGO = "4F46E5"
AMBER = "B45309"
RED = "B91C1C"

EYEBROW_Y, TITLE_Y, SUB_Y, FOOT_Y = 0.6, 1.0, 1.95, 7.0
MARGIN = 0.7
CONTENT_W = 12.0
COL_X = (1.0, 5.1, 9.1)
COL_W = 3.3
STAT_X = (0.8, 3.9, 6.9, 10.0)
STAT_W = 2.7

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)


def slide(bg):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    s.background.fill.solid()
    s.background.fill.fore_color.rgb = RGBColor.from_string(bg)
    return s


def text(s, x, y, w, h, parts, size, color, bold=False,
         align=PP_ALIGN.LEFT, spacing=1.0, anchor=MSO_ANCHOR.TOP):
    """parts: str, ou lista de str (paragrafos), ou lista de listas de runs.

    Um run e (texto, bold, cor, tamanho) com os tres ultimos opcionais.
    """
    box = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0

    paragraphs = [parts] if isinstance(parts, str) else parts
    for index, para in enumerate(paragraphs):
        p = tf.paragraphs[0] if index == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        runs = [para] if isinstance(para, str) else para
        for run_spec in runs:
            if isinstance(run_spec, str):
                run_spec = (run_spec,)
            content, *rest = run_spec
            run = p.add_run()
            run.text = content
            run.font.name = FONT
            run.font.size = Pt(rest[2] if len(rest) > 2 and rest[2] else size)
            run.font.bold = rest[0] if len(rest) > 0 and rest[0] is not None else bold
            run.font.color.rgb = RGBColor.from_string(
                rest[1] if len(rest) > 1 and rest[1] else color)
    return box


def rect(s, x, y, w, h, fill, radius=0.04):
    shape = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                               Inches(x), Inches(y), Inches(w), Inches(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor.from_string(fill)
    shape.line.fill.background()
    shape.shadow.inherit = False
    try:
        shape.adjustments[0] = radius
    except (IndexError, KeyError):
        pass
    if shape.has_text_frame:
        shape.text_frame.text = ""
    return shape


def circle(s, x, y, d, fill):
    shape = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(d), Inches(d))
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor.from_string(fill)
    shape.line.fill.background()
    shape.shadow.inherit = False
    shape.text_frame.text = ""
    return shape


def header(s, eyebrow, title, dark, sub=None):
    accent = ACCENT_D if dark else ACCENT_L
    title_color = TITLE_D if dark else ACCENT_L
    text(s, MARGIN, EYEBROW_Y, CONTENT_W, 0.4, eyebrow.upper(), 12, accent, bold=True)
    text(s, MARGIN, TITLE_Y, CONTENT_W, 1.0, title, 40, title_color, bold=True, spacing=0.95)
    if sub:
        text(s, MARGIN, SUB_Y, CONTENT_W, 0.6, sub, 14,
             BODY_D if dark else MUTED_L, spacing=1.25)


def footnote(s, note, dark):
    text(s, MARGIN, FOOT_Y, CONTENT_W, 0.4, note, 9, MUTED_D if dark else MUTED_L)


# ---------------------------------------------------------------- 1. capa
s = slide(DARK_BG)
rect(s, 0, 0, 0.16, 7.5, PRIMARY, radius=0)
text(s, 0.9, 0.7, 11.0, 0.5,
     "HACKTUDO 2026 · 13ª EDIÇÃO · 11 A 19 DE SETEMBRO · 100% ONLINE",
     13, ACCENT_D, bold=True)
text(s, 0.9, 2.0, 11.5, 1.2, "Desfeed", 66, TITLE_D, bold=True)
text(s, 0.9, 3.2, 11.5, 0.7,
     "A interface do TikTok, o algoritmo do Ebbinghaus.",
     24, ACCENT_D, bold=True)
text(s, 0.9, 4.2, 11.0, 1.8,
     [[("O feed que devolve atenção em vez de tomar. ", True, TITLE_D),
       ("Cada card é uma micro-recuperação do que o aluno estudou — gerada por IA a "
        "partir da foto do caderno dele, agendada por repetição espaçada, dentro de "
        "uma sessão que acaba de propósito.", False, BODY_D)]],
     18, BODY_D, spacing=1.35)
text(s, 0.9, 6.6, 11.5, 0.5,
     "App mobile (Expo / React Native) · Proposta #4 do dossiê  ·  12 de setembro de 2026",
     12, MUTED_D)

# ------------------------------------------------- 2. o dado que nos move
s = slide(LIGHT_BG)
text(s, MARGIN, EYEBROW_Y, CONTENT_W, 0.4, "O DADO QUE NOS MOVE", 12, ACCENT_L, bold=True)
text(s, MARGIN, 1.5, 7.6, 3.2, "83%", 150, ACCENT_L, bold=True)
text(s, MARGIN, 4.4, 7.4, 2.2,
     [[("dos usuários de LLM não conseguiram citar uma frase do texto que acabaram de "
        "“escrever”", True, BODY_L, 22)],
      [("", False, BODY_L, 8)],
      [("Contra 11% de quem escreveu sem IA. O MIT chamou isso de ", False, MUTED_L, 15),
       ("dívida cognitiva", True, BODY_L, 15),
       (": a IA poupa esforço agora e cobra depois.", False, MUTED_L, 15)]],
     15, MUTED_L, spacing=1.2)

rect(s, 8.9, 1.6, 3.7, 4.6, DARK_BG)
text(s, 9.2, 1.95, 3.1, 0.4, "O CONTEXTO BRASILEIRO", 11, ACCENT_D, bold=True)
for i, (big, small) in enumerate([
    ("7 em 10", "alunos do ensino médio usam IA generativa em trabalhos escolares"),
    ("32%", "receberam alguma orientação da escola sobre como usar"),
    ("73%", "estão abaixo do nível básico em matemática (PISA 2022)"),
]):
    y = 2.5 + i * 1.25
    text(s, 9.2, y, 3.1, 0.45, big, 26, TITLE_D, bold=True)
    text(s, 9.2, y + 0.45, 3.1, 0.7, small, 11, BODY_D, spacing=1.2)

footnote(s, "Fonte: Kosmyna et al., MIT Media Lab (2025), “Your Brain on ChatGPT: Accumulation "
            "of Cognitive Debt”; TIC Educação 2025 (Cetic.br/CGI.br); INEP/OCDE — PISA 2022.", False)

# ------------------------------------------------------------ 3. problema
s = slide(DARK_BG)
header(s, "O problema", "Três falhas que se alimentam", True)
blocks = [
    ("01", "A atenção já perdeu a disputa",
     "47 segundos é a atenção média em uma tela hoje, contra 2,5 minutos em 2004. "
     "E o custo é coletivo: 59% dos alunos relatam distração causada pelo celular do colega."),
    ("02", "A IA virou atalho, não ferramenta",
     "Do jeito que o aluno usa hoje, o LLM elimina exatamente o esforço de recuperação "
     "que produz memória. EEG mostra −55% de conectividade neural escrevendo com IA."),
    ("03", "Estudamos como a ciência diz que não funciona",
     "Reler quatro vezes parece melhor depois de 5 minutos — e perde feio depois de uma "
     "semana: 40% contra 61% de quem se auto-testou. O aluno digital vive no modo releitura."),
]
for (num, title, body), x in zip(blocks, COL_X):
    text(s, x, 2.4, COL_W, 0.9, num, 34, ACCENT_D, bold=True)
    text(s, x, 3.25, COL_W, 0.9, title, 18, TITLE_D, bold=True, spacing=1.1)
    text(s, x, 4.35, COL_W, 2.0, body, 12.5, BODY_D, spacing=1.35)
footnote(s, "Fonte: Gloria Mark (UC Irvine); OCDE — PISA 2022; Kosmyna et al. (MIT Media Lab, "
            "2025); Roediger & Karpicke (2006), “Test-Enhanced Learning”.", True)

# ------------------------------------------------------------- 4. persona
s = slide(LIGHT_BG)
header(s, "Para quem construímos", "Duas pontas, um mesmo celular", False)
rect(s, 0.9, 2.4, 5.6, 3.9, SOFT_BG)
text(s, 1.25, 2.75, 4.9, 0.5,
     [[("Júlia, 16 anos", True, BODY_L, 22)]], 22, BODY_L)
text(s, 1.25, 3.25, 4.9, 0.35, "2º ANO DO ENSINO MÉDIO · ESCOLA PÚBLICA", 11, ACCENT_L, bold=True)
text(s, 1.25, 3.8, 4.9, 2.2,
     [[("“Estudo pelo celular porque é o que eu tenho. Tiro print do quadro, salvo PDF "
        "que não abro, e peço resumo pro ChatGPT na véspera da prova.”", False, BODY_L, 13)],
      [("", False, BODY_L, 6)],
      [("Não tem problema de disciplina. Tem problema de método.", True, ACCENT_L, 13)]],
     13, BODY_L, spacing=1.35)

rect(s, 6.9, 2.4, 5.6, 3.9, DARK_BG)
text(s, 7.25, 2.75, 4.9, 0.5,
     [[("Prof. Marcos, 41 anos", True, TITLE_D, 22)]], 22, TITLE_D)
text(s, 7.25, 3.25, 4.9, 0.35, "BIOLOGIA · 6 TURMAS · 210 ALUNOS", 11, ACCENT_D, bold=True)
text(s, 7.25, 3.8, 4.9, 2.2,
     [[("Com a Lei 15.100 o celular saiu da aula — e a participação também. Ele não tem "
        "tempo de montar quiz, nem dado nenhum sobre quem entendeu o quê antes da prova "
        "bimestral.", False, BODY_D, 13)],
      [("", False, BODY_D, 6)],
      [("Precisa da janela pedagógica que a lei previu e ninguém construiu.", True, ACCENT_D, 13)]],
     13, BODY_D, spacing=1.35)
footnote(s, "A Lei 15.100/2025 proíbe o celular na escola exceto para fins pedagógicos sob "
            "orientação do professor. 92% das escolas já aplicam a restrição — de forma "
            "improvisada. Fonte: MEC, jun/2026 (pesquisa em 8.189 escolas).", False)

# ------------------------------------------------------------- 5. solução
s = slide(DARK_BG)
header(s, "A solução", "Três mecânicas, uma inversão", True)
items = [
    ("01", "O feed que devolve",
     "Rolagem vertical, um card por tela, o gesto que o aluno já domina. Conteúdo invertido: "
     "pergunta de 15 segundos sobre o que ele mesmo estudou."),
    ("02", "A sessão que acaba de propósito",
     "A meta diária tem fim visível. Quando acaba, acaba — sem scroll infinito, sem “mais um "
     "card”, sem notificação fora da janela que o aluno escolheu."),
    ("03", "A sala ao vivo do professor",
     "Ele escolhe os temas, a IA gera as perguntas, abre uma sala com PIN. E o que a turma "
     "responde em aula entra na revisão individual de cada aluno."),
]
for i, (num, title, body) in enumerate(items):
    y = 2.35 + i * 1.45
    circle(s, MARGIN, y, 0.85, PRIMARY)
    text(s, MARGIN, y + 0.18, 0.85, 0.5, num, 22, "0F131D", bold=True, align=PP_ALIGN.CENTER)
    text(s, 1.85, y, 10.6, 0.45, title, 21, TITLE_D, bold=True)
    text(s, 1.85, y + 0.5, 10.6, 0.8, body, 13.5, BODY_D, spacing=1.3)
text(s, MARGIN, 6.8, CONTENT_W, 0.45,
     [[("Cobre os três pilares do enunciado", True, ACCENT_D, 12),
       ("  —  tecnologia · metodologias educacionais · saúde mental  —  ", False, BODY_D, 12),
       ("e os quatro verbos: aprender, colaborar, criar e cuidar.", False, BODY_D, 12)]],
     12, BODY_D)

# --------------------------------------------------------- 6. como funciona
s = slide(LIGHT_BG)
header(s, "Como funciona", "Da foto do caderno ao card agendado", False,
       "Seis passos. O aluno só percebe dois deles.")
steps = [
    ("1", "Fotografa o caderno", "A página escrita à mão, depois da aula."),
    ("2", "A IA lê e gera", "Extrai o conteúdo e escreve as perguntas. Nunca a resposta."),
    ("3", "Curadoria em 1 toque", "O professor aprova ou rejeita cada card gerado."),
    ("4", "Desliza e responde", "15 segundos por card, no formato que ele já usa."),
    ("5", "Auto-avalia", "Errei · Difícil · Bom · Fácil — quatro graus, um toque."),
    ("6", "O FSRS agenda", "+10min, +1d, +3d ou +7d. E mostra o intervalo na tela."),
]
for i, (num, title, body) in enumerate(steps):
    col, row = i % 3, i // 3
    x = COL_X[col] - 0.1
    y = 2.85 + row * 2.0
    circle(s, x, y, 0.62, PRIMARY)
    text(s, x, y + 0.13, 0.62, 0.4, num, 18, "FFFFFF", bold=True, align=PP_ALIGN.CENTER)
    text(s, x + 0.85, y + 0.08, 2.7, 0.5, title, 14.5, ACCENT_L, bold=True, spacing=1.1)
    text(s, x + 0.1, y + 0.72, 3.3, 0.9, body, 11.5, MUTED_L, spacing=1.3)
text(s, MARGIN, 6.85, CONTENT_W, 0.45,
     [[("Demo ao vivo: ", True, ACCENT_L, 13),
       ("o jurado fotografa uma página de caderno e, 30 segundos depois, está deslizando "
        "perguntas sobre ela.", False, BODY_L, 13)]],
     13, BODY_L)

# ------------------------------------------------------------ 7. mecanismo
s = slide(DARK_BG)
header(s, "O mecanismo científico", "Cada decisão tem um estudo atrás", True)
rows = [
    ("Roediger & Karpicke (2006)", "Auto-testar: 61% de retenção após 1 semana. Reler: 40%.",
     "O card é sempre recuperação ativa, nunca releitura"),
    ("Cepeda et al. (2006)", "Prática distribuída vence estudo maciço — 839 comparações.",
     "Agendamento por FSRS, não revisão de véspera"),
    ("Murre & Dros (2015)", "Sem revisão, retenção cai a ~34% em 1 dia e ~21% em 1 mês.",
     "O card volta antes de você esquecer"),
    ("Freeman et al. (2014)", "Aprendizagem ativa: +0,47 DP. Aula passiva: 1,5× mais reprovação.",
     "A sala ao vivo é peer instruction instrumentada"),
    ("Meta-análise 2025 (N=98.299)", "Vídeo curto associado a pior atenção sustentada.",
     "A sessão tem fim. Sem infinito, por design"),
]
text(s, 0.9, 2.35, 3.4, 0.3, "ESTUDO", 10, MUTED_D, bold=True)
text(s, 4.5, 2.35, 4.6, 0.3, "ACHADO", 10, MUTED_D, bold=True)
text(s, 9.3, 2.35, 3.3, 0.3, "O QUE DECIDE NO PRODUTO", 10, ACCENT_D, bold=True)
for i, (study, finding, decision) in enumerate(rows):
    y = 2.85 + i * 0.82
    if i % 2 == 0:
        rect(s, 0.75, y - 0.09, 11.85, 0.72, CARD_DARK, radius=0.02)
    text(s, 0.9, y, 3.4, 0.6, study, 12, TITLE_D, bold=True, spacing=1.15)
    text(s, 4.5, y, 4.6, 0.6, finding, 11.5, BODY_D, spacing=1.15)
    text(s, 9.3, y, 3.3, 0.6, decision, 11.5, ACCENT_D, bold=True, spacing=1.15)
footnote(s, "O agendamento é visível ao aluno — “+3d” aparece na tela. Duolingo (Birdbrain) e "
            "Brainscape (CBR) escondem o algoritmo deles; mostrar o nosso é decisão de produto.", True)

# ---------------------------------------------------------- 8. competitivo
s = slide(LIGHT_BG)
header(s, "Cenário competitivo", "O que já existe, e o que ninguém faz", False)
comp = [
    ("Feed vertical de estudo", "StudyTok", "Tem feed e IA de foto — mas sem repetição espaçada.", AMBER),
    ("Sala de aula ao vivo", "Kahoot · Quizizz · Blooket · Gimkit · Wooclap",
     "A aula acaba e o dado morre no relatório.", AMBER),
    ("Brasil, Lei 15.100", "PlayAula · Unoquizz · Educa AI",
     "Já ocupam a exceção pedagógica. Não somos os primeiros aqui.", RED),
    ("Repetição espaçada", "Anki · Brainscape",
     "Algoritmo forte, interface de 2010 — o aluno de 16 anos não usa.", AMBER),
]
for i, (cat, who, gap, tone) in enumerate(comp):
    y = 2.35 + i * 0.88
    text(s, 0.9, y, 2.9, 0.5, cat, 13, BODY_L, bold=True, spacing=1.1)
    text(s, 3.9, y, 4.0, 0.5, who, 12, MUTED_L, spacing=1.1)
    text(s, 8.1, y, 4.5, 0.5, gap, 12, tone, spacing=1.1)

rect(s, 0.75, 5.80, 11.85, 0.95, DARK_BG)
text(s, 1.1, 6.00, 11.2, 0.6,
     [[("Nenhum deles alimenta revisão espaçada individual depois da aula. ", True, ACCENT_D, 15),
       ("E nenhum encerra a sessão de propósito — quem monetiza por tempo de tela não pode.",
        False, BODY_D, 15)]],
     15, BODY_D, spacing=1.2)
footnote(s, "Fonte: análise competitiva Desfeed (set/2026), 30 produtos mapeados. Não afirmamos "
            "exclusividade nacional — PlayAula, Unoquizz e Educa AI já atendem à exceção "
            "pedagógica da Lei 15.100.", False)

# -------------------------------------------------- 9. roadmap e viabilidade
s = slide(DARK_BG)
header(s, "Roadmap e viabilidade", "Do app do aluno à escola inteira", True)
phases = [
    ("FASE 1", "App do aluno + backend", "Feed, FSRS, scanner com IA, sessão com fim.", "protótipo funcional"),
    ("FASE 2", "Painel web do professor", "Criar sala, curar perguntas, painel ao vivo, relatórios.", "contrato de API pronto"),
    ("FASE 3", "Escola e coordenação", "Múltiplas turmas e registro da janela pedagógica da lei.", "roadmap"),
]
for i, (tag, title, body, status) in enumerate(phases):
    x = 0.75 + i * 4.0
    rect(s, x, 2.35, 3.7, 2.2, CARD_DARK)
    text(s, x + 0.3, 2.6, 3.1, 0.3, tag, 11, ACCENT_D, bold=True)
    text(s, x + 0.3, 2.98, 3.1, 0.5, title, 16, TITLE_D, bold=True, spacing=1.1)
    text(s, x + 0.3, 3.6, 3.1, 0.7, body, 11.5, BODY_D, spacing=1.25)
    text(s, x + 0.3, 4.22, 3.1, 0.3, status, 10.5, ACCENT_D, bold=True)

via = [
    ("Legal", "Dado de menor de idade sob LGPD: minimização, consentimento de responsável e "
              "agregação por design. O professor vê a turma, nunca o aluno."),
    ("Técnica", "Expo / React Native no celular que o aluno já tem · ts-fsrs (MIT) · "
                "Fastify com OpenAPI servindo as duas pontas desde o primeiro endpoint."),
    ("Operacional", "Offline-first, porque cerca de metade das escolas tem internet ruim — "
                    "e isso é equidade de acesso, não detalhe técnico."),
]
for i, (label, body) in enumerate(via):
    y = 4.95 + i * 0.62
    text(s, 0.9, y, 1.9, 0.4, label, 13, ACCENT_D, bold=True)
    text(s, 2.9, y, 9.6, 0.5, body, 11.5, BODY_D, spacing=1.2)

# --------------------------------------------------------------- 10. visão
s = slide(DARK_BG)
rect(s, 0, 0, 0.16, 7.5, PRIMARY, radius=0)
text(s, 0.9, 0.65, 11.0, 0.4, "A VISÃO", 12, ACCENT_D, bold=True)
text(s, 0.9, 1.05, 11.5, 1.0, "O Desfeed é a porta de entrada", 40, TITLE_D, bold=True)
text(s, 0.9, 2.0, 11.5, 0.5,
     "Cinco camadas mudam o paradigma. Nenhum produto isolado muda — mas qualquer um "
     "deles, bem executado, abre a porta.", 14, BODY_D, spacing=1.25)

layers = [
    ("1", "Ambiente", "reduzir a pressão de captura"),
    ("2", "Relação com a IA", "de máquina de respostas a cobradora de esforço"),
    ("3", "Absorção", "estamos aqui"),
    ("4", "Sala de aula", "sinal em tempo real, sem vigilância"),
    ("5", "Competências", "leitura profunda e imunidade à manipulação"),
]
for i, (num, name, desc) in enumerate(layers):
    x = 0.85 + i * 2.42
    here = name == "Absorção"
    rect(s, x, 2.85, 2.2, 1.75, PRIMARY if here else CARD_DARK)
    text(s, x + 0.2, 3.05, 1.8, 0.35, num, 20, "0F131D" if here else ACCENT_D, bold=True)
    text(s, x + 0.2, 3.45, 1.8, 0.45, name, 14, "0F131D" if here else TITLE_D,
         bold=True, spacing=1.05)
    text(s, x + 0.2, 3.95, 1.8, 0.55, desc, 10.5,
         "0F131D" if here else MUTED_D, bold=here, spacing=1.2)

text(s, 0.9, 5.1, 11.5, 1.1,
     [[("O problema nunca foi o formato.", True, TITLE_D, 28)],
      [("Foi a função-objetivo do algoritmo. Nós trocamos.", True, ACCENT_D, 28)]],
     28, TITLE_D, spacing=1.2)
text(s, 0.9, 6.55, 11.5, 0.6,
     [[("Ética como feature: ", True, ACCENT_D, 12),
       ("privacidade agregada por design · a IA gera pergunta e nunca resposta · funciona "
        "offline · a sessão acaba de propósito.", False, MUTED_D, 12)]],
     12, MUTED_D, spacing=1.2)

out = "/Users/emerson/Desktop/Desfeed-Pitch-Deck.pptx"
prs.save(out)
print(f"OK: {out} — {len(prs.slides.__iter__.__self__._sldIdLst)} slides")
