import { cardSchema, type Card } from '../../../entities/card/schema'
import { studyThemesResponseSchema } from '../../../entities/study/schema'

const WIKIMEDIA = 'https://upload.wikimedia.org/wikipedia/commons/thumb/'

export const mockStudyThemes = studyThemesResponseSchema.parse({
  suggested: [
    {
      id: 'tema-entropia',
      subject: 'Física II',
      title: 'Entropia e segunda lei',
      reason: 'Você errou 3 de 4 cards deste tema na última semana',
      cardCount: 12,
    },
    {
      id: 'tema-derivadas',
      subject: 'Cálculo I',
      title: 'Regra da cadeia',
      reason: 'Prova marcada para sexta-feira',
      cardCount: 15,
    },
    {
      id: 'tema-respiracao',
      subject: 'Biologia',
      title: 'Respiração celular',
      reason: 'Prestes a ser esquecido — revisão vence em 2 dias',
      cardCount: 10,
    },
  ],
  subjects: ['Biologia', 'Física II', 'Cálculo I', 'Química', 'História', 'Direito Constitucional'],
})

const buildCard = (
  index: number,
  theme: string,
  subject: string,
  question: string,
  highlightTerm: string,
  keyTerm: string,
  imageUrl: string,
  options: [string, string, string, string],
  correctOptionId: 'A' | 'B' | 'C' | 'D',
): Card =>
  cardSchema.parse({
    id: `card-gerado-${index}`,
    origin: { kind: 'proprio', theme },
    subject,
    chapter: theme,
    reviewNumber: 0,
    imageUrl,
    keyTerm,
    question,
    highlightTerm,
    options: (['A', 'B', 'C', 'D'] as const).map((id, i) => ({ id, label: options[i] })),
    correctOptionId,
    masteryPercent: 0,
    bookmarkCount: 0,
    shareCount: 0,
    fsrs: {
      due: new Date().toISOString(),
      stability: 0,
      difficulty: 0,
      elapsed_days: 0,
      scheduled_days: 0,
      learning_steps: 0,
      reps: 0,
      lapses: 0,
      state: 0,
    },
  })

// Banco pequeno por assunto. O backend vai trocar isto por uma chamada ao modelo;
// o contrato de resposta é o mesmo, então nenhuma tela muda quando isso acontecer.
const bankBySubject: Record<string, Card[]> = {
  'Física II': [
    buildCard(
      1,
      'Entropia e segunda lei',
      'Física II',
      'Em um processo irreversível dentro de um sistema isolado, o que acontece com a entropia total?',
      'entropia total',
      'Segunda lei',
      `${WIKIMEDIA}0/09/Carnot_Cycle_T-S_diagram.svg/960px-Carnot_Cycle_T-S_diagram.svg.png`,
      ['Sempre aumenta', 'Sempre diminui', 'Permanece constante', 'Depende da pressão'],
      'A',
    ),
    buildCard(
      2,
      'Entropia e segunda lei',
      'Física II',
      'O rendimento de uma máquina térmica de Carnot depende de quais grandezas?',
      'rendimento',
      'Ciclo de Carnot',
      `${WIKIMEDIA}4/4e/Carnot-cycle-p-V-diagram.svg/langpt-960px-Carnot-cycle-p-V-diagram.svg.png`,
      [
        'Das temperaturas das duas fontes',
        'Apenas do calor absorvido',
        'Da massa do gás',
        'Do volume inicial',
      ],
      'A',
    ),
  ],
  Biologia: [
    buildCard(
      3,
      'Respiração celular',
      'Biologia',
      'Em qual etapa da respiração celular ocorre a maior produção de ATP?',
      'maior produção de ATP',
      'Fosforilação oxidativa',
      `${WIKIMEDIA}c/c9/Atp_synthase_pt.png/960px-Atp_synthase_pt.png`,
      ['Fosforilação oxidativa', 'Glicólise', 'Ciclo de Krebs', 'Fermentação'],
      'A',
    ),
  ],
  'Cálculo I': [
    buildCard(
      4,
      'Regra da cadeia',
      'Cálculo I',
      'Qual é a derivada de f(x) = sen(3x²) pela regra da cadeia?',
      'regra da cadeia',
      'Regra da cadeia',
      `${WIKIMEDIA}f/f0/Newton_iteration.png/960px-Newton_iteration.png`,
      ['6x · cos(3x²)', 'cos(3x²)', '3x² · cos(x)', '6x · sen(3x²)'],
      'A',
    ),
  ],
}

export const generateCardsForTheme = (subject: string, theme: string, cardCount: number): Card[] => {
  const bank = bankBySubject[subject] ?? bankBySubject.Biologia
  return Array.from({ length: Math.min(cardCount, bank.length * 4) }, (_, i) => {
    const base = bank[i % bank.length]
    return { ...base, id: `${base.id}-${i}`, origin: { kind: 'proprio', theme } }
  })
}
