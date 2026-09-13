import {
  classReportSchema,
  generateLessonResponseSchema,
  type GenerateLessonResponse,
} from '../../../entities/teacher/schema'

const daysAgo = (days: number): string =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

export const mockClassReport = classReportSchema.parse({
  className: '2º ano B',
  subject: 'Biologia',
  studentCount: 34,
  participation: 91,
  retentionD7: 74,
  retentionD30: 58,
  lessons: [
    {
      id: 'aula-respiracao',
      topic: 'Respiração celular e mitocôndria',
      publishedAt: daysAgo(8),
      answeredBy: 31,
      concepts: [
        { concept: 'Fosforilação oxidativa', accuracyOnDay: 88, retentionD7: 79 },
        { concept: 'Ciclo de Krebs', accuracyOnDay: 71, retentionD7: 44 },
        { concept: 'Glicólise', accuracyOnDay: 83, retentionD7: 68 },
      ],
    },
    {
      id: 'aula-fotossintese',
      topic: 'Fotossíntese — fase clara e escura',
      publishedAt: daysAgo(15),
      answeredBy: 29,
      concepts: [
        { concept: 'Fase fotoquímica', accuracyOnDay: 76, retentionD7: 61 },
        { concept: 'Ciclo de Calvin', accuracyOnDay: 64, retentionD7: 38 },
      ],
    },
  ],
})

// A geração real vem do modelo. Aqui o formato da resposta já é o definitivo, então a tela
// do professor não muda quando o backend entrar.
export const generateLesson = (topic: string, questionCount: number): GenerateLessonResponse => {
  const bank = [
    ['Qual organela realiza a fosforilação oxidativa?', 'Mitocôndria'],
    ['Em que etapa da respiração celular o NADH é oxidado?', 'Cadeia transportadora de elétrons'],
    ['Qual o saldo líquido de ATP da glicólise?', '2 ATP'],
    ['Onde ocorre o ciclo de Krebs na célula eucarionte?', 'Matriz mitocondrial'],
    ['Qual gás é liberado no ciclo de Krebs?', 'Gás carbônico'],
    ['O que a cadeia respiratória usa como aceptor final de elétrons?', 'Oxigênio'],
  ]

  return generateLessonResponseSchema.parse({
    lessonId: 'aula-rascunho',
    topic,
    questions: Array.from({ length: questionCount }, (_, i) => {
      const [question, correctAnswer] = bank[i % bank.length]
      return { id: `q-${i}`, question, correctAnswer, approved: true }
    }),
  })
}
